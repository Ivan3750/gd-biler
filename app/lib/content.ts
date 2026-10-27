import { cache } from "react";
import { dict, type Dict, type Lang } from "./dict";
import { readJson, writeJson } from "./store";

/** Text overrides saved from the admin, as `{ da: { "hero.title.0": "…" }, en: { … } }`. */
export type Overrides = Record<Lang, Record<string, string>>;

const FILE = "content.json";

export const loadOverrides = cache(async (): Promise<Overrides> => {
  const saved = await readJson<Partial<Overrides>>(FILE, {});
  return { da: saved.da ?? {}, en: saved.en ?? {} };
});

export async function saveOverrides(o: Overrides) {
  await writeJson(FILE, o);
}

/** Every editable string in a dictionary, keyed by its dotted path. */
export function flatten(value: unknown, prefix = ""): [string, string][] {
  if (typeof value === "string") return [[prefix, value]];
  if (Array.isArray(value)) return value.flatMap((v, i) => flatten(v, prefix ? `${prefix}.${i}` : String(i)));
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([k, v]) => flatten(v, prefix ? `${prefix}.${k}` : k));
  }
  return [];
}

/** Copy of `base` with the overridden strings replaced. Unknown paths are ignored. */
export function applyOverrides<T>(base: T, overrides: Record<string, string>): T {
  const copy = structuredClone(base) as unknown;
  for (const [path, value] of Object.entries(overrides)) {
    const keys = path.split(".");
    let node = copy as Record<string, unknown>;
    for (const k of keys.slice(0, -1)) {
      const next = node?.[k];
      if (next === undefined || next === null || typeof next !== "object") {
        node = undefined as never;
        break;
      }
      node = next as Record<string, unknown>;
    }
    const last = keys[keys.length - 1];
    if (node && typeof node[last] === "string") node[last] = value;
  }
  return copy as T;
}

/** The dictionary for a language with the admin's edits applied. */
export const getContent = cache(async (lang: Lang): Promise<Dict> => {
  const o = await loadOverrides();
  return applyOverrides(dict[lang], o[lang]);
});

/** Friendly names for the top-level groups shown in the admin text editor. */
export const SECTION_LABELS: Record<string, string> = {
  meta: "SEO – titler og beskrivelser",
  nav: "Menu",
  hero: "Forside – øverst",
  cars: "Biler – liste og kort",
  tiles: "Forside – fliser",
  why: "Forside – hvorfor vælge os",
  about: "Forside – om GD Biler",
  process: "Forside – sådan køber du",
  reviews: "Kundeanmeldelser",
  contact: "Kontaktblok og åbningstider",
  footer: "Sidefod",
  aboutPage: "Siden Om os",
  workshop: "Siden Værksted",
  sell: "Siden Sælg din bil",
  contactPage: "Siden Kontakt",
  form: "Kontaktformular",
  catalog: "Siden Biler (filtre)",
  car: "Bilside",
};

export { dict };
