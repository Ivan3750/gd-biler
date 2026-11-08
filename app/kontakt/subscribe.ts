"use server";
import { randomUUID } from "crypto";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { addSubscriber } from "@/app/lib/subscribers";

export type SubscribeState = { ok?: boolean; error?: string; email?: string } | null;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// A handful of sign-ups per address per ten minutes is plenty for a person and slows down bots.
const hits = new Map<string, number[]>();
function tooMany(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const text = (f: FormData, k: string, max: number) => String(f.get(k) ?? "").trim().slice(0, max);

export async function subscribeAction(_: SubscribeState, formData: FormData): Promise<SubscribeState> {
  // Hidden field that humans leave empty: pretend success to bots.
  if (text(formData, "website", 200)) return { ok: true };

  const email = text(formData, "email", 120);
  const lang = text(formData, "lang", 2) === "en" ? "en" : "da";
  const search = text(formData, "search", 400);
  if (!EMAIL.test(email)) return { error: "email", email };
  if (formData.get("consent") !== "on") return { error: "consent", email };

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (tooMany(ip)) return { error: "server", email };

  try {
    await addSubscriber({ id: randomUUID(), createdAt: new Date().toISOString(), email, lang, search: search || undefined });
  } catch {
    return { error: "server", email };
  }
  revalidatePath("/admin/abonnenter");
  return { ok: true, email };
}
