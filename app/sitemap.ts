import type { MetadataRoute } from "next";
import { listPublishedCars } from "./lib/cars";
import { localePath } from "./lib/i18n";
import { absoluteUrl } from "./lib/seo";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cars = await listPublishedCars();
  const entry = (path: string, lastModified?: Date, priority?: number): MetadataRoute.Sitemap[number] => ({
    url: absoluteUrl(localePath("da", path)),
    lastModified,
    priority,
    alternates: {
      languages: {
        da: absoluteUrl(localePath("da", path)),
        en: absoluteUrl(localePath("en", path)),
      },
    },
  });

  return [
    entry("/", undefined, 1),
    entry("/biler", cars[0] && new Date(cars[0].createdAt), 0.9),
    entry("/vaerksted", undefined, 0.7),
    entry("/saelg-din-bil", undefined, 0.7),
    entry("/om-os", undefined, 0.6),
    entry("/kontakt", undefined, 0.5),
    ...cars.map((c) => entry(`/biler/${c.id}`, new Date(c.createdAt), 0.8)),
  ];
}
