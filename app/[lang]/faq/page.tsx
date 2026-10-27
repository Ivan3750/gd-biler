import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/app/components/Breadcrumbs";
import { Faq, type QA } from "@/app/components/Faq";
import { JsonLd } from "@/app/components/JsonLd";
import { PageHeader, Section } from "@/app/components/Section";
import { btnPrimary, btnSecondary } from "@/app/components/ui";
import { getDict, href } from "@/app/lib/i18n";
import { resolveLang } from "@/app/lib/i18n/server";
import { getSettings, telHref } from "@/app/lib/settings";
import { pageMetadata } from "@/app/lib/site";
import { fillTokens } from "@/app/lib/text";

export async function generateMetadata({ params }: PageProps<"/[lang]/faq">): Promise<Metadata> {
  const lang = await resolveLang(params);
  const t = getDict(lang).faq;
  return pageMetadata(lang, "/faq", t.metaTitle, t.metaDescription);
}

export default async function FaqPage({ params }: PageProps<"/[lang]/faq">) {
  const lang = await resolveLang(params);
  const dict = getDict(lang);
  const t = dict.faq;
  const settings = await getSettings();
  const fill = fillTokens(settings);
  const groups = t.groups.map((g) => ({ ...g, items: g.items.map((i) => ({ q: i.q, a: fill(i.a) })) }));
  // One FAQPage block for the whole page: search engines ignore repeated ones.
  const all = groups.flatMap((g) => g.items);

  return (
    <>
      <PageHeader title={t.title} lead={t.lead}>
        <Breadcrumbs lang={lang} home={dict.common.home} items={[{ name: t.title }]} />
      </PageHeader>
      <Section>
        <div className="max-w-3xl space-y-12">
          {groups.map((g) => (
            <section key={g.title}>
              <h2 className="mb-4 text-xl font-bold sm:text-2xl">{g.title}</h2>
              <Faq items={g.items} schema={false} />
            </section>
          ))}
        </div>
      </Section>
      <FaqSchema items={all} />
      <Section tone="gray">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-bold">{dict.about.cta.title}</h2>
            <p className="mt-2 text-lg text-muted-foreground">{dict.contact.lead}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href={href(lang, "/kontakt")} className={btnPrimary}>
              {dict.common.contactUs}
            </Link>
            <a href={telHref(settings.phone)} className={btnSecondary}>
              {settings.phone}
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}

function FaqSchema({ items }: { items: QA[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }}
    />
  );
}
