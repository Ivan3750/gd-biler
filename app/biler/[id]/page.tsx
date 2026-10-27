import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Car as CarIcon, Check, ChevronRight, Cog, Fuel, Gauge, Mail, Phone, ShieldCheck, Zap } from "lucide-react";
import { Header } from "@/app/components/Header";
import { Contact } from "@/app/components/Contact";
import { Footer } from "@/app/components/Footer";
import { CarCard } from "@/app/components/CarCard";
import { Lines } from "@/app/components/Lines";
import { galleryOf, getCar, listPublishedCars, type Car } from "@/app/lib/cars";
import { Gallery } from "@/app/components/Gallery";
import { getSettings, telHref } from "@/app/lib/settings";
import { formatNumber, formatPrice, getDict, localePath } from "@/app/lib/i18n";
import type { Lang } from "@/app/lib/dict";
import { JsonLd } from "@/app/components/JsonLd";
import { absoluteUrl, breadcrumbJsonLd, pageMetadata } from "@/app/lib/seo";

type Props = { params: Promise<{ id: string }> };

async function getPublishedCar(id: string) {
  const car = await getCar(id);
  return car?.published ? car : undefined;
}

const descriptionOf = (car: Car, lang: Lang) =>
  (lang === "en" && car.descriptionEn?.trim()) || car.description.trim();

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [{ id }, { lang, t }] = await Promise.all([params, getDict()]);
  const car = await getPublishedCar(id);
  if (!car) return {};
  const name = `${car.brand} ${car.model}`;
  const fuel = t.cars.fuel[car.fuel] ?? car.fuel;
  const details = `${car.year} · ${formatNumber(car.km, lang)} km · ${fuel} · ${formatPrice(car.price, lang)}`;
  const text = descriptionOf(car, lang);
  return pageMetadata({
    lang,
    path: `/biler/${car.id}`,
    title: `${name} ${car.year}`,
    description: `${details}. ${text || t.meta.carFallback}`.slice(0, 200),
    image: car.image,
  });
}

export default async function CarPage({ params }: Props) {
  const { id } = await params;
  const [car, all, { lang, t }, settings] = await Promise.all([getPublishedCar(id), listPublishedCars(), getDict(), getSettings()]);
  if (!car) notFound();

  const c = t.car;
  const name = `${car.brand} ${car.model}`;
  const fuel = t.cars.fuel[car.fuel] ?? car.fuel;
  const description = descriptionOf(car, lang) || c.descFallback;
  const similar = all.filter((x) => x.id !== car.id).slice(0, 3);
  const enquiryHref = `${localePath(lang, "/kontakt")}?car=${encodeURIComponent(car.id)}`;

  // Invented example details are marked with an asterisk.
  const star = car.sampleData ? "*" : "";
  const gearbox = car.gearbox && (t.cars.gearbox[car.gearbox] ?? car.gearbox) + star;
  const body = car.bodyType && (t.cars.body[car.bodyType] ?? car.bodyType) + star;
  const drive = car.drive && (t.cars.drive[car.drive] ?? car.drive) + star;
  const equipment = (lang === "en" && car.equipmentEn?.length ? car.equipmentEn : car.equipment) ?? [];

  // Rows without a value are left out, so listings with little data stay tidy.
  const specs = (
    [
      [c.brand, car.brand],
      [c.model, car.model],
      [c.body, body],
      [c.year, String(car.year)],
      [c.firstReg, car.firstRegistration && car.firstRegistration + star],
      [c.km, `${formatNumber(car.km, lang)} km`],
      [c.fuel, fuel],
      [c.gearbox, gearbox],
      [c.drive, drive],
      [c.power, car.powerHp && `${car.powerHp} ${c.hp}${star}`],
      [c.consumption, car.kmPerL && `${formatNumber(car.kmPerL, lang)} ${c.kmPerL}${star}`],
      [c.color, car.color && car.color + star],
      [c.doors, car.doors && car.doors + star],
      [c.seats, car.seats && car.seats + star],
      [c.owners, car.owners !== undefined && car.owners + star],
      [c.price, formatPrice(car.price, lang)],
    ] as [string, string | number | false | undefined][]
  ).filter((r): r is [string, string] => Boolean(r[1]));

  // Structured data so search engines can show price and mileage.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Car",
    name,
    brand: { "@type": "Brand", name: car.brand },
    model: car.model,
    vehicleModelDate: String(car.year),
    mileageFromOdometer: { "@type": "QuantitativeValue", value: car.km, unitCode: "KMT" },
    fuelType: car.fuel,
    ...(car.gearbox && { vehicleTransmission: t.cars.gearbox[car.gearbox] }),
    ...(car.color && { color: car.color }),
    url: absoluteUrl(localePath(lang, `/biler/${car.id}`)),
    inLanguage: lang,
    image: galleryOf(car).map(absoluteUrl),
    description,
    offers: {
      "@type": "Offer",
      price: car.price,
      priceCurrency: "EUR",
      url: absoluteUrl(localePath(lang, `/biler/${car.id}`)),
      itemCondition: "https://schema.org/UsedCondition",
      availability: "https://schema.org/InStock",
      seller: { "@type": "AutoDealer", name: "GD Biler", telephone: settings.phone },
    },
  };

  return (
    <div className="min-h-screen bg-background pb-20 text-foreground lg:pb-0">
      <JsonLd data={jsonLd} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: c.home, path: localePath(lang, "/") },
          { name: c.all, path: localePath(lang, "/biler") },
          { name: name, path: localePath(lang, `/biler/${car.id}`) },
        ])}
      />
      <Header />
      <main>
        {/* Title band */}
        <section className="bg-navy texture-light text-navy-foreground pt-28 pb-28 lg:pt-32 lg:pb-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-white/60">
              <a href={localePath(lang, "/")} className="hover:text-white">{c.home}</a>
              <ChevronRight size={14} />
              <a href={localePath(lang, "/biler")} className="hover:text-white">{c.all}</a>
              <ChevronRight size={14} />
              <span className="text-white">{name}</span>
            </nav>
            <div className="mt-8 animate-fade-up">
              <span className="inline-flex rounded-full glass px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-white/90">
                {car.brand}
              </span>
              <div className="mt-5 flex flex-wrap items-end justify-between gap-x-10 gap-y-3">
                <h1 className="max-w-4xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                  {car.model}
                </h1>
                <p className="text-3xl font-semibold tracking-tight lg:hidden">{formatPrice(car.price, lang)}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Image + buy panel, pulled up over the band */}
        <section className="-mt-20 lg:-mt-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
              <div className="lg:col-span-3">
                <Gallery
                  images={galleryOf(car)}
                  alt={name}
                  labels={{ photo: c.photo, of: c.of, prev: c.prev, next: c.next, close: c.close, enlarge: c.enlarge }}
                />
                {car.sampleData && car.images?.length ? (
                  <p className="mt-3 text-sm text-muted-foreground">{c.sampleNote}</p>
                ) : null}
              </div>

              <aside className="lg:col-span-2 rounded-3xl border border-border bg-card p-6 shadow-elevated lg:sticky lg:top-24">
                <span className="block text-[11px] uppercase tracking-[0.15em] text-muted-foreground">{c.price}</span>
                <span className="block text-4xl font-semibold tracking-tight">{formatPrice(car.price, lang)}</span>

                <dl className="mt-5 grid grid-cols-2 gap-2">
                  <KeyFact icon={Calendar} label={c.year} value={String(car.year)} />
                  <KeyFact icon={Gauge} label={c.km} value={`${formatNumber(car.km, lang)} km`} />
                  <KeyFact icon={Fuel} label={c.fuel} value={fuel} />
                  {gearbox && <KeyFact icon={Cog} label={c.gearbox} value={gearbox} />}
                  {car.powerHp && <KeyFact icon={Zap} label={c.power} value={`${car.powerHp} ${c.hp}${star}`} />}
                  {car.bodyType && <KeyFact icon={CarIcon} label={c.body} value={body ?? ""} />}
                </dl>

                <ul className="mt-4 flex flex-wrap gap-2">
                  {c.badges.map((b) => (
                    <li
                      key={b}
                      className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium"
                    >
                      <ShieldCheck size={13} /> {b}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-col gap-2.5">
                  <a
                    href={telHref(settings.phone)}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:scale-[1.02]"
                  >
                    <Phone size={15} /> {c.call} · {settings.phone}
                  </a>
                  <a
                    href={enquiryHref}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-semibold transition-colors hover:bg-secondary"
                  >
                    <Mail size={15} /> {c.book}
                  </a>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Details: grouped into cards so the data reads at a glance */}
        <section className="mt-10 bg-secondary texture-dark py-10 lg:py-14">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
              <div className="space-y-6 lg:col-span-3">
                <Card title={`${c.descTitle}${description !== c.descFallback ? star : ""}`}>
                  <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                    {description.split(/\n{2,}/).map((para, i) => (
                      <p key={i} className="whitespace-pre-line">{para}</p>
                    ))}
                  </div>
                  <h3 className="mt-6 text-sm font-semibold uppercase tracking-[0.12em] text-foreground/70">{c.includedTitle}</h3>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {c.included.map((item) => (
                      <li
                        key={item}
                        className="inline-flex items-center gap-1.5 rounded-full bg-navy px-3 py-1.5 text-xs font-medium text-navy-foreground"
                      >
                        <Check size={13} strokeWidth={2.5} /> {item}
                      </li>
                    ))}
                  </ul>
                </Card>

                {equipment.length > 0 && (
                  <Card title={`${c.equipmentTitle}${star}`}>
                    <ul className="grid grid-cols-1 gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
                      {equipment.map((item) => (
                        <li key={item} className="flex items-center gap-2.5 rounded-lg bg-secondary px-3 py-2">
                          <Check size={15} strokeWidth={2.5} className="shrink-0 text-muted-foreground" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                )}
              </div>

              <div className="lg:col-span-2">
                <div className="lg:sticky lg:top-24">
                  <Card title={c.specsTitle}>
                    <dl className="-mx-2 text-sm">
                      {specs.map(([label, value], i) => (
                        <div
                          key={label}
                          className={`flex justify-between gap-4 rounded-lg px-3 py-2.5 ${i % 2 === 0 ? "bg-secondary" : ""}`}
                        >
                          <dt className="text-muted-foreground">{label}</dt>
                          <dd className="text-right font-semibold">{value}</dd>
                        </div>
                      ))}
                    </dl>
                    {car.sampleData && <p className="mt-4 text-xs text-muted-foreground">{c.sampleNote}</p>}
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Similar cars */}
        {similar.length > 0 && (
          <section className="bg-background py-12 lg:py-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
              <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <h2 className="text-3xl font-semibold leading-[1.05] sm:text-4xl">{c.similar}</h2>
                <a
                  href={localePath(lang, "/biler")}
                  className="inline-flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all"
                >
                  <ArrowLeft size={16} /> {c.back}
                </a>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {similar.map((x) => (
                  <CarCard key={x.id} car={x} lang={lang} t={t} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="bg-background pb-12 lg:pb-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="flex flex-col gap-6 rounded-3xl bg-navy texture-light p-8 text-navy-foreground lg:flex-row lg:items-center lg:justify-between lg:p-12">
              <div className="max-w-xl">
                <h2 className="text-balance text-3xl font-semibold leading-[1.1] sm:text-4xl">
                  <Lines lines={c.ctaTitle} />
                </h2>
                <p className="mt-3 text-white/70 leading-relaxed">{c.ctaText}</p>
              </div>
              <a
                href={enquiryHref}
                className="inline-flex items-center gap-2 self-start rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-primary transition-all hover:scale-[1.02]"
              >
                {c.book}
              </a>
            </div>
          </div>
        </section>

        <Contact />
      </main>
      <Footer />

      {/* Mobile: price and contact buttons stay in reach while scrolling */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-border bg-background/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="min-w-0 flex-1">
          <span className="block truncate text-xs text-muted-foreground">{name}</span>
          <span className="block text-lg font-semibold leading-tight">{formatPrice(car.price, lang)}</span>
        </div>
        <a
          href={enquiryHref}
          aria-label={c.book}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border"
        >
          <Mail size={18} />
        </a>
        <a
          href={telHref(settings.phone)}
          className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground"
        >
          <Phone size={16} /> {c.callShort}
        </a>
      </div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-background p-6">
      <h2 className="mb-4 text-xl font-semibold">{title}</h2>
      {children}
    </section>
  );
}

function KeyFact({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-secondary px-3 py-2.5">
      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy text-navy-foreground">
        <Icon size={15} />
      </span>
      <div className="min-w-0">
        <dt className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground">{label}</dt>
        <dd className="truncate text-sm font-semibold">{value}</dd>
      </div>
    </div>
  );
}
