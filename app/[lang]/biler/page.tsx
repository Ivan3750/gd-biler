import type { Metadata } from "next";
import Link from "next/link";
import { CarGrid } from "@/app/components/CarCard";
import { PageHeader, Section } from "@/app/components/Section";
import { btnPrimary, btnSecondary, input } from "@/app/components/ui";
import { distinct, filterCars, listPublicCars } from "@/app/lib/cars";
import { formatNumber } from "@/app/lib/format";
import { getDict, href, type Lang } from "@/app/lib/i18n";
import { resolveLang } from "@/app/lib/i18n/server";
import { getSettings, telHref } from "@/app/lib/settings";
import { pageMetadata } from "@/app/lib/site";
import { BODY_TYPES, FUELS, GEARBOXES, SORTS, type Sort } from "@/app/lib/vehicle";

const PER_PAGE = 12;
const PRICE_STEPS = [20000, 30000, 40000, 50000, 75000, 100000];
const KM_STEPS = [25000, 50000, 100000, 150000, 200000];

export async function generateMetadata({ params }: PageProps<"/[lang]/biler">): Promise<Metadata> {
  const lang = await resolveLang(params);
  const t = getDict(lang).cars;
  return pageMetadata(lang, "/biler", t.metaTitle, t.metaDescription);
}

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";
const num = (v: string | string[] | undefined) => {
  const n = Number(one(v));
  return Number.isFinite(n) && n > 0 ? n : undefined;
};
const pick = <T extends string>(v: string | string[] | undefined, list: readonly T[]) => list.find((x) => x === one(v));

export default async function CarsPage({ params, searchParams }: PageProps<"/[lang]/biler">) {
  const lang = await resolveLang(params);
  const dict = getDict(lang);
  const t = dict.cars;
  const sp = await searchParams;
  const [settings, all] = await Promise.all([getSettings(), listPublicCars()]);

  const q = one(sp.q).slice(0, 60);
  const brands = distinct(all.map((c) => c.brand)).sort();
  const filters = {
    q,
    brand: brands.find((b) => b === one(sp.brand)),
    fuel: pick(sp.fuel, FUELS),
    body: pick(sp.body, BODY_TYPES),
    gearbox: pick(sp.gearbox, GEARBOXES),
    maxPrice: num(sp.maxPrice),
    minYear: num(sp.minYear),
    maxKm: num(sp.maxKm),
    sort: (pick(sp.sort, SORTS) ?? "new") as Sort,
  };

  const result = filterCars(all, filters);
  const pages = Math.max(1, Math.ceil(result.length / PER_PAGE));
  const page = Math.min(num(sp.page) ?? 1, pages);
  const shown = result.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const active = Object.entries(filters).some(([k, v]) => k !== "sort" && v);
  const years = distinct(all.map((c) => c.year)).sort((a, b) => b - a);
  const cur = settings.currency;

  const pageHref = (p: number) => {
    const query = new URLSearchParams();
    Object.entries(filters).forEach(([k, v]) => v && query.set(k, String(v)));
    if (p > 1) query.set("page", String(p));
    const s = query.toString();
    return `${href(lang, "/biler")}${s ? `?${s}` : ""}`;
  };

  return (
    <>
      <PageHeader title={t.title} />
      <Section>
        <form method="get" action={href(lang, "/biler")} className="mb-8 rounded-md border border-border bg-secondary p-4 sm:p-5">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <label className="text-sm font-medium">
              {t.filters.search}
              <input name="q" defaultValue={q} placeholder={t.filters.searchPlaceholder} className={input} />
            </label>
            <Select name="brand" label={t.filters.brand} all={t.filters.all} value={filters.brand}>
              {brands.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </Select>
            <Select name="fuel" label={t.filters.fuel} all={t.filters.all} value={filters.fuel}>
              {FUELS.map((f) => (
                <option key={f} value={f}>
                  {dict.fuel[f]}
                </option>
              ))}
            </Select>
            <Select name="body" label={t.filters.body} all={t.filters.all} value={filters.body}>
              {BODY_TYPES.map((b) => (
                <option key={b} value={b}>
                  {dict.body[b]}
                </option>
              ))}
            </Select>
            <Select name="gearbox" label={t.filters.gearbox} all={t.filters.all} value={filters.gearbox}>
              {GEARBOXES.map((g) => (
                <option key={g} value={g}>
                  {dict.gearbox[g]}
                </option>
              ))}
            </Select>
            <Select name="maxPrice" label={t.filters.maxPrice} all={t.filters.any} value={String(filters.maxPrice ?? "")}>
              {PRICE_STEPS.map((p) => (
                <option key={p} value={p}>
                  {formatNumber(p, lang)} {cur}
                </option>
              ))}
            </Select>
            <Select name="minYear" label={t.filters.minYear} all={t.filters.any} value={String(filters.minYear ?? "")}>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </Select>
            <Select name="maxKm" label={t.filters.maxKm} all={t.filters.any} value={String(filters.maxKm ?? "")}>
              {KM_STEPS.map((k) => (
                <option key={k} value={k}>
                  {formatNumber(k, lang)} km
                </option>
              ))}
            </Select>
          </div>
          <div className="mt-5 flex flex-wrap items-end gap-3">
            <label className="text-sm font-medium">
              {t.filters.sort}
              <select name="sort" defaultValue={filters.sort} className={`${input} !mt-1.5 min-w-52`}>
                {SORTS.map((s) => (
                  <option key={s} value={s}>
                    {t.sorts[s]}
                  </option>
                ))}
              </select>
            </label>
            <button className={btnPrimary}>{t.filters.apply}</button>
            {active && (
              <Link href={href(lang, "/biler")} className={btnSecondary}>
                {t.filters.reset}
              </Link>
            )}
          </div>
        </form>

        {all.length === 0 ? (
          <Empty lang={lang} message={t.noStock} hint="" phone={settings.phone} />
        ) : shown.length === 0 ? (
          <Empty lang={lang} message={t.empty} hint={t.emptyHint} phone={settings.phone} />
        ) : (
          <>
            <p className="mb-5 text-sm text-muted-foreground" aria-live="polite">
              {t.count(result.length)}
            </p>
            <CarGrid cars={shown} lang={lang} dict={dict} currency={cur} />
            {pages > 1 && (
              <nav className="mt-10 flex items-center justify-between gap-4" aria-label={dict.common.page}>
                {page > 1 ? (
                  <Link href={pageHref(page - 1)} className={btnSecondary}>
                    {dict.common.previous}
                  </Link>
                ) : (
                  <span />
                )}
                <span className="text-sm text-muted-foreground">
                  {dict.common.page} {page} / {pages}
                </span>
                {page < pages ? (
                  <Link href={pageHref(page + 1)} className={btnSecondary}>
                    {dict.common.next}
                  </Link>
                ) : (
                  <span />
                )}
              </nav>
            )}
          </>
        )}
      </Section>
    </>
  );
}

function Select({
  name,
  label,
  all,
  value,
  children,
}: {
  name: string;
  label: string;
  all: string;
  value?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="text-sm font-medium">
      {label}
      <select name={name} defaultValue={value ?? ""} className={input}>
        <option value="">{all}</option>
        {children}
      </select>
    </label>
  );
}

function Empty({ message, hint, phone }: { lang: Lang; message: string; hint: string; phone: string }) {
  return (
    <div className="rounded-md border border-border p-10 text-center">
      <p className="text-lg font-semibold">{message}</p>
      {hint && <p className="mt-2 text-muted-foreground">{hint}</p>}
      <a href={telHref(phone)} className={`${btnPrimary} mt-6`}>
        {phone}
      </a>
    </div>
  );
}
