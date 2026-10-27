import type { Metadata } from "next";
import { Breadcrumbs } from "@/app/components/Breadcrumbs";
import { LegalPage } from "@/app/components/LegalPage";
import { getDict } from "@/app/lib/i18n";
import { resolveLang } from "@/app/lib/i18n/server";
import { getSettings } from "@/app/lib/settings";
import { pageMetadata } from "@/app/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]/reklamation-og-fortrydelse">): Promise<Metadata> {
  const lang = await resolveLang(params);
  const doc = getDict(lang).returns;
  return pageMetadata(lang, "/reklamation-og-fortrydelse", doc.title, doc.description);
}

export default async function Page({ params }: PageProps<"/[lang]/reklamation-og-fortrydelse">) {
  const lang = await resolveLang(params);
  const dict = getDict(lang);
  return (
    <LegalPage
      doc={dict.returns}
      updatedLabel={dict.legal.updated}
      settings={await getSettings()}
      crumbs={<Breadcrumbs lang={lang} home={dict.common.home} items={[{ name: dict.returns.title }]} />}
    />
  );
}
