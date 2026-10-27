import type { Metadata } from "next";
import { Breadcrumbs } from "@/app/components/Breadcrumbs";
import { FinanceCalculator } from "@/app/components/FinanceCalculator";
import { Faq } from "@/app/components/Faq";
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
      <PageHeader title={t.title} lead={t.lead}>
        <Breadcrumbs lang={lang} home={dict.common.home} items={[{ name: dict.nav.finance }]} />
      </PageHeader>
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
        <SectionHeading title={dict.financeExtra.howTitle} />
        <ol className="grid gap-6 md:grid-cols-3">
          {dict.financeExtra.how.map((s, i) => (
            <li key={s.title} className="rounded-md border border-border bg-background p-6">
              <span className="border-l-2 border-brand pl-3 text-sm font-bold text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-lg font-bold">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{s.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <SectionHeading title={t.faq.title} />
        <div className="max-w-3xl">
          <Faq items={t.faq.items.map((f) => ({ q: f.q, a: f.a }))} />
        </div>
      </Section>
    </>
  );
}
