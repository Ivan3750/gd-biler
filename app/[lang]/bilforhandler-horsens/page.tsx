import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/app/components/Breadcrumbs";
import { CarGrid } from "@/app/components/CarCard";
import { Hours } from "@/app/components/Hours";
import { MapEmbed } from "@/app/components/MapEmbed";
import { Prose } from "@/app/components/Prose";
import { PageHeader, Section, SectionHeading } from "@/app/components/Section";
import { Areas } from "@/app/components/home/Sections";
import { btnPrimary } from "@/app/components/ui";
import { listPublicCars } from "@/app/lib/cars";
import { getDict, href } from "@/app/lib/i18n";
import { resolveLang } from "@/app/lib/i18n/server";
import { addressLine, getSettings } from "@/app/lib/settings";
import { pageMetadata } from "@/app/lib/site";
import { fillTokens } from "@/app/lib/text";

export async function generateMetadata({ params }: PageProps<"/[lang]/bilforhandler-horsens">): Promise<Metadata> {
  const lang = await resolveLang(params);
  const t = getDict(lang).local;
  return pageMetadata(lang, "/bilforhandler-horsens", t.metaTitle, t.metaDescription);
}

export default async function LocalPage({ params }: PageProps<"/[lang]/bilforhandler-horsens">) {
  const lang = await resolveLang(params);
  const dict = getDict(lang);
  const t = dict.local;
  const [settings, cars] = await Promise.all([getSettings(), listPublicCars()]);

  return (
    <>
      <PageHeader title={t.title} lead={t.lead}>
        <Breadcrumbs lang={lang} home={dict.common.home} items={[{ name: dict.info.items.local }]} />
      </PageHeader>

      <Section>
        <Prose sections={t.sections} fill={fillTokens(settings)} />
        <div className="mt-10 grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <h2 className="mb-3 text-xl font-bold">{dict.common.openHours}</h2>
            <Hours settings={settings} dict={dict} />
          </div>
          <div className="lg:col-span-3">
            <MapEmbed address={addressLine(settings)} text={dict.map} />
          </div>
        </div>
      </Section>

      {cars.length > 0 && (
        <Section tone="gray">
          <SectionHeading title={dict.home.featured.title} />
          <CarGrid cars={cars.slice(0, 3)} lang={lang} dict={dict} currency={settings.currency} />
          <Link href={href(lang, "/biler")} className={`${btnPrimary} mt-8`}>
            {t.cta}
          </Link>
        </Section>
      )}

      <Areas lang={lang} dict={dict} />
    </>
  );
}
