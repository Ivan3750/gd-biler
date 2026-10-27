import Image from "next/image";
import Link from "next/link";
import { Calendar, Fuel, Gauge } from "lucide-react";
import { carPath, carTitle, type Car } from "@/app/lib/cars";
import { formatNumber, formatPrice } from "@/app/lib/format";
import { href, type Dict, type Lang } from "@/app/lib/i18n";

export function StatusBadge({ status, label }: { status: string; label: string }) {
  if (status === "available") return null;
  return (
    <span
      className={`absolute left-3 top-3 rounded-sm px-2.5 py-1 text-xs font-semibold ${
        status === "sold" ? "bg-primary text-primary-foreground" : "bg-brand text-brand-foreground"
      }`}
    >
      {label}
    </span>
  );
}

export function CarCard({ car, lang, dict, currency }: { car: Car; lang: Lang; dict: Dict; currency: string }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-md border border-border bg-card hover:border-foreground/40">
      <div className="relative aspect-[4/3] bg-secondary">
        {car.images[0] && (
          <Image
            src={car.images[0]}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        )}
        <StatusBadge status={car.status} label={dict.status[car.status]} />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm text-muted-foreground">{car.brand}</p>
        <h3 className="mt-0.5 text-lg font-bold leading-tight">
          <Link href={href(lang, carPath(car))} className="after:absolute after:inset-0" aria-label={carTitle(car)}>
            {car.model}
          </Link>
        </h3>

        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
          <li className="inline-flex items-center gap-1.5">
            <Calendar size={14} aria-hidden />
            {car.year}
          </li>
          <li className="inline-flex items-center gap-1.5">
            <Gauge size={14} aria-hidden />
            {formatNumber(car.km, lang)} km
          </li>
          <li className="inline-flex items-center gap-1.5">
            <Fuel size={14} aria-hidden />
            {dict.fuel[car.fuel]}
          </li>
        </ul>

        <p className="mt-5 border-t border-border pt-4 text-2xl font-bold">{formatPrice(car.price, currency, lang)}</p>
      </div>
    </article>
  );
}

export function CarGrid({ cars, lang, dict, currency }: { cars: Car[]; lang: Lang; dict: Dict; currency: string }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} lang={lang} dict={dict} currency={currency} />
      ))}
    </div>
  );
}
