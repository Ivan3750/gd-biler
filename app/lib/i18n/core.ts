export const LANGS = ["da", "en"] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = "da";

export const isLang = (v: string): v is Lang => (LANGS as readonly string[]).includes(v);

/** Danish lives at the site root, other languages under /<lang>. The proxy maps both onto app/[lang]. */
export const href = (lang: Lang, path: string) => (lang === DEFAULT_LANG ? path || "/" : `/${lang}${path === "/" ? "" : path}`);

export const bilingual = (lang: Lang, v: { da: string; en: string }) => (lang === "en" && v.en ? v.en : v.da);
