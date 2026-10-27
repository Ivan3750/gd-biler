import { ArrowUpRight } from "lucide-react";
import { galleryOf, type Car } from "@/app/lib/cars";
import { CardImage } from "./CardImage";
import type { Dict, Lang } from "@/app/lib/dict";
import { formatNumber, formatPrice, localePath } from "@/app/lib/i18n";

export function CarCard({ car, lang, t }: { car: Car; lang: Lang; t: Dict }) {
  const href = localePath(lang, `/biler/${car.id}`);
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl bg-card border border-border transition-shadow duration-500 hover:shadow-elevated">
      <CardImage images={galleryOf(car)} alt={`${car.brand} ${car.model}`} href={href} brand={car.brand} />

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold leading-tight">
          <a href={href}>{car.model}</a>
        </h3>

        <dl className="mt-4 grid grid-cols-3 gap-3">
          <Stat label={t.car.fuel} value={t.cars.fuel[car.fuel] ?? car.fuel} />
          <Stat label={t.car.km} value={`${formatNumber(car.km, lang)} km`} />
          <Stat label={t.car.year} value={String(car.year)} />
        </dl>

        <div className="mt-6 flex items-end justify-between pt-6 border-t border-border">
          <div>
            <span className="block text-[11px] uppercase tracking-[0.15em] text-muted-foreground">{t.cars.price}</span>
            <span className="block text-2xl font-semibold tracking-tight">{formatPrice(car.price, lang)}</span>
          </div>
          <a
            href={href}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-xs font-semibold transition-transform hover:scale-105"
          >
            {t.cars.more} <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </article>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col-reverse rounded-lg bg-secondary px-3 py-2">
      <dt className="text-[11px] text-muted-foreground">{label}</dt>
      <dd className="truncate text-sm font-semibold">{value}</dd>
    </div>
  );
}
