import type { Metadata } from "next";
import { href, LANGS, type Lang } from "./i18n";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://gdbiler.dk").replace(/\/$/, "");

export const OG_LOCALE: Record<Lang, string> = { da: "da_DK", en: "en_GB" };

/** Canonical + hreflang links for a path (given without language prefix). */
export function alternates(lang: Lang, path: string): Metadata["alternates"] {
  return {
    canonical: `${SITE_URL}${href(lang, path)}`,
    languages: {
      ...Object.fromEntries(LANGS.map((l) => [l, `${SITE_URL}${href(l, path)}`])),
      "x-default": `${SITE_URL}${href("da", path)}`,
    },
  };
}

export function pageMetadata(lang: Lang, path: string, title: string, description: string, image?: string): Metadata {
  return {
    title,
    description,
    alternates: alternates(lang, path),
    openGraph: {
      title,
      description,
      url: `${SITE_URL}${href(lang, path)}`,
      siteName: "GD Biler",
      locale: OG_LOCALE[lang],
      type: "website",
      ...(image ? { images: [{ url: image.startsWith("http") ? image : `${SITE_URL}${image}` }] } : {}),
    },
  };
}

/** Safe to inline in a script tag even if a value contains `</script>`. */
export const jsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");
