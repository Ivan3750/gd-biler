"use server";
import { randomUUID } from "crypto";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { getCar } from "@/app/lib/cars";
import { addMessage } from "@/app/lib/messages";

export type ContactState = { ok?: boolean; error?: string; values?: Record<string, string> } | null;

const TOPICS = ["buy", "service", "sell", "other"];
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// A few messages per address per ten minutes is plenty for a person and slows down bots.
const hits = new Map<string, number[]>();
function tooMany(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const text = (f: FormData, k: string, max: number) => String(f.get(k) ?? "").trim().slice(0, max);

export async function sendMessageAction(_: ContactState, formData: FormData): Promise<ContactState> {
  const values: Record<string, string> = {};
  formData.forEach((v, k) => {
    if (typeof v === "string") values[k] = v;
  });
  const fail = (error: string): ContactState => ({ error, values });

  // Hidden field that humans leave empty: pretend success to bots.
  if (text(formData, "website", 200)) return { ok: true };

  const name = text(formData, "name", 100);
  const phone = text(formData, "phone", 40);
  const email = text(formData, "email", 120);
  const message = String(formData.get("message") ?? "").trim();
  const topic = text(formData, "topic", 20);
  const regNo = text(formData, "regNo", 20).toUpperCase();
  const km = text(formData, "km", 12);
  const lang = text(formData, "lang", 2) === "en" ? "en" : "da";

  if (!name) return fail("name");
  if (!phone && !email) return fail("contact");
  if (email && !EMAIL.test(email)) return fail("email");
  if (topic === "sell") {
    if (!regNo) return fail("regNo");
    if (message.length > 2000) return fail("message");
  } else if (!message || message.length > 2000) {
    return fail("message");
  }
  if (formData.get("consent") !== "on") return fail("consent");

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (tooMany(ip)) return fail("server");

  const carId = text(formData, "carId", 80);
  const car = carId ? await getCar(carId) : undefined;

  try {
    await addMessage({
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      name,
      phone,
      email,
      topic: TOPICS.includes(topic) ? topic : "other",
      carId: car?.id,
      carName: car ? `${car.brand} ${car.model} ${car.year}` : undefined,
      message,
      regNo: regNo || undefined,
      km: km || undefined,
      lang,
      read: false,
    });
  } catch {
    return fail("server");
  }
  revalidatePath("/admin/messages");
  return { ok: true };
}
