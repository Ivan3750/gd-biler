import { headers } from "next/headers";
import type { Dict, Lang } from "./dict";
import { getContent } from "./content";

/** The proxy tags `/en/...` requests; everything else is Danish. */
export async function getLang(): Promise<Lang> {
  return (await headers()).get("x-lang") === "en" ? "en" : "da";
}

/** The site's texts for the current language, including edits made in the admin. */
export async function getDict(): Promise<{ lang: Lang; t: Dict }> {
  const lang = await getLang();
  return { lang, t: await getContent(lang) };
}

/** Prefixes an internal path with the language, e.g. ("en", "/biler") → "/en/biler". */
export const localePath = (lang: Lang, path: string) => (lang === "en" ? `/en${path === "/" ? "" : path}` : path);

export const formatNumber = (n: number, lang: Lang) => n.toLocaleString(lang === "en" ? "en-GB" : "da-DK");

export const formatPrice = (n: number, lang: Lang) =>
  lang === "en" ? `€${formatNumber(n, lang)}` : `${formatNumber(n, lang)} €`;
