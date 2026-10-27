import { ArrowUpRight } from "lucide-react";
import { listPublishedCars } from "@/app/lib/cars";
import { getDict, localePath } from "@/app/lib/i18n";
import { CarCard } from "./CarCard";
import { Lines } from "./Lines";

export async function FeaturedCars() {
  const [cars, { lang, t }] = await Promise.all([listPublishedCars(), getDict()]);

  return (
    <section id="cars" className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
              {t.cars.label}
            </span>
            <h2 className="mt-4 text-balance text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.02]">
              <Lines lines={t.cars.title} />
            </h2>
          </div>
          <a
            href={localePath(lang, "/biler")}
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:gap-3 transition-all"
          >
            {t.cars.seeAll}
            <ArrowUpRight size={16} />
          </a>
        </div>

        {cars.length === 0 ? (
          <p className="text-muted-foreground">{t.cars.empty}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {cars.map((car) => (
              <CarCard key={car.id} car={car} lang={lang} t={t} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
