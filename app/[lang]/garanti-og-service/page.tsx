import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/app/components/Breadcrumbs";
import { Prose } from "@/app/components/Prose";
import { PageHeader, Section } from "@/app/components/Section";
import { btnPrimary } from "@/app/components/ui";
import { getDict, href } from "@/app/lib/i18n";
import { resolveLang } from "@/app/lib/i18n/server";
import { getSettings } from "@/app/lib/settings";
import { pageMetadata } from "@/app/lib/site";
import { fillTokens } from "@/app/lib/text";

export async function generateMetadata({ params }: PageProps<"/[lang]/garanti-og-service">): Promise<Metadata> {
  const lang = await resolveLang(params);
  const t = getDict(lang).warranty;
  return pageMetadata(lang, "/garanti-og-service", t.metaTitle, t.metaDescription);
}

export default async function WarrantyPage({ params }: PageProps<"/[lang]/garanti-og-service">) {
  const lang = await resolveLang(params);
  const dict = getDict(lang);
  const t = dict.warranty;
  const settings = await getSettings();

  return (
    <>
      <PageHeader title={t.title} lead={t.lead}>
        <Breadcrumbs lang={lang} home={dict.common.home} items={[{ name: dict.info.items.warranty }]} />
      </PageHeader>
      <Section>
        <Prose sections={t.sections} fill={fillTokens(settings)} />
        <Link href={href(lang, "/reklamation-og-fortrydelse")} className={`${btnPrimary} mt-10`}>
          {t.cta}
        </Link>
      </Section>
    </>
  );
}
