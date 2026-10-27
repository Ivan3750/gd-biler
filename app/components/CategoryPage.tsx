import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { CarGrid } from "./CarCard";
import { JsonLd } from "./JsonLd";
import { PageHeader, Section } from "./Section";
import { btnPrimary } from "./ui";
import type { Car } from "@/app/lib/cars";
import { carPath } from "@/app/lib/cars";
import { href, type Dict, type Lang } from "@/app/lib/i18n";
import { telHref } from "@/app/lib/settings-shared";
import { SITE_URL } from "@/app/lib/site";

type Props = { lang: Lang; dict: Dict; name: string; cars: Car[]; crumbs: Crumb[]; currency: string; phone: string; extra?: React.ReactNode };

/** Shared layout for the make / type / fuel landing pages. */
export function CategoryPage({ lang, dict, name, cars, crumbs, currency, phone, extra }: Props) {
  const t = dict.category;
  return (
    <>
      <PageHeader title={t.title(name)} lead={t.lead(name)}>
        <Breadcrumbs lang={lang} home={dict.common.home} items={crumbs} />
      </PageHeader>
      <Section>
        <CarGrid cars={cars} lang={lang} dict={dict} currency={currency} />
        <p className="mt-10 max-w-3xl text-lg leading-relaxed text-muted-foreground">{t.intro(name)}</p>
        <div className="mt-8">
          <a href={telHref(phone)} className={btnPrimary}>
            {phone}
          </a>
        </div>
        {extra}
      </Section>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: t.title(name),
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
