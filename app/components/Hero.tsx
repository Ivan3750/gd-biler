import { Search, ChevronRight, Calendar, ChevronDown, CalendarDays, CarFront, Euro, Fuel, Tag, type LucideIcon } from "lucide-react";
import { getImages } from "@/app/lib/images";
import { BODY_TYPES, FUELS, PRICE_STEPS, listPublishedCars } from "@/app/lib/cars";
import { formatNumber, getDict, localePath } from "@/app/lib/i18n";
import { filterText } from "@/app/lib/filter-text";
import { Lines } from "./Lines";

export async function Hero() {
  const [{ lang, t }, cars, images] = await Promise.all([getDict(), listPublishedCars(), getImages()]);
  const h = t.hero;
  const brands = [...new Set(cars.map((c) => c.brand))].sort();
  const ft = filterText(lang);
  const bodies = BODY_TYPES.filter((b) => cars.some((c) => c.bodyType === b));
  const fuels = FUELS.filter((f) => cars.some((c) => c.fuel === f));
  const years = [...new Set(cars.map((c) => c.year))].sort((a, b) => b - a);
  const opt = (v: string, label: string) => ({ value: v, label });

  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden bg-navy text-white">
      <img
        src={images.hero}
        alt=""
        width={1920}
        height={1280}
        className="animate-kenburns absolute inset-0 h-full w-full object-cover opacity-90"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.12 0.03 254 / 0.55) 0%, oklch(0.10 0.03 254 / 0.65) 50%, oklch(0.08 0.02 254 / 0.92) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-6 pt-40 pb-16 lg:px-10 lg:pb-24">
        <div className="max-w-3xl animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-white/90">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            {h.badge}
          </span>
          <h1 className="mt-6 text-balance text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            {h.title[0]}
            <br />
            <span className="text-white/70">{h.title[1]}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/75 leading-relaxed">{h.text}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#cars"
              className="btn-sheen group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-primary transition-all hover:scale-[1.02] hover:shadow-elevated"
            >
              {h.seeCars}
              <ChevronRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full glass px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/15 transition-all"
            >
              <Calendar size={15} />
              {h.book}
            </a>
          </div>
        </div>

        {/* Floating search: same fields and look as the filter on the car page */}
        <form action={localePath(lang, "/biler")} className="mt-12 lg:mt-16 animate-fade-up" style={{ animationDelay: "200ms" }}>
          <div className="glass rounded-3xl p-3 sm:p-4 shadow-elevated max-w-4xl ring-1 ring-white/10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              <SearchField
                icon={Tag}
                name="brand"
                label={h.brand}
                options={[opt("", ft.anyBrand), ...brands.map((b) => opt(b, b))]}
              />
              <SearchField
                icon={CarFront}
                name="body"
                label={h.type}
                options={[opt("", ft.anyBody), ...bodies.map((b) => opt(b, t.cars.body[b]))]}
              />
              <SearchField
                icon={Fuel}
                name="fuel"
                label={t.catalog.fuel}
                options={[opt("", ft.anyFuel), ...fuels.map((f) => opt(f, t.cars.fuel[f]))]}
              />
              <SearchField
                icon={Euro}
                name="maxPrice"
                label={h.price}
                options={[
                  opt("", ft.anyPrice),
                  ...PRICE_STEPS.map((p) => opt(String(p), `${h.upTo} ${formatNumber(p, lang)} €`)),
                ]}
              />
              <SearchField
                icon={CalendarDays}
                name="minYear"
                label={t.catalog.minYear}
                options={[opt("", ft.anyYear), ...years.map((y) => opt(String(y), String(y)))]}
              />
              <button className="btn-sheen inline-flex items-center justify-center gap-2 rounded-xl bg-white text-primary font-semibold py-4 transition-all hover:bg-white/90">
                <Search size={16} /> {ft.searchBtn}
              </button>
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-1 text-sm text-white/70">
              <span>{ft.stock(cars.length)}</span>
              <a href={localePath(lang, "/biler")} className="font-semibold text-white hover:underline">
                {ft.moreFilters}
              </a>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

function SearchField({
  icon: Icon,
  name,
  label,
  options,
}: {
  icon: LucideIcon;
  name: string;
  label: string;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="group relative flex cursor-pointer items-center gap-3 rounded-xl bg-white/5 px-4 py-2.5 transition-colors hover:bg-white/10">
      <Icon size={18} className="shrink-0 text-white/55" aria-hidden />
      <span className="min-w-0 flex-1">
        <span className="block text-[10px] uppercase tracking-[0.18em] text-white/60">{label}</span>
        <span className="relative mt-0.5 flex items-center">
          <select
            name={name}
            defaultValue=""
            className="bare-select w-full cursor-pointer appearance-none text-sm font-medium text-white outline-none"
          >
            {options.map((o) => (
              <option key={o.value} value={o.value} className="bg-navy text-white">
                {o.label}
              </option>
            ))}
          </select>
          <ChevronDown size={13} className="pointer-events-none absolute right-0 text-white/50 transition-colors group-hover:text-white/80" />
        </span>
      </span>
    </label>
  );
}
