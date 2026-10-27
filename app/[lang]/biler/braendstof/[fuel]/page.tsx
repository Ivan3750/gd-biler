import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryPage } from "@/app/components/CategoryPage";
import { listPublicCars } from "@/app/lib/cars";
import { slugify } from "@/app/lib/format";
import { getDict } from "@/app/lib/i18n";
import { resolveLang } from "@/app/lib/i18n/server";
import { getSettings } from "@/app/lib/settings";
import { pageMetadata } from "@/app/lib/site";
import { FUELS } from "@/app/lib/vehicle";

async function load(params: PageProps<"/[lang]/biler/braendstof/[fuel]">["params"]) {
  const { fuel: slug } = await params;
  const key = FUELS.find((x) => slugify(x) === slug);
  if (!key) notFound();
  const cars = (await listPublicCars()).filter((c) => c.fuel === key);
  if (cars.length === 0) notFound();
  return { key, cars };
}

export async function generateMetadata({ params }: PageProps<"/[lang]/biler/braendstof/[fuel]">): Promise<Metadata> {
  const lang = await resolveLang(params);
  const { key, cars } = await load(params);
  const t = getDict(lang).category;
  const name = t.fuelNames[key];
  return pageMetadata(lang, `/biler/braendstof/${slugify(key)}`, t.metaTitle(name), t.metaDescription(name, cars.length), cars[0].images[0]);
}

export default async function Page({ params }: PageProps<"/[lang]/biler/braendstof/[fuel]">) {
  const lang = await resolveLang(params);
  const dict = getDict(lang);
  const { key, cars } = await load(params);
  const settings = await getSettings();
  return (
    <CategoryPage
      lang={lang}
      dict={dict}
      name={dict.category.fuelNames[key]}
      cars={cars}
      currency={settings.currency}
      phone={settings.phone}
      crumbs={[{ name: dict.crumbs.cars, path: "/biler" }, { name: dict.category.fuelNames[key] }]}
    />
  );
}
