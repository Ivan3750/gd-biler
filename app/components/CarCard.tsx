import { ArrowUpRight } from "lucide-react";
import { galleryOf, type Car } from "@/app/lib/cars";
import { Plate } from "./Plate";
import { CardImage } from "./CardImage";
import type { Dict, Lang } from "@/app/lib/dict";
import { copiedText, formatNumber, formatPrice, localePath } from "@/app/lib/i18n";
import { Price } from "./Price";

export function CarCard({ car, lang, t, premium = false, index = 0 }: { car: Car; lang: Lang; t: Dict; premium?: boolean; index?: number }) {
  const href = localePath(lang, `/biler/${car.id}`);
  const specs = [
    { label: t.car.year, value: String(car.year) },
    { label: t.car.km, value: `${formatNumber(car.km, lang)} km` },
    { label: t.car.fuel, value: t.cars.fuel[car.fuel] ?? car.fuel },
  ];

  return (
    <article
      style={premium ? undefined : { animationDelay: `${Math.min(index, 8) * 70}ms` }}
      className={`group relative flex flex-col rounded-[1.75rem] border border-border/70 bg-card p-2 shadow-soft transition-[box-shadow,transform] duration-500 hover:-translate-y-1.5 hover:shadow-elevated ${
        premium ? "reveal" : "animate-fade-up"
      }`}
    >
      <CardImage images={galleryOf(car)} alt={`${car.brand} ${car.model}`} href={href} brand={car.brand} />

      <div className="flex flex-1 flex-col px-4 pb-3 pt-4">
        <h3 className="text-xl font-semibold leading-tight tracking-tight">
          <a href={href}>{car.model}</a>
        </h3>

        <dl className="mt-2.5 flex flex-wrap items-center gap-x-2 text-[13px] text-muted-foreground">
          {specs.map((x, i) => (
            <div key={x.label} className="flex items-center gap-2" title={x.label}>
              {i > 0 && <span aria-hidden className="h-1 w-1 rounded-full bg-border" />}
              <dt className="sr-only">{x.label}</dt>
              <dd className="font-medium text-foreground/75">{x.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-5">
          <span className="block text-[11px] uppercase tracking-[0.15em] text-muted-foreground">{t.cars.price}</span>
          {car.price > 0 ? (
            <Price text={formatPrice(car.price, lang)} copiedLabel={copiedText(lang)} className="text-[1.7rem] font-semibold leading-tight tracking-tight" />
          ) : (
            <span className="block text-[1.4rem] font-semibold leading-tight tracking-tight">{formatPrice(car.price, lang)}</span>
          )}
        </div>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
          {car.plate ? <Plate value={car.plate} className="text-[15px]" /> : <span />}
          <a
            href={href}
            aria-label={`${t.cars.more}: ${car.brand} ${car.model}`}
            title={t.cars.more}
            className="group/btn inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-all duration-300 hover:scale-110 hover:shadow-soft active:scale-95"
          >
            <ArrowUpRight size={18} className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </article>
  );
}
