import { ArrowUpRight, Fuel, Gauge, Calendar } from "lucide-react";
import type { StaticImageData } from "next/image";
import audi from "@/app/assets/audi.jpg";
import bmw1 from "@/app/assets/bmw-1.jpg";
import bmw2 from "@/app/assets/bmw-2.jpg";
import bmw3 from "@/app/assets/bmw-3.jpg";
import bmw4 from "@/app/assets/bmw-4.jpg";
import lexus from "@/app/assets/lexus.jpg";
 
type Car = {
  image: string | StaticImageData;
  brand: string;
  model: string;
  year: number;
  km: string;
  fuel: string;
  price: string;
};

const cars: Car[] = [
  { image: audi.src, brand: "Audi", model: "A6 55 TFSI e QUATTRO", year: 2021, km: "13.500", fuel: "Benzin", price: "27.000" },
  { image: bmw1.src, brand: "BMW", model: "330e", year: 2022, km: "14.000", fuel: "Benzin", price: "25.000" },
  { image: bmw2.src, brand: "BMW", model: "520d Steptronic", year: 2024, km: "32.000", fuel: "Diesel", price: "42.000" },
  { image: bmw3.src, brand: "BMW", model: "520d Steptronic", year: 2024, km: "38.000", fuel: "Diesel", price: "44.000" },
  { image: bmw4.src, brand: "BMW", model: "520d Steptronic", year: 2024, km: "50.000", fuel: "Diesel", price: "42.000" },
  { image: lexus.src, brand: "Lexus", model: "Lexus", year: 2024, km: "23.000", fuel: "Diesel", price: "42.000" },
];

export function FeaturedCars() {
  return (
    <section id="cars" className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
              Udvalgte biler
            </span>
            <h2 className="mt-4 text-balance text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.02]">
              Et udvalg fra
              <br /> vores showroom.
            </h2>
          </div>
          <a
            href="#cars"
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:gap-3 transition-all"
          >
            Se alle biler
            <ArrowUpRight size={16} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {cars.map((car, i) => (
            <CarCard key={i} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CarCard({ car }: { car: Car }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl bg-card border border-border transition-all duration-500 hover:shadow-elevated hover:-translate-y-1">
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <img
          src={car.image.src || car.image}
          alt={`${car.brand} ${car.model}`}
          loading="lazy"
          width={1024}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute top-4 left-4 rounded-full bg-white/95 backdrop-blur px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
          {car.brand}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold leading-tight">{car.model}</h3>

        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5"><Calendar size={13} />{car.year}</span>
          <span className="inline-flex items-center gap-1.5"><Gauge size={13} />{car.km} km</span>
          <span className="inline-flex items-center gap-1.5"><Fuel size={13} />{car.fuel}</span>
        </div>

        <div className="mt-6 flex items-end justify-between pt-6 border-t border-border">
          <div>
            <span className="block text-[11px] uppercase tracking-[0.15em] text-muted-foreground">Pris</span>
            <span className="block text-2xl font-semibold tracking-tight">{car.price} €</span>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-xs font-semibold transition-transform hover:scale-105"
          >
            Se mere <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </article>
  );
}
