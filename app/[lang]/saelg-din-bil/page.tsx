import type { Metadata } from "next";
import { Breadcrumbs } from "@/app/components/Breadcrumbs";
import { Faq } from "@/app/components/Faq";
import { LeadForm } from "@/app/components/LeadForm";
import { PageHeader, Section, SectionHeading } from "@/app/components/Section";
import { input } from "@/app/components/ui";
import { getDict, href } from "@/app/lib/i18n";
import { resolveLang } from "@/app/lib/i18n/server";
import { getSettings } from "@/app/lib/settings";
import { pageMetadata } from "@/app/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]/saelg-din-bil">): Promise<Metadata> {
  const lang = await resolveLang(params);
  const t = getDict(lang).sell;
  return pageMetadata(lang, "/saelg-din-bil", t.metaTitle, t.metaDescription);
}

export default async function SellPage({ params }: PageProps<"/[lang]/saelg-din-bil">) {
  const lang = await resolveLang(params);
  const dict = getDict(lang);
  const t = dict.sell;
  const settings = await getSettings();
  const year = new Date().getFullYear();

  return (
    <>
      <PageHeader title={t.title} lead={t.lead}>
        <Breadcrumbs lang={lang} home={dict.common.home} items={[{ name: dict.nav.sell }]} />
      </PageHeader>

      <Section>
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <SectionHeading title={t.steps.title} className="mb-8" />
            <ol className="space-y-6">
              {t.steps.items.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <span className="border-l-2 border-brand pl-3 text-lg font-bold text-muted-foreground">{i + 1}</span>
                  <div>
                    <h3 className="font-bold">{s.title}</h3>
                    <p className="mt-1 leading-relaxed text-muted-foreground">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-3">
            <h2 className="mb-5 text-2xl font-bold">{t.form}</h2>
            <LeadForm
              lang={lang}
              type="sell"
              text={dict.form}
              privacyHref={href(lang, "/privatlivspolitik")}
              messageLabel={t.messageLabel}
              messagePlaceholder={t.messagePlaceholder}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="text-sm font-medium">
                  {t.fields.brand} *
                  <input name="d_brand" required maxLength={40} placeholder="BMW" className={input} />
                </label>
                <label className="text-sm font-medium">
                  {t.fields.model} *
                  <input name="d_model" required maxLength={80} placeholder="520d" className={input} />
                </label>
                <label className="text-sm font-medium">
                  {t.fields.year} *
                  <input name="d_year" type="number" required min={1980} max={year + 1} placeholder={String(year - 4)} className={input} />
                </label>
                <label className="text-sm font-medium">
                  {t.fields.km} *
                  <input name="d_km" type="number" required min={0} max={2000000} placeholder="80000" className={input} />
                </label>
                <label className="text-sm font-medium sm:col-span-2">
                  {t.fields.price} ({settings.currency})
                  <input name="d_price" type="number" min={0} placeholder={t.fields.pricePlaceholder} className={input} />
                </label>
              </div>
            </LeadForm>
          </div>
        </div>
      </Section>

      <Section tone="gray">
        <SectionHeading title={dict.sellExtra.whyTitle} />
        <div className="grid gap-6 md:grid-cols-2">
          {dict.sellExtra.why.map((w) => (
            <div key={w.title} className="rounded-md border border-border bg-background p-6">
              <h3 className="border-l-2 border-brand pl-3 text-lg font-bold">{w.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{w.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading title={dict.sellExtra.faqTitle} />
        <div className="max-w-3xl">
          <Faq items={dict.sellExtra.faq} />
        </div>
      </Section>
    </>
  );
}
