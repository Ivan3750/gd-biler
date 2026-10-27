import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { Breadcrumbs } from "@/app/components/Breadcrumbs";
import { JsonLd } from "@/app/components/JsonLd";
import { PageHeader, Section, SectionHeading } from "@/app/components/Section";
import { btnPrimary, btnSecondary } from "@/app/components/ui";
import { getDict, href } from "@/app/lib/i18n";
import { resolveLang } from "@/app/lib/i18n/server";
import { pageMetadata } from "@/app/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]/saadan-koeber-du">): Promise<Metadata> {
  const lang = await resolveLang(params);
  const t = getDict(lang).howToBuy;
  return pageMetadata(lang, "/saadan-koeber-du", t.metaTitle, t.metaDescription);
}

export default async function HowToBuyPage({ params }: PageProps<"/[lang]/saadan-koeber-du">) {
  const lang = await resolveLang(params);
  const dict = getDict(lang);
  const t = dict.howToBuy;

  return (
    <>
      <PageHeader title={t.title} lead={t.lead}>
        <Breadcrumbs lang={lang} home={dict.common.home} items={[{ name: dict.info.items.howToBuy }]} />
      </PageHeader>

      <Section>
        <SectionHeading title={t.stepsTitle} />
        <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {t.steps.map((s, i) => (
            <li key={s.title} className="rounded-md border border-border p-6">
              <span className="border-l-2 border-brand pl-3 text-sm font-bold text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 text-xl font-bold">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{s.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="gray">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading title={t.bring.title} className="mb-6" />
            <ul className="space-y-3">
              {t.bring.items.map((item) => (
                <li key={item} className="flex gap-3 text-lg">
                  <Check size={20} className="mt-1 shrink-0 text-navy" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading title={t.after.title} className="mb-6" />
            <p className="text-lg leading-relaxed text-muted-foreground">{t.after.text}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={href(lang, "/biler")} className={btnPrimary}>
                {dict.common.seeCars}
              </Link>
              <Link href={href(lang, "/garanti-og-service")} className={btnSecondary}>
                {dict.info.items.warranty}
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: t.title,
          description: t.metaDescription,
          step: t.steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title, text: s.text })),
        }}
      />
    </>
  );
}
