"use server";
import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { deleteMessage, setMessageRead, listMessages } from "@/app/lib/messages";
import { storeImage } from "@/app/lib/uploads";
import { checkLogin, createSession, destroySession, requireAdmin } from "@/app/lib/auth";
import {
  BODY_TYPES,
  DRIVES,
  FUELS,
  GEARBOXES,
  UPLOAD_DIR,
  deleteCar,
  galleryOf,
  getCar,
  removeUpload,
  saveCar,
  type BodyType,
  type Car,
  type Drive,
  type Fuel,
  type Gearbox,
} from "@/app/lib/cars";

// `values` lets the form keep what was typed when validation fails.
export type FormState = { error?: string; values?: Record<string, string> } | null;

const MAX_GALLERY = 15;

export async function loginAction(_: FormState, formData: FormData): Promise<FormState> {
  const ok = checkLogin(String(formData.get("username") ?? ""), String(formData.get("password") ?? ""));
  if (!ok) {
    await new Promise((r) => setTimeout(r, 600));
    return { error: "Forkert brugernavn eller adgangskode." };
  }
  await createSession();
  redirect("/admin");
}

export async function logoutAction() {
  await destroySession();
  redirect("/admin/login");
}

const text = (f: FormData, k: string) => String(f.get(k) ?? "").trim();
const int = (f: FormData, k: string) => Number(text(f, k).replace(/[.\s]/g, ""));
const lines = (f: FormData, k: string) =>
  text(f, k)
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
/** Empty field → undefined; otherwise the number (NaN if it is not one). */
const optNum = (f: FormData, k: string) => {
  const raw = text(f, k).replace(",", ".");
  return raw === "" ? undefined : Number(raw);
};
const oneOf = <T extends string>(list: readonly T[], v: string) => (list as readonly string[]).includes(v) ? (v as T) : undefined;

export async function saveCarAction(_: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();

  const values: Record<string, string> = {};
  formData.forEach((v, k) => {
    if (typeof v === "string") values[k] = v;
  });
  const fail = (error: string): FormState => ({ error, values });

  const id = text(formData, "id");
  const existing = id ? await getCar(id) : undefined;
  if (id && !existing) return fail("Annoncen findes ikke længere.");

  const brand = text(formData, "brand");
  const model = text(formData, "model");
  const fuel = text(formData, "fuel") as Fuel;
  const description = text(formData, "description");
  const descriptionEn = text(formData, "descriptionEn");
  const year = int(formData, "year");
  const km = int(formData, "km");
  const price = int(formData, "price");

  const maxYear = new Date().getFullYear() + 1;
  if (!brand || brand.length > 40) return fail("Skriv et mærke (maks. 40 tegn).");
  if (!model || model.length > 80) return fail("Skriv en model (maks. 80 tegn).");
  if (!Number.isInteger(year) || year < 1980 || year > maxYear) return fail(`Årgang skal være mellem 1980 og ${maxYear}.`);
  if (!Number.isInteger(km) || km < 0 || km > 2_000_000) return fail("Kilometer er ikke gyldige.");
  if (!Number.isInteger(price) || price <= 0 || price > 10_000_000) return fail("Prisen er ikke gyldig.");
  if (!FUELS.includes(fuel)) return fail("Vælg brændstof.");
  if (description.length > 3000 || descriptionEn.length > 3000) return fail("Beskrivelsen er for lang (maks. 3000 tegn).");

  const optional = {
    powerHp: optNum(formData, "powerHp"),
    kmPerL: optNum(formData, "kmPerL"),
    doors: optNum(formData, "doors"),
    seats: optNum(formData, "seats"),
    owners: optNum(formData, "owners"),
  };
  for (const [k, v] of Object.entries(optional)) {
    if (v !== undefined && (!Number.isFinite(v) || v < 0 || v > 5000)) return fail(`Feltet "${({ powerHp: "Effekt", kmPerL: "Forbrug", doors: "Døre", seats: "Siddepladser", owners: "Ejere" } as Record<string, string>)[k]}" er ikke gyldigt.`);
  }
  const equipment = lines(formData, "equipment");
  const equipmentEn = lines(formData, "equipmentEn");
  if (equipment.length > 80 || equipmentEn.length > 80) return fail("Maks. 80 udstyrslinjer.");

  // Images: the cover photo, plus gallery photos to keep and new ones to add.
  const removed = new Set(formData.getAll("removeImage").map(String));
  const kept = (existing?.images ?? []).filter((i) => !removed.has(i));
  const added: string[] = [];
  const uploaded: string[] = [];
  const discard = () => Promise.all(uploaded.map(removeUpload));

  let image = existing?.image ?? "";
  const file = formData.get("image");
  if (file instanceof File && file.size > 0) {
    const r = await storeImage(file);
    if ("error" in r) return fail(r.error);
    uploaded.push(r.path);
    image = r.path;
  }
  const newFiles = formData.getAll("images").filter((f): f is File => f instanceof File && f.size > 0);
  if (kept.length + newFiles.length > MAX_GALLERY) {
    await discard();
    return fail(`Maks. ${MAX_GALLERY} ekstra billeder.`);
  }
  for (const f of newFiles) {
    const r = await storeImage(f);
    if ("error" in r) {
      await discard();
      return fail(r.error);
    }
    uploaded.push(r.path);
    added.push(r.path);
  }
  if (!image) {
    await discard();
    return fail("Upload et billede af bilen.");
  }

  // Delete files that are no longer part of the listing.
  if (existing) {
    const keep = new Set([image, ...kept, ...added]);
    await Promise.all(galleryOf(existing).filter((i) => !keep.has(i)).map(removeUpload));
  }

  const car: Car = {
    id: existing?.id ?? randomUUID(),
    brand,
    model,
    year,
    km,
    fuel,
    price,
    image,
    images: [...kept, ...added],
    bodyType: oneOf<BodyType>(BODY_TYPES, text(formData, "bodyType")),
    gearbox: oneOf<Gearbox>(GEARBOXES, text(formData, "gearbox")),
    drive: oneOf<Drive>(DRIVES, text(formData, "drive")),
    ...optional,
    color: text(formData, "color").slice(0, 40) || undefined,
    firstRegistration: text(formData, "firstRegistration").slice(0, 20) || undefined,
    equipment,
    equipmentEn,
    description,
    descriptionEn,
    published: formData.get("published") === "on",
    createdAt: existing?.createdAt ?? new Date().toISOString(),
  };
  await saveCar(car);
  revalidatePath("/");
  revalidatePath("/biler", "layout");
  redirect("/admin/cars");
}

export async function deleteCarAction(formData: FormData) {
  await requireAdmin();
  await deleteCar(text(formData, "id"));
  revalidatePath("/");
  revalidatePath("/biler", "layout");
  revalidatePath("/admin");
}

export async function togglePublishedAction(formData: FormData) {
  await requireAdmin();
  const car = await getCar(text(formData, "id"));
  if (!car) return;
  await saveCar({ ...car, published: !car.published });
  revalidatePath("/");
  revalidatePath("/biler", "layout");
  revalidatePath("/admin");
}

export async function toggleReadAction(formData: FormData) {
  await requireAdmin();
  const id = text(formData, "id");
  const m = (await listMessages()).find((x) => x.id === id);
  if (!m) return;
  await setMessageRead(id, !m.read);
  revalidatePath("/admin/messages");
}

export async function deleteMessageAction(formData: FormData) {
  await requireAdmin();
  await deleteMessage(text(formData, "id"));
  revalidatePath("/admin/messages");
}
