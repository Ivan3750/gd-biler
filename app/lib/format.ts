import type { Lang } from "./i18n";

const locale = (lang: Lang) => (lang === "da" ? "da-DK" : "en-GB");

export const formatNumber = (n: number, lang: Lang = "da") => n.toLocaleString(locale(lang));

export const formatPrice = (n: number, currency: string, lang: Lang = "da") => `${formatNumber(n, lang)} ${currency}`;

export const formatDate = (iso: string, lang: Lang = "da") =>
  new Date(iso).toLocaleString(locale(lang), { dateStyle: "medium", timeStyle: "short", timeZone: "Europe/Copenhagen" });

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/æ/g, "ae")
    .replace(/ø/g, "o")
    .replace(/å/g, "a")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
