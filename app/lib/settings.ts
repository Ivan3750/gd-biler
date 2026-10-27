import { cache } from "react";
import { readJson, writeJson } from "./store";

export type Settings = {
  phone: string;
  email: string;
  street: string;
  zip: string;
  city: string;
  cvr: string;
  legalName: string;
  /** Uploaded replacements for the site's pictures, by slot key (see images.ts). */
  images: Record<string, string>;
};

export const DEFAULT_SETTINGS: Settings = {
  phone: "+45 50 23 71 15",
  email: "kontakt@gdbiler.dk",
  street: "Langmarksvej 36A",
  zip: "8700",
  city: "Horsens",
  cvr: "44366452",
  legalName: "GD Biler I/S",
  images: {},
};

export const getSettings = cache(async (): Promise<Settings> => {
  const saved = await readJson<Partial<Settings>>("settings.json", {});
  return { ...DEFAULT_SETTINGS, ...saved, images: { ...saved.images } };
});

export async function saveSettings(s: Settings) {
  await writeJson("settings.json", s);
}

/** "+45 50 23 71 15" → "tel:+4550237115" */
export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;
export const phoneDigits = (phone: string) => phone.replace(/[^\d+]/g, "");

export const mapsEmbedUrl = (s: Settings) =>
  `https://www.google.com/maps?q=${encodeURIComponent(`${s.street}, ${s.zip} ${s.city}`)}&output=embed`;
