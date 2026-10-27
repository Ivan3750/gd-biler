import type { Metadata } from "next";
import { FinanceCalculator } from "@/app/components/FinanceCalculator";
import { PageHeader, Section, SectionHeading } from "@/app/components/Section";
import { getDict, href } from "@/app/lib/i18n";
import { resolveLang } from "@/app/lib/i18n/server";
import { getSettings } from "@/app/lib/settings";
import { pageMetadata } from "@/app/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]/finansiering">): Promise<Metadata> {
  const lang = await resolveLang(params);
  const t = getDict(lang).finance;
  return pageMetadata(lang, "/finansiering", t.metaTitle, t.metaDescription);
}

export default async function FinancePage({ params, searchParams }: PageProps<"/[lang]/finansiering">) {
  const lang = await resolveLang(params);
  const dict = getDict(lang);
  const t = dict.finance;
  const settings = await getSettings();
  const sp = await searchParams;
  const fromCar = Number(Array.isArray(sp.price) ? sp.price[0] : sp.price);
  const defaultPrice = Number.isFinite(fromCar) && fromCar > 0 && fromCar <= 10_000_000 ? Math.round(fromCar) : 30000;

  return (
    <>
      <PageHeader title={t.title} lead={t.lead} />
      <Section>
        <FinanceCalculator
          lang={lang}
          currency={settings.currency}
          defaultRate={settings.financeRate}
          defaultPrice={defaultPrice}
          calc={t.calc}
          form={dict.form}
          formTitle={t.form}
          formText={t.formText}
          messagePlaceholder={t.messagePlaceholder}
          privacyHref={href(lang, "/privatlivspolitik")}
        />
      </Section>

      <Section tone="gray">
        <SectionHeading title={t.faq.title} />
        <div className="max-w-3xl divide-y divide-border border-y border-border bg-background">
          {t.faq.items.map((f) => (
            <details key={f.q} className="group px-5 py-4">
              <summary className="cursor-pointer list-none font-bold marker:hidden">{f.q}</summary>
              <p className="mt-3 leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>
    </>
  );
}
