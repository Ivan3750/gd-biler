import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CarGrid } from "@/app/components/CarCard";
import { Hero } from "@/app/components/home/Hero";
import { Faq } from "@/app/components/Faq";
import { AboutTeaser, Areas, BrandChips, Process, Services, Testimonials, TrustStrip, VisitUs, WhyUs } from "@/app/components/home/Sections";
import { Section, SectionHeading } from "@/app/components/Section";
import { btnSecondary } from "@/app/components/ui";
import { distinct, listPublicCars } from "@/app/lib/cars";
import { bilingual, getDict, href } from "@/app/lib/i18n";
import { resolveLang } from "@/app/lib/i18n/server";
import { getSettings } from "@/app/lib/settings";
import { fillTokens } from "@/app/lib/text";
import { pageMetadata } from "@/app/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const lang = await resolveLang(params);
  const settings = await getSettings();
  return pageMetadata(lang, "/", `GD Biler – ${getDict(lang).home.metaTitle}`, bilingual(lang, settings.heroSubtitle));
}

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const lang = await resolveLang(params);
  const dict = getDict(lang);
  const [settings, cars] = await Promise.all([getSettings(), listPublicCars()]);
  const fill = fillTokens(settings);
  const g = dict.faq.groups;
  const faqItems = [...g[0].items.slice(0, 3), g[1].items[0], g[2].items[0]].map((i) => ({ q: i.q, a: fill(i.a) }));

  return (
    <>
      <Hero
        lang={lang}
        dict={dict}
        title={bilingual(lang, settings.heroTitle)}
        subtitle={bilingual(lang, settings.heroSubtitle)}
        brands={distinct(cars.map((c) => c.brand)).sort()}
        bodies={distinct(cars.map((c) => c.body))}
        currency={settings.currency}
      />

      <Section>
        <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading title={dict.home.featured.title} className="mb-0" />
          <Link href={href(lang, "/biler")} className={btnSecondary}>
            {dict.common.seeAllCars} <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
        {cars.length === 0 ? (
          <p className="text-muted-foreground">{dict.home.featured.empty}</p>
        ) : (
          <>
            <BrandChips lang={lang} brands={distinct(cars.map((c) => c.brand)).sort()} label={dict.cars.filters.brand} />
            <CarGrid cars={cars.slice(0, 6)} lang={lang} dict={dict} currency={settings.currency} />
          </>
        )}
      </Section>

      <TrustStrip lang={lang} dict={dict} />
      <AboutTeaser lang={lang} dict={dict} settings={settings} />
      <WhyUs dict={dict} />
      <Process dict={dict} />
      <Services lang={lang} dict={dict} />
      <Testimonials lang={lang} dict={dict} />

      <Section>
        <SectionHeading title={dict.homeFaq.title} />
        <div className="max-w-3xl">
          <Faq items={faqItems} />
        </div>
        <Link href={href(lang, "/faq")} className={`${btnSecondary} mt-8`}>
          {dict.homeFaq.more} <ArrowRight size={16} aria-hidden />
        </Link>
      </Section>

      <Areas lang={lang} dict={dict} />
      <VisitUs dict={dict} settings={settings} />
    </>
  );
}
