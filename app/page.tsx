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
import { JsonLd } from "@/app/components/JsonLd";
import { getDict } from "@/app/lib/i18n";
import { getSettings } from "@/app/lib/settings";
import { businessJsonLd, pageMetadata } from "@/app/lib/seo";
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
  return (
    <div className="min-h-screen bg-background text-foreground">
      <JsonLd data={businessJsonLd(lang, t.meta.description, settings)} />
      <Header />
      <main>
       <Hero />
        <FeaturedCars />
        <Tiles />
        <WhyUs />
        <About />
        <Process />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
