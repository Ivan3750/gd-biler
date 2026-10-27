import type { MetadataRoute } from "next";
import { carPath, listPublicCars, distinct } from "@/app/lib/cars";
import { slugify } from "@/app/lib/format";
import { href, LANGS } from "@/app/lib/i18n";
import { afterLinks, infoLinks, legalPaths, mainLinks } from "@/app/lib/nav";
import { GUIDE_SLUGS } from "@/app/lib/guides";
import { SITE_URL } from "@/app/lib/site";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cars = (await listPublicCars()).filter((c) => c.status !== "sold");
  const staticPaths = ["/", ...mainLinks.map((l) => l.path), ...infoLinks.map((l) => l.path), ...afterLinks.map((l) => l.path), ...legalPaths];
  const brands = distinct(cars.map((c) => c.brand)).map((b) => `/biler/maerke/${slugify(b)}`);

  const types = distinct(cars.map((c) => c.body)).map((b) => `/biler/type/${slugify(b)}`);
  const fuels = distinct(cars.map((c) => c.fuel)).map((f) => `/biler/braendstof/${slugify(f)}`);
  const guides = GUIDE_SLUGS.map((s) => `/guides/${s}`);

  const entries = [
    ...[...types, ...fuels].map((path) => ({ path, lastModified: undefined, priority: 0.6 })),
    ...guides.map((path) => ({ path, lastModified: "2026-10-27", priority: 0.7 })),
    ...staticPaths.map((path) => ({ path, lastModified: undefined as string | undefined, priority: path === "/" ? 1 : legalPaths.includes(path as never) ? 0.3 : 0.8 })),
    ...brands.map((path) => ({ path, lastModified: undefined, priority: 0.7 })),
    ...cars.map((c) => ({ path: carPath(c), lastModified: c.updatedAt ?? c.createdAt, priority: 0.9 })),
  ];

  return entries.flatMap(({ path, lastModified, priority }) =>
    LANGS.map((lang) => ({
      url: `${SITE_URL}${href(lang, path)}`,
      lastModified,
      priority,
      alternates: { languages: Object.fromEntries(LANGS.map((l) => [l, `${SITE_URL}${href(l, path)}`])) },
    })),
  );
}
