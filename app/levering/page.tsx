import type { Metadata } from "next";
import { ChevronRight, Clock, FileCheck2, UserRound } from "lucide-react";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { Contact } from "@/app/components/Contact";
import { Faq } from "@/app/components/Faq";
import { JsonLd } from "@/app/components/JsonLd";
import { PageBanner } from "@/app/components/PageBanner";
import { Areas, FeatureGrid, FormSection, Steps } from "@/app/components/shop";
import { getDict, localePath } from "@/app/lib/i18n";
import { pagesDict } from "@/app/lib/pages";
import { breadcrumbJsonLd, pageMetadata } from "@/app/lib/seo";
import { getImages } from "@/app/lib/images";

export async function generateMetadata(): Promise<Metadata> {
  const { lang } = await getDict();
  const d = pagesDict[lang].delivery;
  return pageMetadata({ lang, path: "/levering", title: d.metaTitle, description: d.metaDescription, image: (await getImages()).hero });
}

export default async function DeliveryPage() {
  const { lang, t } = await getDict();
  const p = pagesDict[lang];
  const d = p.delivery;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t.car.home, path: localePath(lang, "/") },
          { name: d.badge.split(" · ")[0], path: localePath(lang, "/levering") },
        ])}
      />
      <Header />
      <main>
        <PageBanner badge={d.badge} title={d.title} text={d.text}>
          <a
            href="#form"
            className="btn-sheen group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-primary transition-all hover:scale-[1.02]"
          >
            {p.common.send}
            <ChevronRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </a>
          <a href={localePath(lang, "/biler")} className="inline-flex items-center gap-2 rounded-full glass px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/15">
            {p.common.seeCars}
          </a>
        </PageBanner>

        <Steps label={d.howLabel} title={d.howTitle} steps={d.steps} />
        <Areas lang={lang} label={d.areasLabel} title={d.areasTitle} text={d.areasText} areas={d.areas} href="/levering#form" />
        <FeatureGrid tone="muted" label={d.perksLabel} title={d.perksTitle} items={d.perks} icons={[Clock, FileCheck2, UserRound]} />
        <section className="bg-background py-12">
          <p className="reveal mx-auto max-w-3xl px-6 text-center text-muted-foreground">{d.note}</p>
        </section>
        <Faq label={d.faqLabel} title={d.faqTitle} items={d.faq} />
        <FormSection lang={lang} t={t} title={d.formTitle} text={d.formText} topic="buy" />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
