import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import aboutImg from "@/app/assets/about.jpg";
import { Breadcrumbs } from "@/app/components/Breadcrumbs";
import { Hours } from "@/app/components/Hours";
import { StatsList, WhyUs, Process } from "@/app/components/home/Sections";
import { PageHeader, Section, SectionHeading } from "@/app/components/Section";
import { btnPrimary, btnSecondary } from "@/app/components/ui";
import { bilingual, getDict, href } from "@/app/lib/i18n";
import { resolveLang } from "@/app/lib/i18n/server";
import { addressLine, getSettings } from "@/app/lib/settings";
import { pageMetadata } from "@/app/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]/om-os">): Promise<Metadata> {
  const lang = await resolveLang(params);
  const t = getDict(lang).about;
  return pageMetadata(lang, "/om-os", t.metaTitle, t.metaDescription);
}

export default async function AboutPage({ params }: PageProps<"/[lang]/om-os">) {
  const lang = await resolveLang(params);
  const dict = getDict(lang);
  const t = dict.about;
  const settings = await getSettings();

  return (
    <>
      <PageHeader title={t.title} lead={t.lead}>
        <Breadcrumbs lang={lang} home={dict.common.home} items={[{ name: dict.nav.about }]} />
      </PageHeader>

      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Image
            src={aboutImg}
            alt={t.title}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="aspect-[5/4] w-full rounded-md border border-border object-cover"
          />
          <div>
            <p className="whitespace-pre-line text-lg leading-relaxed text-muted-foreground">{bilingual(lang, settings.about)}</p>
            <div className="mt-8 border-t border-border pt-8">
              <StatsList dict={dict} />
            </div>
          </div>
        </div>
      </Section>

      <Section tone="gray">
        <SectionHeading title={dict.aboutExtra.principlesTitle} />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {dict.aboutExtra.principles.map((p) => (
            <div key={p.title} className="rounded-md border border-border bg-background p-6">
              <h3 className="border-l-2 border-brand pl-3 text-lg font-bold">{p.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{p.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <WhyUs dict={dict} />
      <Process dict={dict} />

      <Section>
        <SectionHeading title={dict.aboutExtra.factsTitle} />
        <dl className="grid max-w-3xl gap-x-8 gap-y-4 sm:grid-cols-[10rem_1fr]">
          <dt className="font-bold">{dict.aboutExtra.facts.name}</dt>
          <dd className="text-muted-foreground">{settings.company}</dd>
          <dt className="font-bold">{dict.aboutExtra.facts.cvr}</dt>
          <dd className="text-muted-foreground">{settings.cvr}</dd>
          <dt className="font-bold">{dict.aboutExtra.facts.address}</dt>
          <dd className="text-muted-foreground">{addressLine(settings)}</dd>
          <dt className="font-bold">{dict.aboutExtra.facts.hours}</dt>
          <dd className="text-muted-foreground">
            <Hours settings={settings} dict={dict} />
          </dd>
        </dl>
      </Section>

      <Section>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">{t.cta.title}</h2>
            <p className="mt-2 text-lg text-muted-foreground">{t.cta.text}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href={href(lang, "/biler")} className={btnPrimary}>
              {dict.common.seeCars}
            </Link>
            <Link href={href(lang, "/kontakt")} className={btnSecondary}>
              {dict.common.contactUs}
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
