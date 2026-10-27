import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryPage } from "@/app/components/CategoryPage";
import { listPublicCars } from "@/app/lib/cars";
import { slugify } from "@/app/lib/format";
import { getDict } from "@/app/lib/i18n";
import { resolveLang } from "@/app/lib/i18n/server";
import { getSettings } from "@/app/lib/settings";
import { pageMetadata } from "@/app/lib/site";
import { BODY_TYPES } from "@/app/lib/vehicle";

async function load(params: PageProps<"/[lang]/biler/type/[type]">["params"]) {
  const { type: slug } = await params;
  const key = BODY_TYPES.find((x) => slugify(x) === slug);
  if (!key) notFound();
  const cars = (await listPublicCars()).filter((c) => c.body === key);
  if (cars.length === 0) notFound();
  return { key, cars };
}

export async function generateMetadata({ params }: PageProps<"/[lang]/biler/type/[type]">): Promise<Metadata> {
  const lang = await resolveLang(params);
  const { key, cars } = await load(params);
  const t = getDict(lang).category;
  const name = t.bodyNames[key];
  return pageMetadata(lang, `/biler/type/${slugify(key)}`, t.metaTitle(name), t.metaDescription(name, cars.length), cars[0].images[0]);
}

export default async function Page({ params }: PageProps<"/[lang]/biler/type/[type]">) {
  const lang = await resolveLang(params);
  const dict = getDict(lang);
  const { key, cars } = await load(params);
  const settings = await getSettings();
  return (
    <CategoryPage
      lang={lang}
      dict={dict}
      name={dict.category.bodyNames[key]}
      cars={cars}
      currency={settings.currency}
      phone={settings.phone}
      crumbs={[{ name: dict.crumbs.cars, path: "/biler" }, { name: dict.category.bodyNames[key] }]}
    />
  );
}
