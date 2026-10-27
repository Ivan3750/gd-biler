import type { Metadata } from "next";
import { Banknote, ChevronRight, FileCheck2, MessageSquareText, ShieldCheck } from "lucide-react";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { Contact } from "@/app/components/Contact";
import { ContactForm } from "@/app/components/ContactForm";
import { Faq } from "@/app/components/Faq";
import { JsonLd } from "@/app/components/JsonLd";
import { Lines } from "@/app/components/Lines";
import { PageBanner } from "@/app/components/PageBanner";
import { getImages } from "@/app/lib/images";
import { getDict, localePath } from "@/app/lib/i18n";
import { breadcrumbJsonLd, pageMetadata } from "@/app/lib/seo";

const icons = [MessageSquareText, Banknote, FileCheck2, ShieldCheck];

export async function generateMetadata(): Promise<Metadata> {
  const { lang, t } = await getDict();
  return pageMetadata({
    lang,
    path: "/saelg-din-bil",
    title: t.sell.metaTitle,
    description: t.sell.metaDescription,
    image: (await getImages()).hero,
  });
}

export default async function SellPage() {
  const { lang, t } = await getDict();
  const s = t.sell;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t.car.home, path: localePath(lang, "/") },
          { name: t.nav.sell, path: localePath(lang, "/saelg-din-bil") },
        ])}
      />
      <Header />
      <main>
        <PageBanner badge={s.badge} title={s.title} text={s.text}>
          <a
            href="#form"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-primary transition-all hover:scale-[1.02] hover:shadow-elevated"
          >
            {s.cta}
            <ChevronRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </a>
        </PageBanner>

        {/* Benefits */}
        <section className="bg-secondary texture-dark py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="max-w-2xl mb-12">
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">{s.benefitsLabel}</span>
              <h2 className="mt-4 text-balance text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.02]">
                <Lines lines={s.benefitsTitle} />
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
              {s.benefits.map((b, i) => {
                const Icon = icons[i];
                return (
                  <div key={b.title} className="rounded-2xl border border-border bg-background p-7">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-navy-foreground">
                      <Icon size={20} strokeWidth={1.75} />
                    </span>
                    <h3 className="mt-6 text-xl font-semibold tracking-tight">{b.title}</h3>
                    <p className="mt-2 text-muted-foreground leading-relaxed">{b.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className="bg-navy texture-light text-navy-foreground py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="max-w-2xl mb-12">
              <span className="text-xs uppercase tracking-[0.2em] text-white/60 font-medium">{s.stepsLabel}</span>
              <h2 className="mt-4 text-balance text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.02]">
                <Lines lines={s.stepsTitle} />
              </h2>
            </div>
            <ol className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {s.steps.map((x, i) => (
                <li key={x.title} className="rounded-2xl glass p-7">
                  <span className="text-sm font-semibold text-white/50 tracking-[0.2em]">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-5 text-xl font-semibold tracking-tight">{x.title}</h3>
                  <p className="mt-2 text-white/70 leading-relaxed">{x.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Form */}
        <section id="form" className="scroll-mt-24 bg-secondary texture-dark py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-5 lg:gap-14 lg:px-10">
            <div className="lg:col-span-2">
              <h2 className="text-balance text-4xl sm:text-5xl font-semibold leading-[1.05]">{s.formTitle}</h2>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{s.formText}</p>
            </div>
            <div className="lg:col-span-3">
              <ContactForm lang={lang} t={t.form} variant="sell" />
            </div>
          </div>
        </section>

        <Faq label={s.faqLabel} title={s.faqTitle} items={s.faq} />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
