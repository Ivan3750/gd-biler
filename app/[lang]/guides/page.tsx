import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/app/components/Breadcrumbs";
import { PageHeader, Section } from "@/app/components/Section";
import { btnPrimary, btnSecondary } from "@/app/components/ui";
import { getGuides } from "@/app/lib/guides";
import { getDict, href } from "@/app/lib/i18n";
import { resolveLang } from "@/app/lib/i18n/server";
import { pageMetadata } from "@/app/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]/guides">): Promise<Metadata> {
  const lang = await resolveLang(params);
  const t = getDict(lang).guidesPage;
  return pageMetadata(lang, "/guides", t.metaTitle, t.metaDescription);
}

export default async function GuidesPage({ params }: PageProps<"/[lang]/guides">) {
  const lang = await resolveLang(params);
  const dict = getDict(lang);
  const t = dict.guidesPage;

  return (
    <>
      <PageHeader title={t.title} lead={t.lead}>
        <Breadcrumbs lang={lang} home={dict.common.home} items={[{ name: dict.info.items.guides }]} />
      </PageHeader>
      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {getGuides(lang).map((g) => (
            <article key={g.slug} className="relative flex flex-col rounded-md border border-border p-7 hover:border-foreground/40">
              <h2 className="text-xl font-bold">
                <Link href={href(lang, `/guides/${g.slug}`)} className="after:absolute after:inset-0">
                  {g.title}
                </Link>
              </h2>
              <p className="mb-6 mt-3 leading-relaxed text-muted-foreground">{g.description}</p>
              <span className="mt-auto inline-flex items-center gap-2 font-semibold">
                {t.read} <ArrowRight size={16} aria-hidden />
              </span>
            </article>
          ))}
        </div>
      </Section>
      <Section tone="gray">
        <h2 className="text-2xl font-bold">{t.ctaTitle}</h2>
        <p className="mt-2 text-lg text-muted-foreground">{t.ctaText}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href={href(lang, "/biler")} className={btnPrimary}>
            {dict.common.seeCars}
          </Link>
          <Link href={href(lang, "/book-proevetur")} className={btnSecondary}>
            {dict.info.items.book}
          </Link>
        </div>
      </Section>
    </>
  );
}
