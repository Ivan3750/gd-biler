"use server";
import { headers } from "next/headers";
import { addLead, LEAD_TYPES, type LeadType } from "./leads";
import { getCar, carTitle } from "./cars";
import { getDict, isLang, DEFAULT_LANG } from "./i18n";
import { allowed, record } from "./ratelimit";

export type LeadState = { ok?: true; error?: string; values?: Record<string, string> } | null;

// Extra answers per form, stored with Danish labels because the admin is in Danish.
const DETAILS: Record<LeadType, Record<string, string>> = {
  contact: {},
  car: {},
  sell: { brand: "Mærke", model: "Model", year: "Årgang", km: "Kilometer", price: "Prisønske" },
  finance: { price: "Bilens pris", down: "Udbetaling", months: "Løbetid (mdr.)", monthly: "Ydelse pr. måned" },
};

const WINDOW = 10 * 60 * 1000;
const LIMIT = 5;

const clean = (v: FormDataEntryValue | null, max: number) => String(v ?? "").trim().slice(0, max);

export async function submitLeadAction(_: LeadState, formData: FormData): Promise<LeadState> {
  const langValue = clean(formData.get("lang"), 5);
  const lang = isLang(langValue) ? langValue : DEFAULT_LANG;
  const t = getDict(lang).form.errors;

  const values: Record<string, string> = {};
  formData.forEach((v, k) => {
    if (typeof v === "string" && k !== "consent") values[k] = v;
  });
  const fail = (error: string): LeadState => ({ error, values });

  // Bots fill in the hidden field; pretend it worked.
  if (clean(formData.get("website"), 200)) return { ok: true };

  const type = clean(formData.get("type"), 10) as LeadType;
  if (!LEAD_TYPES.includes(type)) return fail(t.generic);

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (!allowed(`lead:${ip}`, LIMIT, WINDOW)) return fail(t.tooMany);

  const name = clean(formData.get("name"), 100);
  const email = clean(formData.get("email"), 200);
  const phone = clean(formData.get("phone"), 30);
  const message = clean(formData.get("message"), 3000);

  if (name.length < 2) return fail(t.name);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return fail(t.email);
  if (phone && !/^[+\d][\d\s().-]{5,}$/.test(phone)) return fail(t.phone);
  if ((type === "contact" || type === "car") && message.length < 10) return fail(t.message);
  if (formData.get("consent") !== "on") return fail(t.consent);

  const details: Record<string, string> = {};
  for (const [key, label] of Object.entries(DETAILS[type])) {
    const value = clean(formData.get(`d_${key}`), 80);
    if (value) details[label] = value;
  }
  if (type === "sell" && (!details["Mærke"] || !details["Model"] || !details["Årgang"] || !details["Kilometer"])) {
    return fail(t.fields);
  }

  let carId: string | undefined;
  let car: string | undefined;
  if (type === "car") {
    const found = await getCar(clean(formData.get("carId"), 40));
    if (found) {
      carId = found.id;
      car = carTitle(found);
    }
  }

  record(`lead:${ip}`, WINDOW);
  await addLead({
    type,
    lang,
    name,
    email,
    phone,
    message,
    ...(carId ? { carId, carTitle: car } : {}),
    ...(Object.keys(details).length ? { details } : {}),
  });
  return { ok: true };
}
