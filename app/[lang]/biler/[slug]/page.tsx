import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, Phone, ShieldCheck } from "lucide-react";
import { Breadcrumbs } from "@/app/components/Breadcrumbs";
import { CarGrid, StatusBadge } from "@/app/components/CarCard";
import { CopyLink } from "@/app/components/CopyLink";
import { JsonLd } from "@/app/components/JsonLd";
import { Gallery } from "@/app/components/Gallery";
import { LeadForm } from "@/app/components/LeadForm";
import { Section } from "@/app/components/Section";
import { btnPrimary, btnSecondary, container } from "@/app/components/ui";
import { carPath, carTitle, getCarBySlug, listPublicCars } from "@/app/lib/cars";
import { formatNumber, formatPrice, slugify } from "@/app/lib/format";
import { getDict, href } from "@/app/lib/i18n";
import { resolveLang } from "@/app/lib/i18n/server";
import { getSettings, telHref } from "@/app/lib/settings";
import { pageMetadata, SITE_URL } from "@/app/lib/site";

async function load(params: PageProps<"/[lang]/biler/[slug]">["params"]) {
  const { slug } = await params;
  const car = await getCarBySlug(slug);
  // Hidden cars stay hidden for visitors; sold ones keep their page so old links still work.
  if (!car || !car.published) notFound();
  return car;
}

export async function generateMetadata({ params }: PageProps<"/[lang]/biler/[slug]">): Promise<Metadata> {
  const lang = await resolveLang(params);
  const car = await load(params);
  const dict = getDict(lang);
  const settings = await getSettings();
  const title = `${carTitle(car)} ${car.year}`;
  const description = `${title} – ${formatNumber(car.km, lang)} km, ${dict.fuel[car.fuel]}, ${formatPrice(car.price, settings.currency, lang)}. GD Biler, Horsens.`;
  return {
    ...pageMetadata(lang, carPath(car), title, description, car.images[0]),
    ...(car.status === "sold" ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function CarPage({ params }: PageProps<"/[lang]/biler/[slug]">) {
  const lang = await resolveLang(params);
  const car = await load(params);
  const dict = getDict(lang);
  const t = dict.car;
  const settings = await getSettings();
  const cur = settings.currency;
  const title = carTitle(car);
  const description = (lang === "en" && car.descriptionEn) || car.description;

  const specs: [string, string | undefined][] = [
    [t.year, String(car.year)],
    [t.km, `${formatNumber(car.km, lang)} km`],
    [t.fuel, dict.fuel[car.fuel]],
    [t.gearbox, car.gearbox && dict.gearbox[car.gearbox]],
    [t.body, car.body && dict.body[car.body]],
    [t.color, car.color],
    [t.hp, car.hp ? `${car.hp} ${dict.common.hp}` : undefined],
  ];

  const features = ((lang === "en" && car.featuresEn) || car.features)
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  const similar = (await listPublicCars())
    .filter((c) => c.id !== car.id)
    .sort((a, b) => Number(b.brand === car.brand) - Number(a.brand === car.brand) || Math.abs(a.price - car.price) - Math.abs(b.price - car.price))
    .slice(0, 3);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Car",
    name: `${title} ${car.year}`,
    brand: { "@type": "Brand", name: car.brand },
    model: car.model,
    vehicleModelDate: String(car.year),
    mileageFromOdometer: { "@type": "QuantitativeValue", value: car.km, unitCode: "KMT" },
    fuelType: dict.fuel[car.fuel],
    ...(car.images[0] ? { image: car.images.map((i) => `${SITE_URL}${i}`) } : {}),
    offers: {
      "@type": "Offer",
      price: car.price,
      priceCurrency: cur === "€" ? "EUR" : cur === "kr." ? "DKK" : undefined,
      availability: car.status === "sold" ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
      url: `${SITE_URL}${href(lang, carPath(car))}`,
    },
  };

  return (
    <>
      <div className="border-b border-border bg-secondary">
        <div className={`${container} py-4`}>
          <Breadcrumbs
            lang={lang}
            home={dict.common.home}
            items={[
              { name: dict.crumbs.cars, path: "/biler" },
              { name: car.brand, path: `/biler/maerke/${slugify(car.brand)}` },
              { name: `${title} ${car.year}` },
            ]}
          />
        </div>
      </div>

      <Section>
        {car.status !== "available" && (
          <div className="mb-8 rounded-md border border-border border-l-brand bg-secondary p-5 [border-left-width:3px]" role="status">
            <p className="font-bold">{car.status === "sold" ? t.soldTitle : t.reservedTitle}</p>
            <p className="mt-1 text-muted-foreground">{car.status === "sold" ? t.soldText : t.reservedText}</p>
          </div>
        )}

        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <Gallery
              images={car.images}
              alt={title}
              text={t.gallery}
              badge={<StatusBadge status={car.status} label={dict.status[car.status]} />}
            />
          </div>

          <aside className="lg:col-span-2">
            <p className="text-muted-foreground">{car.brand}</p>
            <h1 className="mt-1 text-3xl font-bold">{car.model}</h1>
            <p className="mt-5 border-l-2 border-brand pl-3 text-4xl font-bold">{formatPrice(car.price, cur, lang)}</p>

            <dl className="mt-8 divide-y divide-border border-y border-border">
              {specs
                .filter((s): s is [string, string] => !!s[1])
                .map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 py-3">
                    <dt className="text-muted-foreground">{k}</dt>
                    <dd className="text-right font-semibold">{v}</dd>
                  </div>
                ))}
            </dl>

            <div className="mt-6 flex flex-wrap gap-3">
              <a href={telHref(settings.phone)} className={btnPrimary}>
                <Phone size={16} aria-hidden /> {settings.phone}
              </a>
              {car.status !== "sold" && (
                <Link href={`${href(lang, "/finansiering")}?price=${car.price}`} className={btnSecondary}>
                  {t.financing}
                </Link>
              )}
            </div>
          </aside>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-5">
          <div className="space-y-10 lg:col-span-3">
            <div>
              <h2 className="text-2xl font-bold">{t.description}</h2>
              <p className="mt-4 whitespace-pre-line text-lg leading-relaxed text-muted-foreground">{description || t.noDescription}</p>
            </div>

            {features.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold">{dict.carExtra.features}</h2>
                <ul className="mt-4 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                  {features.map((f) => (
                    <li key={f} className="flex gap-2.5">
                      <Check size={18} className="mt-1 shrink-0 text-navy" aria-hidden />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="rounded-md border border-border p-6">
              <h2 className="flex items-center gap-2 text-xl font-bold">
                <ShieldCheck size={22} className="text-navy" aria-hidden /> {dict.carExtra.safe}
              </h2>
              <ul className="mt-4 space-y-3">
                {dict.trust.items.map((i) => (
                  <li key={i.title}>
                    <Link href={href(lang, i.path)} className="font-semibold underline-offset-2 hover:underline">
                      {i.title}
                    </Link>
                    <span className="text-muted-foreground"> – {i.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold">{dict.carExtra.next}</h2>
              <ol className="mt-4 space-y-3">
                {dict.carExtra.nextSteps.map((s, i) => (
                  <li key={s} className="flex gap-3">
                    <span className="border-l-2 border-brand pl-3 font-bold text-muted-foreground">{i + 1}</span>
                    {s}
                  </li>
                ))}
              </ol>
              <div className="mt-6">
                <CopyLink label={dict.carExtra.copy} done={dict.carExtra.copied} />
              </div>
            </div>
          </div>

          {car.status !== "sold" && (
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold">{t.interested}</h2>
              <p className="mb-5 mt-2 leading-relaxed text-muted-foreground">{t.interestedText}</p>
              <LeadForm
                lang={lang}
                type="car"
                text={dict.form}
                privacyHref={href(lang, "/privatlivspolitik")}
                carId={car.id}
                defaultMessage={t.messagePlaceholder(`${title} (${car.year})`)}
              />
            </div>
          )}
        </div>
      </Section>

      {similar.length > 0 && (
        <Section tone="gray">
          <h2 className="mb-8 text-2xl font-bold sm:text-3xl">{t.similar}</h2>
          <CarGrid cars={similar} lang={lang} dict={dict} currency={cur} />
        </Section>
      )}

      <JsonLd data={structuredData} />
    </>
  );
}
