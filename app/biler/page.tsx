import type { Metadata } from "next";
import { ChevronDown, Search, X } from "lucide-react";
import { Header } from "@/app/components/Header";
import { Contact } from "@/app/components/Contact";
import { Footer } from "@/app/components/Footer";
import { CarCard } from "@/app/components/CarCard";
import { BodyIcon } from "@/app/components/BodyIcon";
import { FilterDrawer, FilterForm } from "@/app/components/FilterForm";
import { JsonLd } from "@/app/components/JsonLd";
import { Newsletter } from "@/app/components/Newsletter";
import { absoluteUrl, breadcrumbJsonLd, pageMetadata } from "@/app/lib/seo";
import {
  BODY_TYPES,
  DRIVES,
  GEARBOXES,
  FUELS,
  LIST_FILTERS,
  RANGE_FILTERS,
  facetCount,
  filterCars,
  listPublishedCars,
  type CarFilters,
  type ListFilter,
  type RangeFilter,
} from "@/app/lib/cars";
import { getImages } from "@/app/lib/images";
import { filterText } from "@/app/lib/filter-text";
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

const many = (v: string | string[] | undefined) => (Array.isArray(v) ? v : v ? [v] : []).filter(Boolean);
const one = (v: string | string[] | undefined) => many(v)[0] ?? "";
const num = (v: string) => (/^\d+([.,]\d+)?$/.test(v) ? Number(v.replace(",", ".")) : undefined);

export default async function CatalogPage({ searchParams }: { searchParams: SearchParams }) {
  const [sp, all, { lang, t }] = await Promise.all([searchParams, listPublishedCars(), getDict()]);
  const c = t.catalog;
  const ft = filterText(lang);
  const listPath = localePath(lang, "/biler");

  // What the visitor has chosen: checkbox lists and from/to numbers.
  const lists = Object.fromEntries(LIST_FILTERS.map((k) => [k, many(sp[k])])) as Record<ListFilter, string[]>;
  const ranges = Object.fromEntries(RANGE_FILTERS.map((k) => [k, num(one(sp[k]))])) as Record<RangeFilter, number | undefined>;
  const q = one(sp.q);
  const sort = one(sp.sort);
  const filters: CarFilters = { q, sort, ...lists, ...ranges };
  const cars = filterCars(all, filters);

  const activeCount =
    (q ? 1 : 0) +
    LIST_FILTERS.reduce((n, k) => n + lists[k].length, 0) +
    RANGE_FILTERS.filter((k) => ranges[k] !== undefined).length;
  const active = activeCount > 0;
  const searchQs = new URLSearchParams([
    ...(q ? [["q", q]] : []),
    ...LIST_FILTERS.flatMap((k) => lists[k].map((x) => [k, x])),
    ...RANGE_FILTERS.filter((k) => ranges[k] !== undefined).map((k) => [k, String(ranges[k])]),
  ] as [string, string][]).toString();

  // Options come from the stock, so there are no empty choices.
  const uniq = (xs: (string | undefined)[]) => [...new Set(xs.filter((x): x is string => Boolean(x)))].sort();
  const brands = uniq(all.map((x) => x.brand));
  const colors = uniq(all.map((x) => x.color));
  const fuels = FUELS.filter((f) => all.some((x) => x.fuel === f));
  const bodies = BODY_TYPES.filter((b) => all.some((x) => x.bodyType === b));
  const gearboxes = GEARBOXES.filter((g) => all.some((x) => x.gearbox === g));
  const drives = DRIVES.filter((d) => all.some((x) => x.drive === d));
  // Equipment is stored in Danish; the English text is looked up by position.
  const equipLabel = new Map<string, string>();
  for (const x of all) x.equipment?.forEach((e, i) => equipLabel.set(e, (lang === "en" && x.equipmentEn?.[i]) || e));
  const equipment = [...equipLabel.keys()].sort();

  const bounds = (pick: (x: (typeof all)[number]) => number | undefined) => {
    const v = all.map(pick).filter((n): n is number => n !== undefined);
    return v.length ? { min: Math.min(...v), max: Math.max(...v) } : undefined;
  };
  const bPrice = bounds((x) => x.price);
  const bYear = bounds((x) => x.year);
  const bKm = bounds((x) => x.km);
  const bHp = bounds((x) => x.powerHp);

  const opt = (key: ListFilter, value: string, label: string) => ({
    value,
    label,
    count: facetCount(all, filters, key, value),
    checked: lists[key].includes(value),
  });

  // Chips for every active choice; each one removes just that choice.
  const chipHref = (drop: { key: string; value?: string }) => {
    const rest = new URLSearchParams(
      [...new URLSearchParams(searchQs)].filter(([k, v]) => !(k === drop.key && (drop.value === undefined || v === drop.value))),
    );
    if (sort) rest.set("sort", sort);
    const s = rest.toString();
    return s ? `${listPath}?${s}` : listPath;
  };
  const lower = ft.from.toLowerCase();
  const upper = ft.to.toLowerCase();
  const rangeName: Record<RangeFilter, string> = {
    minPrice: `${ft.price} ${lower}`,
    maxPrice: `${ft.price} ${upper}`,
    minYear: `${ft.year} ${lower}`,
    maxYear: `${ft.year} ${upper}`,
    minKm: `${ft.km} ${lower}`,
    maxKm: `${ft.km} ${upper}`,
    minHp: `${ft.power} ${lower}`,
    maxHp: `${ft.power} ${upper}`,
    minKmPerL: ft.kmPerL,
    minSeats: ft.seats,
    maxOwners: ft.owners,
  };
  const listLabel = (k: ListFilter, v: string) =>
    k === "fuel"
      ? t.cars.fuel[v] ?? v
      : k === "body"
        ? t.cars.body[v] ?? v
        : k === "gearbox"
          ? t.cars.gearbox[v] ?? v
          : k === "drive"
            ? t.cars.drive[v] ?? v
            : k === "equipment"
              ? equipLabel.get(v) ?? v
              : v;
  const chips = [
    ...(q ? [{ key: "q", name: ft.search.replace(/…$/, ""), label: q, href: chipHref({ key: "q" }) }] : []),
    ...LIST_FILTERS.flatMap((k) =>
      lists[k].map((v) => ({ key: `${k}-${v}`, name: ft[k], label: listLabel(k, v), href: chipHref({ key: k, value: v }) })),
    ),
    ...RANGE_FILTERS.filter((k) => ranges[k] !== undefined).map((k) => ({
      key: k,
      name: rangeName[k],
      label: formatNumber(ranges[k]!, lang),
      href: chipHref({ key: k }),
    })),
  ];

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
        <FilterForm action={listPath}>
          <section className="bg-navy texture-light text-navy-foreground pt-28 pb-10 lg:pt-32 lg:pb-12">
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
              <div className="animate-fade-up">
                <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
                  {c.title[0]} <span className="text-white/70">{c.title[1]}</span>
                </h1>
                <p className="mt-3 max-w-xl text-lg text-white/75 leading-relaxed">{c.text}</p>
              </div>

              {/* Search and sorting: always visible */}
              <div
                className="glass mt-8 grid max-w-4xl animate-fade-up gap-2 rounded-2xl p-3 shadow-elevated sm:grid-cols-[1fr_16rem] sm:p-4"
                style={{ animationDelay: "150ms" }}
              >
                <label className="flex flex-col rounded-xl bg-white/5 px-4 py-2.5 transition-colors hover:bg-white/10">
                  <span className="text-[10px] uppercase tracking-[0.18em] text-white/60">{ft.search.replace(/…$/, "")}</span>
                  <span className="relative mt-0.5 flex items-center">
                    <Search size={14} className="pointer-events-none absolute left-0 text-white/60" />
                    <input
                      type="search"
                      name="q"
                      defaultValue={q}
                      placeholder={ft.search}
                      className="w-full bg-transparent pl-6 text-sm font-medium text-white outline-none placeholder:text-white/40"
                    />
                  </span>
                </label>
                <label className="group relative flex cursor-pointer flex-col rounded-xl bg-white/5 px-4 py-2.5 transition-colors hover:bg-white/10">
                  <span className="text-[10px] uppercase tracking-[0.18em] text-white/60">{ft.sort}</span>
                  <span className="relative mt-0.5 flex items-center">
                    <select
                      name="sort"
                      defaultValue={sort}
                      className="bare-select w-full cursor-pointer appearance-none text-sm font-medium text-white outline-none"
                    >
                      <option value="" className="bg-navy text-white">{ft.sorts.newest}</option>
                      {(["priceAsc", "priceDesc", "yearDesc", "kmAsc", "hpDesc"] as const).map((s) => (
                        <option key={s} value={s} className="bg-navy text-white">{ft.sorts[s]}</option>
                      ))}
                    </select>
                    <ChevronDown size={13} className="pointer-events-none absolute right-0 text-white/50" />
                  </span>
                </label>
              </div>
            </div>
          </section>

          <section className="bg-secondary texture-dark py-8 lg:py-10">
            <div className="mx-auto grid max-w-7xl gap-6 px-6 lg:grid-cols-[20rem_1fr] lg:items-start lg:gap-8 lg:px-10">
              <aside className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:rounded-2xl">
                <FilterDrawer
                  title={ft.filters}
                  activeCount={activeCount}
                  showLabel={ft.showCars(cars.length)}
                  resetLabel={ft.reset}
                  resetHref={listPath}
                >
                  <p className="pb-1 pt-2 text-sm font-medium text-muted-foreground">{ft.popular}</p>

                  <Group title={ft.price}>
                    <Range lo="minPrice" hi="maxPrice" v={ranges} bounds={bPrice} ft={ft} lang={lang} />
                  </Group>
                  {brands.length > 0 && (
                    <Group title={ft.brand}>
                      <Checks name="brand" options={brands.map((b) => opt("brand", b, b))} />
                    </Group>
                  )}
                  {bodies.length > 0 && (
                    <Group title={ft.body}>
                      <div className="grid grid-cols-3 gap-2">
                        {bodies.map((b) => {
                          const o = opt("body", b, t.cars.body[b] ?? b);
                          return (
                            <label key={b} className="cursor-pointer">
                              <input type="checkbox" name="body" value={b} defaultChecked={o.checked} className="peer sr-only" />
                              <span
                                className={`flex flex-col items-center gap-1 rounded-lg border border-border px-1 py-2 text-center text-[11px] leading-tight text-muted-foreground transition-colors hover:border-foreground/40 peer-checked:border-primary peer-checked:bg-primary/5 peer-checked:text-foreground peer-checked:ring-1 peer-checked:ring-primary peer-focus-visible:ring-2 ${o.count === 0 && !o.checked ? "opacity-40" : ""}`}
                              >
                                <BodyIcon type={b} className="h-6 w-full" />
                                {o.label}
                                <span className="opacity-60">{o.count}</span>
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </Group>
                  )}
                  {fuels.length > 0 && (
                    <Group title={ft.fuel}>
                      <Checks name="fuel" options={fuels.map((f) => opt("fuel", f, t.cars.fuel[f] ?? f))} />
                    </Group>
                  )}
                  {gearboxes.length > 0 && (
                    <Group title={ft.gearbox}>
                      <Checks name="gearbox" options={gearboxes.map((g) => opt("gearbox", g, t.cars.gearbox[g] ?? g))} />
                    </Group>
                  )}
                  <Group title={ft.year}>
                    <Range lo="minYear" hi="maxYear" v={ranges} bounds={bYear} ft={ft} lang={lang} plain />
                  </Group>
                  <Group title={ft.km}>
                    <Range lo="minKm" hi="maxKm" v={ranges} bounds={bKm} ft={ft} lang={lang} />
                  </Group>

                  <p className="pb-1 pt-5 text-sm font-medium text-muted-foreground">{ft.more}</p>
                  {drives.length > 0 && (
                    <Group title={ft.drive} closed>
                      <Checks name="drive" options={drives.map((d) => opt("drive", d, t.cars.drive[d] ?? d))} />
                    </Group>
                  )}
                  {bHp && (
                    <Group title={ft.power} closed>
                      <Range lo="minHp" hi="maxHp" v={ranges} bounds={bHp} ft={ft} lang={lang} />
                    </Group>
                  )}
                  <Group title={ft.kmPerL} closed>
                    <Single name="minKmPerL" value={ranges.minKmPerL} placeholder="15" />
                  </Group>
                  <Group title={ft.seats} closed>
                    <Single name="minSeats" value={ranges.minSeats} placeholder="5" />
                  </Group>
                  <Group title={ft.owners} closed>
                    <Single name="maxOwners" value={ranges.maxOwners} placeholder="1" />
                  </Group>
                  {colors.length > 0 && (
                    <Group title={ft.color} closed>
                      <Checks name="color" options={colors.map((x) => opt("color", x, x))} />
                    </Group>
                  )}
                  {equipment.length > 0 && (
                    <Group title={ft.equipment} closed>
                      <Checks name="equipment" options={equipment.map((x) => opt("equipment", x, equipLabel.get(x) ?? x))} />
                    </Group>
                  )}
                </FilterDrawer>
              </aside>

              <div>
                {chips.length > 0 && (
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    {chips.map((chip) => (
                      <a
                        key={chip.key}
                        href={chip.href}
                        aria-label={`${ft.reset}: ${chip.name} ${chip.label}`}
                        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-sm font-medium transition-colors hover:border-foreground/40"
                      >
                        <span className="text-muted-foreground">{chip.name}:</span> {chip.label}
                        <X size={13} className="text-muted-foreground" />
                      </a>
                    ))}
                  </div>
                )}

                <div className="mb-4 flex items-center justify-between gap-4">
                  <p className="text-sm text-muted-foreground" aria-live="polite">
                    <span className="text-xl font-semibold text-foreground">{cars.length}</span>{" "}
                    {cars.length === 1 ? c.results[0] : c.results[1]}
                  </p>
                  {active && (
                    <a href={listPath} className="text-sm font-semibold underline-offset-4 hover:underline">
                      {ft.resetAll}
                    </a>
                  )}
                </div>

                {cars.length === 0 ? (
                  <p className="rounded-2xl border border-border bg-background p-8 text-lg leading-relaxed text-muted-foreground">
                    {c.none}
                  </p>
                ) : (
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {cars.map((car) => (
                      <CarCard key={car.id} car={car} lang={lang} t={t} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        </FilterForm>

        <Newsletter search={searchQs || undefined} />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

/** A folding group in the filter column. */
function Group({ title, closed, children }: { title: string; closed?: boolean; children: React.ReactNode }) {
  return (
    <details open={!closed} className="group border-b border-border py-3 last:border-b-0">
      <summary className="flex cursor-pointer list-none items-center justify-between text-base font-semibold [&::-webkit-details-marker]:hidden">
        {title}
        <ChevronDown size={16} className="text-muted-foreground transition-transform group-open:rotate-180" />
      </summary>
      <div className="mt-3">{children}</div>
    </details>
  );
}

const input =
  "w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-foreground";

/** "From – to" pair of number fields; the placeholders show the range available in the stock. */
function Range({
  lo,
  hi,
  v,
  bounds,
  ft,
  lang,
  plain,
}: {
  lo: RangeFilter;
  hi: RangeFilter;
  v: Record<RangeFilter, number | undefined>;
  bounds?: { min: number; max: number };
  ft: ReturnType<typeof filterText>;
  lang: "da" | "en";
  /** Years are shown without thousands separators. */
  plain?: boolean;
}) {
  const show = (n?: number) => (n === undefined ? "" : plain ? String(n) : formatNumber(n, lang));
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-2">
      <label className="block text-xs text-muted-foreground">
        {ft.from}
        <input type="number" inputMode="numeric" min={0} name={lo} defaultValue={v[lo] ?? ""} placeholder={show(bounds?.min)} className={`${input} mt-1`} />
      </label>
      <span className="pb-2.5 text-muted-foreground">–</span>
      <label className="block text-xs text-muted-foreground">
        {ft.to}
        <input type="number" inputMode="numeric" min={0} name={hi} defaultValue={v[hi] ?? ""} placeholder={show(bounds?.max)} className={`${input} mt-1`} />
      </label>
    </div>
  );
}

function Single({ name, value, placeholder }: { name: string; value?: number; placeholder: string }) {
  return <input type="number" inputMode="decimal" min={0} step="any" name={name} defaultValue={value ?? ""} placeholder={placeholder} className={input} />;
}

/** Checkbox list; the number is how many cars the choice would give. */
function Checks({ name, options }: { name: string; options: { value: string; label: string; count: number; checked: boolean }[] }) {
  return (
    <ul className="max-h-64 space-y-1.5 overflow-y-auto pr-1">
      {options.map((o) => (
        <li key={o.value}>
          <label className={`flex cursor-pointer items-center gap-3 rounded-md py-1 text-sm ${o.count === 0 && !o.checked ? "opacity-45" : ""}`}>
            <input type="checkbox" name={name} value={o.value} defaultChecked={o.checked} className="h-4 w-4 shrink-0 accent-primary" />
            <span className="flex-1">{o.label}</span>
            <span className="text-xs text-muted-foreground">{o.count}</span>
          </label>
        </li>
      ))}
    </ul>
  );
}
