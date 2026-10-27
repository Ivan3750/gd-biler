import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { Breadcrumbs } from "@/app/components/Breadcrumbs";
import { JsonLd } from "@/app/components/JsonLd";
import { PageHeader, Section } from "@/app/components/Section";
import { btnPrimary, btnSecondary } from "@/app/components/ui";
import { getGuide, getGuides } from "@/app/lib/guides";
import { getDict, href } from "@/app/lib/i18n";
import { resolveLang } from "@/app/lib/i18n/server";
import { pageMetadata, SITE_URL } from "@/app/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]/guides/[slug]">): Promise<Metadata> {
  const lang = await resolveLang(params);
  const guide = getGuide(lang, (await params).slug);
  if (!guide) return {};
  return {
    ...pageMetadata(lang, `/guides/${guide.slug}`, guide.title, guide.description),
    openGraph: { type: "article", title: guide.title, description: guide.description, modifiedTime: guide.updated },
  };
}

export default async function GuidePage({ params }: PageProps<"/[lang]/guides/[slug]">) {
  const lang = await resolveLang(params);
  const dict = getDict(lang);
  const guide = getGuide(lang, (await params).slug);
  if (!guide) notFound();
  const others = getGuides(lang).filter((g) => g.slug !== guide.slug);

  return (
    <>
      <PageHeader title={guide.title} lead={guide.lead}>
        <Breadcrumbs
          lang={lang}
          home={dict.common.home}
          items={[{ name: dict.info.items.guides, path: "/guides" }, { name: guide.title }]}
        />
      </PageHeader>

      <Section>
        <article className="max-w-3xl space-y-10">
          {guide.sections.map((s) => (
            <section key={s.h}>
              <h2 className="text-xl font-bold sm:text-2xl">{s.h}</h2>
              {s.p?.map((p) => (
                <p key={p} className="mt-3 text-lg leading-relaxed text-muted-foreground">
                  {p}
                </p>
              ))}
              {s.list && (
                <ul className="mt-4 space-y-2.5">
                  {s.list.map((item) => (
                    <li key={item} className="flex gap-3 text-lg">
                      <Check size={20} className="mt-1 shrink-0 text-navy" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
          <p className="text-sm text-muted-foreground">
            {dict.guidesPage.updated}: {guide.updated}
          </p>
        </article>
      </Section>

      <Section tone="gray">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold">{dict.guidesPage.ctaTitle}</h2>
            <p className="mt-2 text-lg text-muted-foreground">{dict.guidesPage.ctaText}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={href(lang, "/biler")} className={btnPrimary}>
                {dict.common.seeCars}
              </Link>
              <Link href={href(lang, "/book-proevetur")} className={btnSecondary}>
                {dict.info.items.book}
              </Link>
            </div>
          </div>
          <div>
            <h2 className="mb-3 text-xl font-bold">{dict.guidesPage.title}</h2>
            <ul className="space-y-2">
              {others.map((g) => (
                <li key={g.slug}>
                  <Link href={href(lang, `/guides/${g.slug}`)} className="font-medium underline underline-offset-2">
                    {g.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: guide.title,
          description: guide.description,
          inLanguage: lang,
          dateModified: guide.updated,
          datePublished: guide.updated,
          mainEntityOfPage: `${SITE_URL}${href(lang, `/guides/${guide.slug}`)}`,
          author: { "@id": `${SITE_URL}/#dealer` },
          publisher: { "@id": `${SITE_URL}/#dealer` },
        }}
      />
    </>
  );
}
