import { listPublishedCars } from "@/app/lib/cars";

/** Slow-scrolling strip of the brands in stock, shown under the hero. */
export async function BrandMarquee() {
  const brands = [...new Set((await listPublishedCars()).map((c) => c.brand))].sort();
  if (brands.length === 0) return null;
  const row = [...brands, ...brands, ...brands, ...brands].slice(0, Math.max(8, brands.length * 2));
  const items = [...row, ...row];

  return (
    <div className="overflow-hidden border-b border-border bg-background py-5" aria-hidden>
      <div className="animate-marquee flex w-max items-center gap-14 whitespace-nowrap">
        {items.map((b, i) => (
          <span key={i} className="flex items-center gap-14 text-sm font-semibold uppercase tracking-[0.3em] text-foreground/45">
            {b}
            <span className="h-1 w-1 rounded-full bg-brand" />
          </span>
        ))}
      </div>
    </div>
  );
}
