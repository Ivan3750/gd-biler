import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import aboutImg from "@/app/assets/about.jpg";
import { StatsList, WhyUs, Process } from "@/app/components/home/Sections";
import { PageHeader, Section } from "@/app/components/Section";
import { btnPrimary, btnSecondary } from "@/app/components/ui";
import { bilingual, getDict, href } from "@/app/lib/i18n";
import { resolveLang } from "@/app/lib/i18n/server";
import { getSettings } from "@/app/lib/settings";
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
      <PageHeader title={t.title} lead={t.lead} />

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

      <WhyUs dict={dict} />
      <Process dict={dict} />

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
