import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { geistMono, geistSans } from "@/app/fonts";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { JsonLd } from "@/app/components/JsonLd";
import { MobileBar } from "@/app/components/MobileBar";
import { getDict, href, isLang, LANGS, bilingual } from "@/app/lib/i18n";
import { getSettings, addressLine } from "@/app/lib/settings";
import { alternates, OG_LOCALE, SITE_URL } from "@/app/lib/site";
import "../globals.css";

// Listings and settings are read from disk, so nothing here can be built ahead of time.
export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const settings = await getSettings();
  const description = bilingual(lang, settings.heroSubtitle);
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: `GD Biler – ${getDict(lang).home.metaTitle}`, template: "%s | GD Biler" },
    description,
    alternates: alternates(lang, "/"),
    openGraph: { siteName: "GD Biler", locale: OG_LOCALE[lang], type: "website", description },
    // Regional hints for search engines: Region Midtjylland, Horsens.
    other: {
      "geo.region": "DK-82",
      "geo.placename": settings.city,
      ...(settings.lat && settings.lng ? { "geo.position": `${settings.lat};${settings.lng}`, ICBM: `${settings.lat}, ${settings.lng}` } : {}),
    },
    formatDetection: { telephone: true },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const dict = getDict(lang);
  const settings = await getSettings();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    "@id": `${SITE_URL}/#dealer`,
    name: "GD Biler",
    legalName: settings.company,
    description: bilingual(lang, settings.heroSubtitle),
    url: `${SITE_URL}${href(lang, "/")}`,
    logo: `${SITE_URL}/logo.jpg`,
    image: `${SITE_URL}${href(lang, "/")}opengraph-image`,
    inLanguage: lang,
    currenciesAccepted: settings.currency === "€" ? "EUR" : "DKK",
    paymentAccepted: ["Cash", "Bank transfer", "Financing"],
    ...(settings.lat && settings.lng ? { geo: { "@type": "GeoCoordinates", latitude: Number(settings.lat), longitude: Number(settings.lng) } } : {}),
    areaServed: ["Horsens", "Aarhus", "Vejle", "Skanderborg", "Silkeborg", "Hedensted", "Odder", "Juelsminde"].map((name) => ({ "@type": "City", name })),
    sameAs: [settings.facebook, settings.instagram].filter(Boolean),
    knowsLanguage: ["da", "en"],
    telephone: settings.phone,
    email: settings.email,
    vatID: settings.cvr,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.street,
      postalCode: settings.zip,
      addressLocality: settings.city,
      addressCountry: "DK",
    },
    openingHoursSpecification: settings.hours.flatMap((h, i) =>
      h.closed
        ? []
        : [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"][i],
              opens: h.open,
              closes: h.close,
            },
          ],
    ),
  };

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "GD Biler",
    url: `${SITE_URL}${href(lang, "/")}`,
    inLanguage: lang,
    publisher: { "@id": `${SITE_URL}/#dealer` },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}${href(lang, "/biler")}?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang={dict.htmlLang} className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col pb-[calc(3.75rem+env(safe-area-inset-bottom))] lg:pb-0">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          {dict.skipToContent}
        </a>
        <Header lang={lang} settings={settings} nav={dict.nav} info={dict.info} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer lang={lang} settings={settings} dict={dict} address={addressLine(settings)} />
        <MobileBar lang={lang} phone={settings.phone} text={dict.mobileBar} />
        <JsonLd data={structuredData} />
        <JsonLd data={websiteData} />
      </body>
    </html>
  );
}
