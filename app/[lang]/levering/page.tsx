import type { Metadata } from "next";
import { Breadcrumbs } from "@/app/components/Breadcrumbs";
import { LeadForm } from "@/app/components/LeadForm";
import { Prose } from "@/app/components/Prose";
import { PageHeader, Section, SectionHeading } from "@/app/components/Section";
import { getDict, href } from "@/app/lib/i18n";
import { resolveLang } from "@/app/lib/i18n/server";
import { getSettings } from "@/app/lib/settings";
import { pageMetadata } from "@/app/lib/site";
import { fillTokens } from "@/app/lib/text";

export async function generateMetadata({ params }: PageProps<"/[lang]/levering">): Promise<Metadata> {
  const lang = await resolveLang(params);
  const t = getDict(lang).delivery;
  return pageMetadata(lang, "/levering", t.metaTitle, t.metaDescription);
}

export default async function DeliveryPage({ params }: PageProps<"/[lang]/levering">) {
  const lang = await resolveLang(params);
  const dict = getDict(lang);
  const t = dict.delivery;
  const settings = await getSettings();

  return (
    <>
      <PageHeader title={t.title} lead={t.lead}>
        <Breadcrumbs lang={lang} home={dict.common.home} items={[{ name: dict.info.items.delivery }]} />
      </PageHeader>
      <Section>
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <Prose sections={t.sections} fill={fillTokens(settings)} />
          </div>
          <div className="lg:col-span-2">
            <h2 className="mb-5 text-2xl font-bold">{dict.contact.form}</h2>
            <LeadForm lang={lang} type="contact" text={dict.form} privacyHref={href(lang, "/privatlivspolitik")} />
          </div>
        </div>
      </Section>
      <Section tone="gray">
        <SectionHeading title={dict.areas.title} lead={dict.areas.text} />
        <ul className="flex flex-wrap gap-3">
          {dict.areas.list.map((c) => (
            <li key={c} className="rounded-md border border-border bg-background px-4 py-2 font-medium">
              {c}
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
