import type { Metadata } from "next";
import type { Lang } from "./dict";
import { localePath } from "./i18n";
import { phoneDigits, type Settings } from "./settings";

/** Public address of the site; set NEXT_PUBLIC_SITE_URL in production (see .env.example). */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
export const SITE_NAME = "GD Biler";

export const absoluteUrl = (path: string) => (/^https?:/.test(path) ? path : `${SITE_URL}${path}`);

/** Used for social previews when a page has no picture of its own. */
export const DEFAULT_OG_IMAGE = "/og-default.jpg";

/** Approximate position of the showroom in Horsens (used for local/geo search). */
export const GEO = { lat: 55.8607, lng: 9.8503, region: "DK-82", placename: "Horsens" };

type PageMeta = {
  lang: Lang;
  /** Language-less path, e.g. "/biler/abc". */
  path: string;
  title: string;
  description: string;
  image?: string;
  noindex?: boolean;
  /** Canonical path when it differs from `path` (e.g. filtered lists point at the unfiltered list). */
  canonicalPath?: string;
};

/** Title, description, canonical, hreflang alternates, Open Graph and Twitter tags for one page. */
export function pageMetadata({ lang, path, title, description, image, noindex, canonicalPath }: PageMeta): Metadata {
  const canonical = localePath(lang, canonicalPath ?? path);
  const images = [{ url: image ?? DEFAULT_OG_IMAGE }];
  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        da: localePath("da", path),
        en: localePath("en", path),
        "x-default": localePath("da", path),
      },
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title,
      description,
      url: canonical,
      locale: lang === "en" ? "en_GB" : "da_DK",
      alternateLocale: lang === "en" ? "da_DK" : "en_GB",
      images,
    },
    twitter: { card: "summary_large_image", title, description, images: images.map((i) => i.url) },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}

/** Local business data shown in search results (address, phone, opening hours). */
export function businessJsonLd(lang: Lang, description: string, s: Settings) {
  return {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    "@id": `${SITE_URL}/#business`,
    name: SITE_NAME,
    legalName: s.legalName,
    description,
    url: absoluteUrl(localePath(lang, "/")),
    telephone: phoneDigits(s.phone),
    email: s.email,
    vatID: `DK${s.cvr}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: s.street,
      postalCode: s.zip,
      addressLocality: s.city,
      addressCountry: "DK",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "09:00",
        closes: "17:00",
      },
    ],
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    logo: absoluteUrl(DEFAULT_OG_IMAGE),
    priceRange: "€€",
    currenciesAccepted: "DKK, EUR",
    paymentAccepted: "Cash, Bank transfer, Financing",
    knowsLanguage: ["da", "en"],
    geo: { "@type": "GeoCoordinates", latitude: GEO.lat, longitude: GEO.lng },
    hasMap: `https://www.google.com/maps?q=${encodeURIComponent(`${s.street}, ${s.zip} ${s.city}`)}`,
    areaServed: [
      { "@type": "City", name: "Horsens" },
      { "@type": "AdministrativeArea", name: "Midtjylland" },
      { "@type": "Country", name: "Denmark" },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: phoneDigits(s.phone),
      email: s.email,
      availableLanguage: ["Danish", "English"],
    },
  };
}

export function websiteJsonLd(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: absoluteUrl(localePath(lang, "/")),
    inLanguage: lang === "en" ? "en-GB" : "da-DK",
    publisher: { "@id": `${SITE_URL}/#business` },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

/** Escapes `<` so the JSON can sit safely inside a script tag. */
export const jsonLdString = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");
