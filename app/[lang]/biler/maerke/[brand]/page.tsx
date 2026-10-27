import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/app/components/Breadcrumbs";
import { CarGrid } from "@/app/components/CarCard";
import { JsonLd } from "@/app/components/JsonLd";
import { PageHeader, Section } from "@/app/components/Section";
import { BrandChips } from "@/app/components/home/Sections";
import { btnPrimary } from "@/app/components/ui";
import { carPath, distinct, listPublicCars } from "@/app/lib/cars";
import { slugify } from "@/app/lib/format";
import { getDict, href } from "@/app/lib/i18n";
import { resolveLang } from "@/app/lib/i18n/server";
import { getSettings, telHref } from "@/app/lib/settings";
import { pageMetadata, SITE_URL } from "@/app/lib/site";

async function load(params: PageProps<"/[lang]/biler/maerke/[brand]">["params"]) {
  const { brand: slug } = await params;
  const all = await listPublicCars();
  const cars = all.filter((c) => slugify(c.brand) === slug);
  if (cars.length === 0) notFound();
  return { brand: cars[0].brand, cars, brands: distinct(all.map((c) => c.brand)).sort() };
}

export async function generateMetadata({ params }: PageProps<"/[lang]/biler/maerke/[brand]">): Promise<Metadata> {
  const lang = await resolveLang(params);
  const { brand, cars } = await load(params);
  const t = getDict(lang).brand;
  return pageMetadata(lang, `/biler/maerke/${slugify(brand)}`, t.metaTitle(brand), t.metaDescription(brand, cars.length), cars[0].images[0]);
}

export default async function BrandPage({ params }: PageProps<"/[lang]/biler/maerke/[brand]">) {
  const lang = await resolveLang(params);
  const dict = getDict(lang);
  const t = dict.brand;
  const { brand, cars, brands } = await load(params);
  const settings = await getSettings();

  return (
    <>
      <PageHeader title={t.title(brand)} lead={t.lead(brand)}>
        <Breadcrumbs
          lang={lang}
          home={dict.common.home}
          items={[{ name: dict.crumbs.cars, path: "/biler" }, { name: brand }]}
        />
      </PageHeader>
      <Section>
        <CarGrid cars={cars} lang={lang} dict={dict} currency={settings.currency} />
        <p className="mt-10 max-w-3xl text-lg leading-relaxed text-muted-foreground">{t.intro(brand)}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={telHref(settings.phone)} className={btnPrimary}>
            {settings.phone}
          </a>
        </div>
        <div className="mt-12">
          <h2 className="mb-4 text-xl font-bold">{t.otherBrands}</h2>
          <BrandChips lang={lang} brands={brands.filter((b) => b !== brand)} label={t.otherBrands} />
          <Link href={href(lang, "/biler")} className="text-sm underline underline-offset-2">
            {dict.common.seeAllCars}
          </Link>
        </div>
      </Section>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: t.title(brand),
          itemListElement: cars.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${SITE_URL}${href(lang, carPath(c))}`,
            name: `${c.brand} ${c.model} ${c.year}`,
          })),
        }}
      />
    </>
  );
}
