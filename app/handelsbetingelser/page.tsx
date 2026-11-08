import type { Metadata } from "next";
import { LegalPage } from "@/app/components/LegalPage";
import { getDict } from "@/app/lib/i18n";
import { pagesDict } from "@/app/lib/pages";
import { pageMetadata } from "@/app/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { lang } = await getDict();
  const d = pagesDict[lang].legal.terms;
  return pageMetadata({ lang, path: "/handelsbetingelser", title: d.metaTitle, description: d.metaDescription });
}

export default function Page() {
  return <LegalPage kind="terms" path="/handelsbetingelser" />;
}
