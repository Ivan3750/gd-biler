import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getDict } from "./lib/i18n";
import { GEO, SITE_NAME, SITE_URL } from "./lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0E2A47" };

export async function generateMetadata(): Promise<Metadata> {
  const { t, lang } = await getDict();
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: `GD Biler – ${t.meta.title}`, template: "%s | GD Biler" },
    description: t.meta.description,
    applicationName: SITE_NAME,
    keywords: lang === "en"
      ? ["used cars Horsens", "car dealer Horsens", "used cars Denmark", "car workshop Horsens", "sell your car"]
      : ["brugte biler Horsens", "bilforhandler Horsens", "brugte biler til salg", "autoværksted Horsens", "sælg din bil"],
    formatDetection: { telephone: true, email: true, address: true },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
    other: {
      "geo.region": GEO.region,
      "geo.placename": GEO.placename,
      "geo.position": `${GEO.lat};${GEO.lng}`,
      ICBM: `${GEO.lat}, ${GEO.lng}`,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { lang } = await getDict();
  return (
    <html
      lang={lang}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
