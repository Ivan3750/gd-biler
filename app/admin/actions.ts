"use server";
import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { checkPassword, createSession, destroySession, requireAdmin } from "@/app/lib/auth";
import { FUELS, UPLOAD_DIR, deleteCar, getCar, removeUpload, saveCar, type Car, type Fuel } from "@/app/lib/cars";

// `values` lets the form keep what was typed when validation fails.
export type FormState = { error?: string; values?: Record<string, string> } | null;

const MAX_IMAGE = 10 * 1024 * 1024;

export async function loginAction(_: FormState, formData: FormData): Promise<FormState> {
  const ok = checkPassword(String(formData.get("password") ?? ""));
  if (!ok) {
    await new Promise((r) => setTimeout(r, 600));
    return { error: "Forkert adgangskode." };
  }
  await createSession();
  redirect("/admin");
}

export async function logoutAction() {
  await destroySession();
  redirect("/admin/login");
}

function detectImage(buf: Buffer): "jpg" | "png" | "webp" | null {
  if (buf.length > 12 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "jpg";
  if (buf.length > 8 && buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return "png";
  if (buf.length > 12 && buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") return "webp";
  return null;
}

const text = (f: FormData, k: string) => String(f.get(k) ?? "").trim();
const int = (f: FormData, k: string) => Number(text(f, k).replace(/[.\s]/g, ""));

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
  if (description.length > 1000) return fail("Beskrivelsen er for lang (maks. 1000 tegn).");

  let image = existing?.image ?? "";
  const file = formData.get("image");
  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_IMAGE) return fail("Billedet er for stort (maks. 10 MB).");
    const buf = Buffer.from(await file.arrayBuffer());
    const ext = detectImage(buf);
    if (!ext) return fail("Billedet skal være JPG, PNG eller WebP.");
    const name = `${randomUUID()}.${ext}`;
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    await fs.writeFile(path.join(UPLOAD_DIR, name), buf);
    if (existing) await removeUpload(existing.image);
    image = `/uploads/${name}`;
  }
  if (!image) return fail("Upload et billede af bilen.");

  const car: Car = {
    id: existing?.id ?? randomUUID(),
    brand,
    model,
    year,
    km,
    fuel,
    price,
    image,
    description,
    published: formData.get("published") === "on",
    createdAt: existing?.createdAt ?? new Date().toISOString(),
  };
  await saveCar(car);
  revalidatePath("/");
  redirect("/admin");
}

export async function deleteCarAction(formData: FormData) {
  await requireAdmin();
  await deleteCar(text(formData, "id"));
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function togglePublishedAction(formData: FormData) {
  await requireAdmin();
  const car = await getCar(text(formData, "id"));
  if (!car) return;
  await saveCar({ ...car, published: !car.published });
  revalidatePath("/");
  revalidatePath("/admin");
}
