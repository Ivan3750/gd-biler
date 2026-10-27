import type { Metadata } from "next";
import { Header } from "@/app/components/Header";
import { Contact } from "@/app/components/Contact";
import { Footer } from "@/app/components/Footer";
import { CarCard } from "@/app/components/CarCard";
import { Search } from "lucide-react";
import { FilterForm, FilterPanel } from "@/app/components/FilterForm";
import { JsonLd } from "@/app/components/JsonLd";
import { absoluteUrl, breadcrumbJsonLd, pageMetadata } from "@/app/lib/seo";
import { Lines } from "@/app/components/Lines";
import {
  BODY_TYPES,
  GEARBOXES,
  KM_STEPS,
  PRICE_STEPS,
  filterCars,
  listPublishedCars,
  FUELS,
} from "@/app/lib/cars";
import { getImages } from "@/app/lib/images";
import { formatNumber, getDict, localePath } from "@/app/lib/i18n";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const [sp, { lang, t }] = await Promise.all([searchParams, getDict()]);
  // Filtered and sorted lists are not separate pages for search engines.
  const filtered = Object.values(sp).some((x) => (Array.isArray(x) ? x[0] : x));
  return pageMetadata({
    lang,
    path: "/biler",
    title: t.meta.catalogTitle,
    description: t.meta.catalogDescription,
    image: (await getImages()).hero,
    noindex: filtered,
  });
}

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";
const num = (v: string) => (/^\d+$/.test(v) ? Number(v) : undefined);

export default async function CatalogPage({ searchParams }: { searchParams: SearchParams }) {
  const [sp, all, { lang, t }] = await Promise.all([searchParams, listPublishedCars(), getDict()]);
  const c = t.catalog;

  const v = {
    q: one(sp.q),
    brand: one(sp.brand),
    fuel: one(sp.fuel),
    body: one(sp.body),
    gearbox: one(sp.gearbox),
    maxPrice: one(sp.maxPrice),
    minYear: one(sp.minYear),
    maxKm: one(sp.maxKm),
    sort: one(sp.sort),
  };
  const cars = filterCars(all, {
    ...v,
    maxPrice: num(v.maxPrice),
    minYear: num(v.minYear),
    maxKm: num(v.maxKm),
  });
  const activeKeys = Object.entries(v)
    .filter(([k, x]) => x && k !== "sort")
    .map(([k]) => k);
  const active = activeKeys.length > 0;
  const listPath = localePath(lang, "/biler");

  // Offer only values that exist in the stock; the count shows how many cars each choice would give.
  const filters = { ...v, maxPrice: num(v.maxPrice), minYear: num(v.minYear), maxKm: num(v.maxKm) };
  const countFor = (key: "brand" | "fuel" | "body" | "gearbox", value: string) =>
    filterCars(all, { ...filters, [key]: value }).length;
  const years = [...new Set(all.map((x) => x.year))].sort((a, b) => b - a);
  const brands = [...new Set(all.map((x) => x.brand))].sort();
  const fuels = FUELS.filter((f) => all.some((x) => x.fuel === f));
  const bodies = BODY_TYPES.filter((b) => all.some((x) => x.bodyType === b));
  const gearboxes = GEARBOXES.filter((g) => all.some((x) => x.gearbox === g));

  const brandOptions = brands.map((b) => ({ value: b, label: b }));
  const withCount = (key: "fuel" | "body" | "gearbox", value: string, label: string) =>
    `${label} (${countFor(key, value)})`;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t.car.home, path: localePath(lang, "/") },
          { name: t.car.all, path: listPath },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: all.map((x, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: absoluteUrl(localePath(lang, `/biler/${x.id}`)),
            name: `${x.brand} ${x.model} ${x.year}`,
          })),
        }}
      />
      <Header />
      <main>
        <section className="bg-navy texture-light text-navy-foreground pt-28 pb-10 lg:pt-32 lg:pb-12">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="animate-fade-up">
              <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
                {c.title[0]} <span className="text-white/70">{c.title[1]}</span>
              </h1>
              <p className="mt-3 max-w-xl text-lg text-white/75 leading-relaxed">{c.text}</p>
            </div>
          </div>
        </section>

        <section className="bg-secondary texture-dark py-8 lg:py-10">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <FilterPanel title={c.filters} activeCount={activeKeys.length}>
              <FilterForm action={listPath}>
                {/* Search and sorting */}
                <div className="grid gap-3 sm:grid-cols-[1fr_16rem]">
                  <label className="relative block">
                    <span className="sr-only">{c.search}</span>
                    <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="search"
                      name="q"
                      defaultValue={v.q}
                      placeholder={c.search}
                      className="w-full rounded-full border border-border bg-background py-2.5 pl-10 pr-4 text-sm outline-none focus:border-foreground"
                    />
                  </label>
                  <label className="block">
                    <span className="sr-only">{c.sort}</span>
                    <select name="sort" defaultValue={v.sort} aria-label={c.sort} className="plain-select w-full">
                      <option value="">{c.sorts.newest}</option>
                      <option value="priceAsc">{c.sorts.priceAsc}</option>
                      <option value="priceDesc">{c.sorts.priceDesc}</option>
                      <option value="yearDesc">{c.sorts.yearDesc}</option>
                      <option value="kmAsc">{c.sorts.kmAsc}</option>
                    </select>
                  </label>
                </div>

                {/* Brand: one row of buttons, scrolls sideways on small screens */}
                {brandOptions.length > 0 && (
                  <fieldset className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
                    <legend className="sr-only">{c.brand}</legend>
                    <Pill name="brand" value="" label={c.all} checked={!v.brand} />
                    {brandOptions.map((o) => (
                      <Pill
                        key={o.value}
                        name="brand"
                        value={o.value}
                        label={o.label}
                        count={countFor("brand", o.value)}
                        checked={v.brand === o.value}
                      />
                    ))}
                  </fieldset>
                )}

                {/* Everything else: compact dropdowns in one row */}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                  <Select name="fuel" label={c.fuel} value={v.fuel} all={c.all}>
                    {fuels.map((f) => (
                      <option key={f} value={f}>{withCount("fuel", f, t.cars.fuel[f])}</option>
                    ))}
                  </Select>
                  {bodies.length > 0 && (
                    <Select name="body" label={c.body} value={v.body} all={c.all}>
                      {bodies.map((b) => (
                        <option key={b} value={b}>{withCount("body", b, t.cars.body[b])}</option>
                      ))}
                    </Select>
                  )}
                  {gearboxes.length > 0 && (
                    <Select name="gearbox" label={c.gearbox} value={v.gearbox} all={c.all}>
                      {gearboxes.map((g) => (
                        <option key={g} value={g}>{withCount("gearbox", g, t.cars.gearbox[g])}</option>
                      ))}
                    </Select>
                  )}
                  <Select name="maxPrice" label={c.maxPrice} value={v.maxPrice} all={c.any}>
                    {PRICE_STEPS.map((p) => (
                      <option key={p} value={p}>{formatNumber(p, lang)} €</option>
                    ))}
                  </Select>
                  <Select name="minYear" label={c.minYear} value={v.minYear} all={c.any}>
                    {years.map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </Select>
                  <Select name="maxKm" label={c.maxKm} value={v.maxKm} all={c.any}>
                    {KM_STEPS.map((k) => (
                      <option key={k} value={k}>{formatNumber(k, lang)} km</option>
                    ))}
                  </Select>
                </div>
              </FilterForm>
            </FilterPanel>

            <div className="mb-5 mt-8 flex items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground" aria-live="polite">
                <span className="text-xl font-semibold text-foreground">{cars.length}</span>{" "}
                {cars.length === 1 ? c.results[0] : c.results[1]}
              </p>
              {active && (
                <a href={listPath} className="text-sm font-semibold underline-offset-4 hover:underline">
                  {c.reset}
                </a>
              )}
            </div>

            {cars.length === 0 ? (
              <p className="rounded-2xl border border-border bg-background p-8 text-lg leading-relaxed text-muted-foreground">
                {c.none}
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {cars.map((car) => (
                  <CarCard key={car.id} car={car} lang={lang} t={t} />
                ))}
              </div>
            )}
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
    </div>
  );
}

/** A filter choice shown as a button; the radio underneath is what the form submits. */
function Pill({
  name,
  value,
  label,
  count,
  checked,
}: {
  name: string;
  value: string;
  label: string;
  count?: number;
  checked: boolean;
}) {
  return (
    <label className="shrink-0 cursor-pointer">
      <input type="radio" name={name} value={value} defaultChecked={checked} className="peer sr-only" />
      <span
        className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:border-foreground/40 peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground peer-focus-visible:ring-2 peer-focus-visible:ring-ring ${
          count === 0 ? "opacity-45" : ""
        }`}
      >
        {label}
        {count !== undefined && <span className="text-xs opacity-60">{count}</span>}
      </span>
    </label>
  );
}

function Select({
  name,
  label,
  value,
  all,
  children,
}: {
  name: string;
  label: string;
  value: string;
  all: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </span>
      <select name={name} defaultValue={value} className="plain-select w-full">
        <option value="">{all}</option>
        {children}
      </select>
    </label>
  );
}
