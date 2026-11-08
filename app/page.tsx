import { BrandMarquee } from "@/app/components/BrandMarquee";
import { Header } from "@/app/components/Header";
import { Hero } from "@/app/components/Hero";
import { FeaturedCars } from "@/app/components/FeaturedCars";
import { WhyUs } from "@/app/components/WhyUs";
import { About } from "@/app/components/About";
import { Contact } from "@/app/components/Contact";
import { Tiles } from "@/app/components/Tiles";
import { Footer } from "@/app/components/Footer";
import { Process } from "@/app/components/Process";
import { Testimonials } from "@/app/components/Testimonials";
import { Newsletter } from "@/app/components/Newsletter";
import { JsonLd } from "@/app/components/JsonLd";
import { Faq } from "@/app/components/Faq";
import { Areas, ChatDemo, Figures, ServiceBento } from "@/app/components/shop";
import { pagesDict } from "@/app/lib/pages";
import { getDict } from "@/app/lib/i18n";
import { getSettings } from "@/app/lib/settings";
import { businessJsonLd, pageMetadata, websiteJsonLd } from "@/app/lib/seo";
import type { Metadata } from "next";
import { getImages } from "@/app/lib/images";

export async function generateMetadata(): Promise<Metadata> {
  const { lang, t } = await getDict();
  return {
    ...pageMetadata({ lang, path: "/", title: `GD Biler – ${t.meta.title}`, description: t.meta.description, image: (await getImages()).hero }),
    title: { absolute: `GD Biler – ${t.meta.title}` },
  };
}
 



export default async function Page() {
  const [{ lang, t }, settings] = await Promise.all([getDict(), getSettings()]);
  const p = pagesDict[lang];
  return (
    <div className="min-h-screen bg-background text-foreground">
      <JsonLd data={businessJsonLd(lang, t.meta.description, settings)} />
      <JsonLd data={websiteJsonLd(lang)} />
      <Header />
      <main>
       <Hero />
        <BrandMarquee />
        <FeaturedCars />
        <div className="reveal"><Tiles /></div>
        <Figures label={p.home.figuresLabel} title={p.home.figuresTitle} items={p.home.figures} />
        <ServiceBento lang={lang} label={p.home.servicesLabel} title={p.home.servicesTitle} text={p.home.servicesText} items={p.home.services} />
        <div className="reveal"><WhyUs /></div>
        <div className="reveal"><About /></div>
        <div className="reveal"><Process /></div>
        <div className="reveal"><Testimonials /></div>
        <ChatDemo lang={lang} chat={p.chat} />
        <Areas lang={lang} label={p.home.areasLabel} title={p.home.areasTitle} text={p.home.areasText} areas={p.home.areas} />
        <Faq label={p.home.faqLabel} title={p.home.faqTitle} items={p.home.faq} />
        <Newsletter />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
