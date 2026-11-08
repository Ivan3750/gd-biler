import { ArrowUpRight } from "lucide-react";
import { galleryOf, type Car } from "@/app/lib/cars";
import { Plate } from "./Plate";
import { CardImage } from "./CardImage";
import type { Dict, Lang } from "@/app/lib/dict";
import { formatNumber, formatPrice, localePath } from "@/app/lib/i18n";

export function CarCard({ car, lang, t, premium = false, index = 0 }: { car: Car; lang: Lang; t: Dict; premium?: boolean; index?: number }) {
  const href = localePath(lang, `/biler/${car.id}`);
  return (
    <article
      style={premium ? undefined : { animationDelay: `${Math.min(index, 8) * 70}ms` }}
      className={`group relative flex flex-col overflow-hidden bg-card border border-border transition-shadow duration-500 hover:shadow-elevated ${premium ? "shop-card reveal rounded-3xl" : "shop-card animate-fade-up rounded-3xl"}`}
    >
      <CardImage images={galleryOf(car)} alt={`${car.brand} ${car.model}`} href={href} brand={car.brand} />

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold leading-tight">
            <a href={href}>{car.model}</a>
          </h3>
          {premium && car.plate && <Plate value={car.plate} className="shrink-0 text-[13px]" />}
        </div>

        <dl className="mt-4 flex flex-wrap gap-1.5">
          <Stat label={t.car.year} value={String(car.year)} />
          <Stat label={t.car.km} value={`${formatNumber(car.km, lang)} km`} />
          <Stat label={t.car.fuel} value={t.cars.fuel[car.fuel] ?? car.fuel} />
        </dl>

        <div className="mt-auto flex flex-wrap items-end justify-between gap-x-4 gap-y-3 border-t border-border pt-5">
          <div>
            <span className="block text-[11px] uppercase tracking-[0.15em] text-muted-foreground">{t.cars.price}</span>
            <span className={`block font-semibold tracking-tight ${car.price > 0 ? "text-2xl" : "text-xl"}`}>{formatPrice(car.price, lang)}</span>
          </div>
          <a
            href={href}
            className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground transition-transform hover:scale-105 active:scale-95 ${premium ? "btn-sheen" : ""}`}
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
    <div title={label} className="flex items-center gap-1.5 whitespace-nowrap rounded-full bg-secondary px-2.5 py-1.5">
      <dt className="sr-only">{label}</dt>
      <dd className="text-xs font-medium">{value}</dd>
    </div>
  );
}
