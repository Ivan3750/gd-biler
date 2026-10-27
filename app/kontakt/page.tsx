import type { Metadata } from "next";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { Contact } from "@/app/components/Contact";
import { ContactForm } from "@/app/components/ContactForm";
import { JsonLd } from "@/app/components/JsonLd";
import { PageBanner } from "@/app/components/PageBanner";
import { getCar } from "@/app/lib/cars";
import { getDict, localePath } from "@/app/lib/i18n";
import { breadcrumbJsonLd, pageMetadata } from "@/app/lib/seo";
import { getImages } from "@/app/lib/images";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

export async function generateMetadata(): Promise<Metadata> {
  const { lang, t } = await getDict();
  return pageMetadata({
    lang,
    path: "/kontakt",
    title: t.contactPage.metaTitle,
    description: t.contactPage.metaDescription,
    image: (await getImages()).hero,
  });
}

export default async function ContactPage({ searchParams }: { searchParams: SearchParams }) {
  const [sp, { lang, t }] = await Promise.all([searchParams, getDict()]);
  const p = t.contactPage;

  // Linked from a car page: tell the form which car the enquiry is about.
  const carParam = one(sp.car);
  const car = carParam ? await getCar(carParam) : undefined;
  const listed = car?.published ? car : undefined;
  const carName = listed && `${listed.brand} ${listed.model} ${listed.year}`;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t.car.home, path: localePath(lang, "/") },
          { name: t.nav.contact, path: localePath(lang, "/kontakt") },
        ])}
      />
      <Header />
      <main>
        <PageBanner badge={p.badge} title={p.title} text={p.text} />

        <section id="form" className="bg-secondary texture-dark py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-5 lg:gap-14 lg:px-10">
            <div className="lg:col-span-2">
              <h2 className="text-balance text-4xl sm:text-5xl font-semibold leading-[1.05]">{p.formTitle}</h2>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{p.formText}</p>
            </div>
            <div className="lg:col-span-3">
              <ContactForm lang={lang} t={t.form} defaultTopic="buy" carId={listed?.id} carName={carName} />
            </div>
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
    </div>
  );
}
