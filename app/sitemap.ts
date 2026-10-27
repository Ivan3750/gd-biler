import type { MetadataRoute } from "next";
import { carPath, listPublicCars } from "@/app/lib/cars";
import { href, LANGS } from "@/app/lib/i18n";
import { SITE_URL } from "@/app/lib/site";

export const dynamic = "force-dynamic";

const PAGES = ["/", "/biler", "/finansiering", "/saelg-din-bil", "/om-os", "/kontakt", "/handelsbetingelser", "/privatlivspolitik", "/cookies"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cars = await listPublicCars();
  const paths = [
    ...PAGES.map((path) => ({ path, lastModified: undefined as string | undefined })),
    ...cars.filter((c) => c.status !== "sold").map((c) => ({ path: carPath(c), lastModified: c.updatedAt ?? c.createdAt })),
  ];

  return paths.map(({ path, lastModified }) => ({
    url: `${SITE_URL}${href("da", path)}`,
    lastModified,
    alternates: { languages: Object.fromEntries(LANGS.map((l) => [l, `${SITE_URL}${href(l, path)}`])) },
  }));
}
