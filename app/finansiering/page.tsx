import type { Metadata } from "next";
import { ChevronRight, PiggyBank, Receipt, Scale } from "lucide-react";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { Contact } from "@/app/components/Contact";
import { Faq } from "@/app/components/Faq";
import { JsonLd } from "@/app/components/JsonLd";
import { PageBanner } from "@/app/components/PageBanner";
import { FinanceCalculator } from "@/app/components/FinanceCalculator";
import { FeatureGrid, FormSection, SectionHead, Steps } from "@/app/components/shop";
import { getCar } from "@/app/lib/cars";
import { getDict, localePath } from "@/app/lib/i18n";
import { pagesDict } from "@/app/lib/pages";
import { breadcrumbJsonLd, pageMetadata } from "@/app/lib/seo";
import { getImages } from "@/app/lib/images";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

export async function generateMetadata(): Promise<Metadata> {
  const { lang } = await getDict();
  const f = pagesDict[lang].finance;
  return pageMetadata({ lang, path: "/finansiering", title: f.metaTitle, description: f.metaDescription, image: (await getImages()).hero });
}

export default async function FinancePage({ searchParams }: { searchParams: SearchParams }) {
  const [sp, { lang, t }] = await Promise.all([searchParams, getDict()]);
  const p = pagesDict[lang];
  const f = p.finance;

  // Linked from a car page: start the calculator at that car's price.
  const car = one(sp.car) ? await getCar(one(sp.car)) : undefined;
  const listed = car?.published ? car : undefined;
  const queryPrice = Number(one(sp.price));
  const initialPrice = listed?.price ?? (queryPrice >= 3000 && queryPrice <= 150000 ? queryPrice : 25000);
  const carName = listed && `${listed.brand} ${listed.model} ${listed.year}`;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t.car.home, path: localePath(lang, "/") },
          { name: p.nav.finance, path: localePath(lang, "/finansiering") },
        ])}
      />
      <Header />
      <main>
        <PageBanner badge={f.badge} title={f.title} text={f.text}>
          <a
            href="#beregner"
            className="btn-sheen group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-primary transition-all hover:scale-[1.02]"
          >
            {f.calcLabel}
            <ChevronRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </a>
          <a href="#form" className="inline-flex items-center gap-2 rounded-full glass px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/15">
            {p.common.send}
          </a>
        </PageBanner>

        <section id="beregner" className="mesh scroll-mt-24 py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="reveal flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <SectionHead label={f.calcLabel} title={f.calcTitle} />
              <p className="max-w-md text-lg leading-relaxed text-muted-foreground">{f.calcText}</p>
            </div>
            <div className="reveal mt-12">
              <FinanceCalculator
                key={initialPrice}
                lang={lang}
                labels={f}
                initialPrice={initialPrice}
                carName={carName}
                ctaHref={`${localePath(lang, "/kontakt")}${listed ? `?car=${encodeURIComponent(listed.id)}` : ""}`}
              />
            </div>
          </div>
        </section>

        <Steps label={f.stepsLabel} title={f.stepsTitle} steps={f.steps} />
        <FeatureGrid label={f.tipsLabel} title={f.tipsTitle} items={f.tips} icons={[PiggyBank, Receipt, Scale]} />
        <Faq label={f.faqLabel} title={f.faqTitle} items={f.faq} />
        <FormSection lang={lang} t={t} title={f.formTitle} text={f.formText} topic="buy" />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
