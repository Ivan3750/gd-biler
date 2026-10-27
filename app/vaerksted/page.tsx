import type { Metadata } from "next";
import { Check, ChevronRight, ClipboardCheck, Disc3, CircleDot, Phone, ScanSearch, Snowflake, Wrench } from "lucide-react";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { Contact } from "@/app/components/Contact";
import { ContactForm } from "@/app/components/ContactForm";
import { Faq } from "@/app/components/Faq";
import { JsonLd } from "@/app/components/JsonLd";
import { Lines } from "@/app/components/Lines";
import { PageBanner } from "@/app/components/PageBanner";
import { getDict, localePath } from "@/app/lib/i18n";
import { getSettings, telHref } from "@/app/lib/settings";
import { absoluteUrl, breadcrumbJsonLd, pageMetadata } from "@/app/lib/seo";
import { getImages } from "@/app/lib/images";

const icons = [Wrench, Disc3, CircleDot, ScanSearch, Snowflake, ClipboardCheck];

export async function generateMetadata(): Promise<Metadata> {
  const { lang, t } = await getDict();
  return pageMetadata({
    lang,
    path: "/vaerksted",
    title: t.workshop.metaTitle,
    description: t.workshop.metaDescription,
    image: (await getImages()).hero,
  });
}

export default async function WorkshopPage() {
  const [{ lang, t }, s] = await Promise.all([getDict(), getSettings()]);
  const w = t.workshop;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t.car.home, path: localePath(lang, "/") },
          { name: t.nav.workshop, path: localePath(lang, "/vaerksted") },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AutoRepair",
          name: "GD Biler",
          url: absoluteUrl(localePath(lang, "/vaerksted")),
          telephone: s.phone,
          address: {
            "@type": "PostalAddress",
            streetAddress: s.street,
            postalCode: s.zip,
            addressLocality: s.city,
            addressCountry: "DK",
          },
          makesOffer: w.services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title } })),
        }}
      />
      <Header />
      <main>
        <PageBanner badge={w.badge} title={w.title} text={w.text}>
          <a
            href="#book"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-primary transition-all hover:scale-[1.02] hover:shadow-elevated"
          >
            {w.book}
            <ChevronRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href={telHref(s.phone)}
            className="inline-flex items-center gap-2 rounded-full glass px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/15 transition-all"
          >
            <Phone size={15} /> {w.call}
          </a>
        </PageBanner>

        {/* Services */}
        <section className="bg-secondary texture-dark py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="max-w-2xl mb-12">
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">{w.servicesLabel}</span>
              <h2 className="mt-4 text-balance text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.02]">
                <Lines lines={w.servicesTitle} />
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {w.services.map((s, i) => {
                const Icon = icons[i];
                return (
                  <div key={s.title} className="rounded-2xl border border-border bg-background p-7">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-navy-foreground">
                      <Icon size={20} strokeWidth={1.75} />
                    </span>
                    <h3 className="mt-6 text-xl font-semibold tracking-tight">{s.title}</h3>
                    <p className="mt-2 text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* How we work */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-5 lg:gap-16 lg:px-10">
            <div className="lg:col-span-2">
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">{w.extrasLabel}</span>
              <h2 className="mt-4 text-balance text-4xl sm:text-5xl font-semibold leading-[1.05]">
                <Lines lines={w.extrasTitle} />
              </h2>
            </div>
            <ul className="space-y-4 lg:col-span-3">
              {w.extras.map((x) => (
                <li key={x.title} className="flex gap-4 rounded-2xl border border-border p-6">
                  <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy text-navy-foreground">
                    <Check size={15} strokeWidth={2.5} />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight">{x.title}</h3>
                    <p className="mt-1 text-muted-foreground leading-relaxed">{x.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Process */}
        <section className="bg-navy texture-light text-navy-foreground py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="max-w-2xl mb-12">
              <span className="text-xs uppercase tracking-[0.2em] text-white/60 font-medium">{w.processLabel}</span>
              <h2 className="mt-4 text-balance text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.02]">
                <Lines lines={w.processTitle} />
              </h2>
            </div>
            <ol className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {w.steps.map((s, i) => (
                <li key={s.title} className="rounded-2xl glass p-7">
                  <span className="text-sm font-semibold text-white/50 tracking-[0.2em]">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-5 text-xl font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-2 text-white/70 leading-relaxed">{s.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <Faq label={w.faqLabel} title={w.faqTitle} items={w.faq} />

        {/* Booking form */}
        <section id="book" className="scroll-mt-24 bg-secondary texture-dark py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-5 lg:gap-14 lg:px-10">
            <div className="lg:col-span-2">
              <h2 className="text-balance text-4xl sm:text-5xl font-semibold leading-[1.05]">{w.formTitle}</h2>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{w.formText}</p>
              <a href={telHref(s.phone)} className="mt-6 inline-flex items-center gap-2 font-semibold hover:underline">
                <Phone size={16} /> {s.phone}
              </a>
            </div>
            <div className="lg:col-span-3">
              <ContactForm lang={lang} t={t.form} defaultTopic="service" />
            </div>
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
    </div>
  );
}
