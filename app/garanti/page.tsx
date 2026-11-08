import type { Metadata } from "next";
import { ChevronRight, ClipboardCheck, Cpu, Disc3, Gauge, Sparkles, ScanSearch } from "lucide-react";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { Contact } from "@/app/components/Contact";
import { Faq } from "@/app/components/Faq";
import { JsonLd } from "@/app/components/JsonLd";
import { PageBanner } from "@/app/components/PageBanner";
import { CtaBand, FeatureGrid, Steps } from "@/app/components/shop";
import { getDict, localePath } from "@/app/lib/i18n";
import { pagesDict } from "@/app/lib/pages";
import { breadcrumbJsonLd, pageMetadata } from "@/app/lib/seo";
import { getImages } from "@/app/lib/images";

export async function generateMetadata(): Promise<Metadata> {
  const { lang } = await getDict();
  const w = pagesDict[lang].warranty;
  return pageMetadata({ lang, path: "/garanti", title: w.metaTitle, description: w.metaDescription, image: (await getImages()).hero });
}

export default async function WarrantyPage() {
  const { lang, t } = await getDict();
  const p = pagesDict[lang];
  const w = p.warranty;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t.car.home, path: localePath(lang, "/") },
          { name: w.badge.split(" · ")[0], path: localePath(lang, "/garanti") },
        ])}
      />
      <Header />
      <main>
        <PageBanner badge={w.badge} title={w.title} text={w.text}>
          <a
            href={localePath(lang, "/biler")}
            className="btn-sheen group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-primary transition-all hover:scale-[1.02]"
          >
            {p.common.seeCars}
            <ChevronRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </a>
        </PageBanner>

        <section className="bg-background py-16 lg:py-20">
          <dl className="mx-auto grid max-w-7xl gap-4 px-6 sm:grid-cols-3 lg:gap-6 lg:px-10">
            {w.figures.map(([big, small]) => (
              <div key={small} className="shop-card reveal rounded-3xl border border-border bg-card p-8 hover:shadow-elevated">
                <dd className="text-5xl font-semibold tracking-tight lg:text-6xl">{big}</dd>
                <dt className="mt-2 text-sm uppercase tracking-[0.16em] text-muted-foreground">{small}</dt>
              </div>
            ))}
          </dl>
        </section>

        <FeatureGrid
          tone="muted"
          label={w.checkLabel}
          title={w.checkTitle}
          items={w.checks}
          icons={[Disc3, Gauge, Cpu, ScanSearch, Sparkles, ClipboardCheck]}
        />
        <Steps label={w.howLabel} title={w.howTitle} steps={w.steps} />

        <section className="bg-background py-12">
          <p className="reveal mx-auto max-w-3xl px-6 text-center text-muted-foreground">{w.note}</p>
        </section>

        <Faq label={w.faqLabel} title={w.faqTitle} items={w.faq} />
        <CtaBand title={w.ctaTitle}>
          <a
            href={localePath(lang, "/biler")}
            className="btn-sheen inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-primary transition-all hover:scale-[1.02]"
          >
            {p.common.seeCars}
          </a>
          <a href={localePath(lang, "/kontakt")} className="inline-flex items-center gap-2 rounded-full glass px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/15">
            {p.common.send}
          </a>
        </CtaBand>
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
