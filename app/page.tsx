import { Header } from "@/app/components/Header";
import { Hero } from "@/app/components/Hero";
import { FeaturedCars } from "@/app/components/FeaturedCars";
import { WhyUs } from "@/app/components/WhyUs";
import { About } from "@/app/components/About";
import { Contact } from "@/app/components/Contact";
import { Footer } from "@/app/components/Footer";
import { Process } from "@/app/components/Process";
import { Testimonials } from "@/app/components/Testimonials";
import { Faq } from "@/app/components/Faq";



export default function Page () {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
       <Hero />
        <FeaturedCars />
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
