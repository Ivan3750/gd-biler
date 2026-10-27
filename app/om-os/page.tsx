import type { Metadata } from "next";
import { ArrowUpRight, Check, ChevronRight } from "lucide-react";
import { Header } from "@/app/components/Header";
import { WhyUs } from "@/app/components/WhyUs";
import { Process } from "@/app/components/Process";
import { Contact } from "@/app/components/Contact";
import { Footer } from "@/app/components/Footer";
import { Lines } from "@/app/components/Lines";
import { PageBanner } from "@/app/components/PageBanner";
import { ContactForm } from "@/app/components/ContactForm";
import { Faq } from "@/app/components/Faq";
import { Tiles } from "@/app/components/Tiles";
import { Stat } from "@/app/components/About";
import { getDict, localePath } from "@/app/lib/i18n";
import { JsonLd } from "@/app/components/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/app/lib/seo";
import { getImages } from "@/app/lib/images";

export async function generateMetadata(): Promise<Metadata> {
  const { lang, t } = await getDict();
  return pageMetadata({
    lang,
    path: "/om-os",
    title: t.meta.aboutTitle,
    description: t.meta.aboutDescription,
    image: (await getImages()).hero,
  });
}

export default async function OmOsPage() {
  const [{ lang, t }, images] = await Promise.all([getDict(), getImages()]);
  const p = t.aboutPage;
  const a = t.about;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t.car.home, path: localePath(lang, "/") },
          { name: t.nav.about, path: localePath(lang, "/om-os") },
        ])}
      />
      <Header />
      <main>
        <PageBanner badge={p.badge} title={p.title} text={p.text}>
          <a
            href={localePath(lang, "/biler")}
            className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-primary transition-all hover:scale-[1.02] hover:shadow-elevated"
          >
            {p.seeCars}
            <ChevronRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#form"
            className="inline-flex items-center gap-2 rounded-full glass px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/15 transition-all"
          >
            {p.contact}
          </a>
        </PageBanner>

        {/* Story */}
        <section className="bg-background py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="relative">
                <div className="overflow-hidden rounded-3xl">
                  <img
                    src={images.about}
                    alt={a.imgAlt}
                    width={1280}
                    height={960}
                    loading="lazy"
                    className="h-full w-full object-cover aspect-[5/4]"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 hidden sm:flex flex-col rounded-2xl bg-navy text-navy-foreground p-6 shadow-elevated w-48">
                  <span className="text-4xl font-semibold">3+</span>
                  <span className="text-sm text-white/70 mt-1">{a.years}</span>
                </div>
              </div>

              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
                  {p.storyLabel}
                </span>
                <h2 className="mt-4 text-balance text-4xl sm:text-5xl font-semibold leading-[1.05]">
                  <Lines lines={a.title} />
                </h2>
                <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{a.text}</p>
                <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{p.story2}</p>
                <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-border pt-8">
                  {a.stats.map(([value, label]) => (
                    <Stat key={label} value={value} label={label} />
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-secondary texture-dark py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="max-w-2xl mb-14">
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
                {p.valuesLabel}
              </span>
              <h2 className="mt-4 text-balance text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.02]">
                <Lines lines={p.valuesTitle} />
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {p.values.map((v, i) => (
                <div
                  key={v.title}
                  className="rounded-2xl bg-background p-8 lg:p-10 border border-border transition-all duration-500 hover:shadow-elevated hover:-translate-y-1"
                >
                  <span className="text-sm font-semibold text-muted-foreground tracking-[0.2em]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-6 text-2xl font-semibold tracking-tight">{v.title}</h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Promises */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-5 lg:gap-16 lg:px-10">
            <div className="lg:col-span-2">
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
                {p.promiseLabel}
              </span>
              <h2 className="mt-4 text-balance text-4xl sm:text-5xl font-semibold leading-[1.05]">
                <Lines lines={p.promiseTitle} />
              </h2>
            </div>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-3">
              {p.promises.map((x) => (
                <li key={x} className="flex items-center gap-3 rounded-2xl border border-border bg-secondary px-5 py-4">
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy text-navy-foreground">
                    <Check size={15} strokeWidth={2.5} />
                  </span>
                  <span className="font-medium">{x}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <WhyUs />
        <Process />
        <div className="bg-background pt-20 lg:pt-28">
          <Tiles />
        </div>
        <Faq label={p.faqLabel} title={p.faqTitle} items={p.faq} />

        {/* Contact form */}
        <section id="form" className="scroll-mt-24 bg-secondary texture-dark py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-5 lg:gap-14 lg:px-10">
            <div className="lg:col-span-2">
              <h2 className="text-balance text-4xl sm:text-5xl font-semibold leading-[1.05]">{p.formTitle}</h2>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{p.formText}</p>
            </div>
            <div className="lg:col-span-3">
              <ContactForm lang={lang} t={t.form} defaultTopic="other" />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-background py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="rounded-3xl bg-navy texture-light text-navy-foreground p-10 lg:p-16 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <h2 className="text-balance text-3xl sm:text-4xl font-semibold leading-[1.1] max-w-xl">
                <Lines lines={p.ctaTitle} />
              </h2>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 self-start rounded-full bg-white text-primary px-7 py-3.5 text-sm font-semibold transition-all hover:scale-[1.02]"
              >
                {p.ctaButton} <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
    </div>
  );
}
