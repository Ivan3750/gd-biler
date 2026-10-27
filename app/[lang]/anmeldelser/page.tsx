import type { Metadata } from "next";
import { Breadcrumbs } from "@/app/components/Breadcrumbs";
import { PageHeader, Section } from "@/app/components/Section";
import { ReviewGrid } from "@/app/components/home/Sections";
import { getDict } from "@/app/lib/i18n";
import { resolveLang } from "@/app/lib/i18n/server";
import { pageMetadata } from "@/app/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]/anmeldelser">): Promise<Metadata> {
  const lang = await resolveLang(params);
  const t = getDict(lang).reviews;
  return pageMetadata(lang, "/anmeldelser", t.metaTitle, t.metaDescription);
}

export default async function ReviewsPage({ params }: PageProps<"/[lang]/anmeldelser">) {
  const lang = await resolveLang(params);
  const dict = getDict(lang);
  const t = dict.reviews;

  return (
    <>
      <PageHeader title={t.title} lead={t.lead}>
        <Breadcrumbs lang={lang} home={dict.common.home} items={[{ name: dict.info.items.reviews }]} />
      </PageHeader>
      <Section>
        <ReviewGrid lang={lang} />
      </Section>
    </>
  );
}
