"use server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { checkPassword, createSession, destroySession, requireAdmin } from "@/app/lib/auth";
import { deleteCar, getCar, newCarId, patchCar, saveCar, type Car } from "@/app/lib/cars";
import { deleteLead, setLeadStatus } from "@/app/lib/leads";
import { allowed, record } from "@/app/lib/ratelimit";
import { getSettings, saveSettings, type Settings } from "@/app/lib/settings";
import { removeUpload, saveUpload } from "@/app/lib/uploads";
import { BODY_TYPES, FUELS, GEARBOXES, MAX_IMAGES, STATUSES, type BodyType, type CarStatus, type Fuel, type Gearbox } from "@/app/lib/vehicle";

// `values` lets a form keep what was typed when validation fails.
export type FormState = { error?: string; ok?: boolean; values?: Record<string, string> } | null;

const text = (f: FormData, k: string) => String(f.get(k) ?? "").trim();
const int = (f: FormData, k: string) => Number(text(f, k).replace(/[.\s]/g, ""));

/** Public pages read the same files, so refresh everything after any change. */
const refresh = () => revalidatePath("/", "layout");

const LOGIN_WINDOW = 15 * 60 * 1000;

export async function loginAction(_: FormState, formData: FormData): Promise<FormState> {
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (!allowed(`login:${ip}`, 5, LOGIN_WINDOW)) return { error: "For mange forsøg. Vent et kvarter og prøv igen." };

  if (!checkPassword(String(formData.get("password") ?? ""))) {
    record(`login:${ip}`, LOGIN_WINDOW);
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

/* ---------- Cars ---------- */

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
  const gearbox = text(formData, "gearbox") as Gearbox | "";
  const body = text(formData, "body") as BodyType | "";
  const status = text(formData, "status") as CarStatus;
  const color = text(formData, "color");
  const description = text(formData, "description");
  const descriptionEn = text(formData, "descriptionEn");
  const year = int(formData, "year");
  const km = int(formData, "km");
  const price = int(formData, "price");
  const hpText = text(formData, "hp");
  const hp = hpText ? int(formData, "hp") : undefined;

  const maxYear = new Date().getFullYear() + 1;
  if (!brand || brand.length > 40) return fail("Skriv et mærke (maks. 40 tegn).");
  if (!model || model.length > 80) return fail("Skriv en model (maks. 80 tegn).");
  if (!Number.isInteger(year) || year < 1980 || year > maxYear) return fail(`Årgang skal være mellem 1980 og ${maxYear}.`);
  if (!Number.isInteger(km) || km < 0 || km > 2_000_000) return fail("Kilometer er ikke gyldige.");
  if (!Number.isInteger(price) || price <= 0 || price > 10_000_000) return fail("Prisen er ikke gyldig.");
  if (!FUELS.includes(fuel)) return fail("Vælg brændstof.");
  if (gearbox && !GEARBOXES.includes(gearbox)) return fail("Gearkassen er ikke gyldig.");
  if (body && !BODY_TYPES.includes(body)) return fail("Biltypen er ikke gyldig.");
  if (!STATUSES.includes(status)) return fail("Vælg en status.");
  if (color.length > 30) return fail("Farven er for lang.");
  if (hp !== undefined && (!Number.isInteger(hp) || hp < 1 || hp > 2000)) return fail("Hestekræfter er ikke gyldige.");
  if (description.length > 3000 || descriptionEn.length > 3000) return fail("Beskrivelsen er for lang (maks. 3000 tegn).");

  // The form sends the final photo order: "u:<url>" for photos already on the listing, "n:<i>" for the i-th new file.
  const order = formData.getAll("order").map(String);
  const files = formData.getAll("images").filter((f): f is File => f instanceof File && f.size > 0);
  const known = new Set(existing?.images ?? []);
  const created: string[] = [];
  const images: string[] = [];

  const cleanup = () => Promise.all(created.map(removeUpload));

  if (order.length > MAX_IMAGES) return fail(`Du kan højst have ${MAX_IMAGES} billeder.`);
  for (const token of order) {
    if (token.startsWith("u:")) {
      const url = token.slice(2);
      if (known.has(url) && !images.includes(url)) images.push(url);
    } else if (token.startsWith("n:")) {
      const file = files[Number(token.slice(2))];
      if (!file) continue;
      const saved = await saveUpload(file);
      if ("error" in saved) {
        await cleanup();
        return fail(saved.error);
      }
      created.push(saved.url);
      images.push(saved.url);
    }
  }
  if (images.length === 0) return fail("Upload mindst ét billede af bilen.");

  const car: Car = {
    id: existing?.id ?? newCarId(),
    brand,
    model,
    year,
    km,
    fuel,
    gearbox: gearbox || undefined,
    body: body || undefined,
    color: color || undefined,
    hp,
    price,
    images,
    description,
    descriptionEn,
    status,
    published: formData.get("published") === "on",
    createdAt: existing?.createdAt ?? new Date().toISOString(),
  };
  await saveCar(car);
  // Photos that were taken off the listing are no longer needed.
  await Promise.all((existing?.images ?? []).filter((u) => !images.includes(u)).map(removeUpload));

  refresh();
  redirect("/admin/biler");
}

export async function deleteCarAction(formData: FormData) {
  await requireAdmin();
  await deleteCar(text(formData, "id"));
  refresh();
}

export async function togglePublishedAction(formData: FormData) {
  await requireAdmin();
  const car = await getCar(text(formData, "id"));
  if (car) await patchCar(car.id, { published: !car.published });
  refresh();
}

export async function setStatusAction(formData: FormData) {
  await requireAdmin();
  const status = text(formData, "status") as CarStatus;
  if (STATUSES.includes(status)) await patchCar(text(formData, "id"), { status });
  refresh();
}

/* ---------- Enquiries ---------- */

export async function setLeadStatusAction(formData: FormData) {
  await requireAdmin();
  await setLeadStatus(text(formData, "id"), text(formData, "status") === "handled" ? "handled" : "new");
  revalidatePath("/admin", "layout");
}

export async function deleteLeadAction(formData: FormData) {
  await requireAdmin();
  await deleteLead(text(formData, "id"));
  revalidatePath("/admin", "layout");
}

/* ---------- Settings ---------- */

export async function saveSettingsAction(_: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const t = (k: string, max = 200) => text(formData, k).slice(0, max);
  const fail = (error: string): FormState => ({ error });

  const current = await getSettings();
  const time = /^([01]\d|2[0-3]):[0-5]\d$/;

  const hours = current.hours.map((_, i) => ({
    closed: formData.get(`closed${i}`) === "on",
    open: t(`open${i}`, 5),
    close: t(`close${i}`, 5),
  }));
  if (hours.some((h) => !h.closed && (!time.test(h.open) || !time.test(h.close) || h.open >= h.close))) {
    return fail("Åbningstiderne er ikke gyldige. Åbning skal være før lukning (fx 09:00 og 17:00).");
  }

  const email = t("email");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return fail("E-mailadressen er ikke gyldig.");
  const phone = t("phone", 30);
  if (!/^[+\d][\d\s().-]{5,}$/.test(phone)) return fail("Telefonnummeret er ikke gyldigt.");
  for (const k of ["facebook", "instagram"]) {
    const v = t(k, 300);
    if (v && !/^https:\/\//.test(v)) return fail("Links til sociale medier skal starte med https://");
  }
  const rate = Number(t("financeRate", 6).replace(",", "."));
  if (!Number.isFinite(rate) || rate < 0 || rate > 40) return fail("Renten skal være mellem 0 og 40 %.");
  if (!t("company") || !t("street") || !t("zip", 10) || !t("city")) return fail("Udfyld firmanavn og adresse.");

  const settings: Settings = {
    company: t("company"),
    cvr: t("cvr", 20),
    phone,
    email,
    street: t("street"),
    zip: t("zip", 10),
    city: t("city"),
    hours,
    heroTitle: { da: t("heroTitleDa", 120), en: t("heroTitleEn", 120) },
    heroSubtitle: { da: t("heroSubtitleDa", 240), en: t("heroSubtitleEn", 240) },
    about: { da: t("aboutDa", 2000), en: t("aboutEn", 2000) },
    notice: { da: t("noticeDa", 200), en: t("noticeEn", 200) },
    facebook: t("facebook", 300),
    instagram: t("instagram", 300),
    currency: t("currency", 6) || "€",
    financeRate: rate,
  };
  if (!settings.heroTitle.da || !settings.about.da) return fail("Overskrift og om-tekst på dansk skal udfyldes.");

  await saveSettings(settings);
  refresh();
  return { ok: true };
}

