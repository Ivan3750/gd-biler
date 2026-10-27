import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Banknote, Car, Landmark, ShieldCheck, Star, Truck } from "lucide-react";
import aboutImg from "@/app/assets/about.jpg";
import { slugify } from "@/app/lib/format";
import { bilingual, href, type Dict, type Lang } from "@/app/lib/i18n";
import { REVIEWS } from "@/app/lib/reviews";
import { addressLine, telHref, type Settings } from "@/app/lib/settings-shared";
import { CountUp } from "../CountUp";
import { Hours } from "../Hours";
import { MapEmbed } from "../MapEmbed";
import { Section, SectionHeading } from "../Section";
import { btnPrimary, btnSecondary } from "../ui";

const whyIcons = [ShieldCheck, Banknote, Truck];

export function WhyUs({ dict }: { dict: Dict }) {
  return (
    <Section tone="gray">
      <SectionHeading title={dict.home.why.title} />
      <div className="grid gap-6 md:grid-cols-3">
        {dict.home.why.items.map((item, i) => {
          const Icon = whyIcons[i];
          return (
            <div key={item.title} className="rounded-md border border-border bg-background p-7">
              <Icon size={24} strokeWidth={1.75} className="text-navy" aria-hidden />
              <h3 className="mt-5 text-xl font-bold">{item.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{item.text}</p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

export function StatsList({ dict }: { dict: Dict }) {
  return (
    <dl className="grid grid-cols-2 gap-6">
      {dict.home.stats.map((s) => (
        <div key={s.label} className="border-l-2 border-brand pl-4">
          <dt className="sr-only">{s.label}</dt>
          <dd className="text-3xl font-bold">
            <CountUp value={s.value} />
          </dd>
          <dd className="mt-1 text-sm text-muted-foreground">{s.label}</dd>
        </div>
      ))}
    </dl>
  );
}

export function AboutTeaser({ lang, dict, settings }: { lang: Lang; dict: Dict; settings: Settings }) {
  return (
    <Section>
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Image
          src={aboutImg}
          alt={dict.home.about.title}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="aspect-[5/4] w-full rounded-md border border-border object-cover"
        />
        <div>
          <SectionHeading title={dict.home.about.title} className="mb-6" />
          <p className="text-lg leading-relaxed text-muted-foreground">{bilingual(lang, settings.about)}</p>
          <div className="mt-8 border-t border-border pt-8">
            <StatsList dict={dict} />
          </div>
          <Link href={href(lang, "/om-os")} className={`${btnPrimary} mt-8`}>
            {dict.home.about.more} <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
      </div>
    </Section>
  );
}

export function Process({ dict }: { dict: Dict }) {
  return (
    <Section tone="navy">
      <SectionHeading title={dict.home.process.title} tone="navy" />
      <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {dict.home.process.steps.map((s, i) => (
          <li key={s.title} className="border-t border-white/20 pt-5">
            <span className="border-l-2 border-brand pl-3 text-sm font-bold text-white/70">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mt-4 text-xl font-bold">{s.title}</h3>
            <p className="mt-2 leading-relaxed text-white/75">{s.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function Services({ lang, dict }: { lang: Lang; dict: Dict }) {
  return (
    <Section>
      <SectionHeading title={dict.home.services.title} />
      <div className="grid gap-6 md:grid-cols-2">
        {dict.home.services.items.map((s) => (
          <div key={s.title} className="flex flex-col items-start rounded-md border border-border p-7">
            <h3 className="text-xl font-bold">{s.title}</h3>
            <p className="mb-6 mt-2 leading-relaxed text-muted-foreground">{s.text}</p>
            <Link href={href(lang, s.path)} className={`${btnSecondary} mt-auto`}>
              {s.cta} <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function Testimonials({ lang, dict }: { lang: Lang; dict: Dict }) {
  const t = dict.home.reviews;
  return (
    <Section tone="gray">
      <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <SectionHeading title={t.title} className="mb-0" />
        <p className="flex items-center gap-3 text-sm text-muted-foreground">
          <span className="flex gap-0.5" aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={16} className="fill-foreground text-foreground" />
            ))}
          </span>
          <span>
            <strong className="text-foreground">{t.rating}</strong> · {t.count}
          </span>
        </p>
      </div>
      <ReviewGrid lang={lang} />
    </Section>
  );
}


export function ReviewGrid({ lang }: { lang: Lang }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
        {REVIEWS.map((r) => (
          <figure key={r.name} className="flex flex-col rounded-md border border-border bg-background p-7">
            <blockquote className="text-lg leading-relaxed">“{r.text[lang]}”</blockquote>
            <figcaption className="mt-6 flex items-center justify-between gap-4 border-t border-border pt-4 text-sm">
              <span>
                <strong>{r.name}</strong>
                <span className="text-muted-foreground"> · {r.city}</span>
              </span>
              <span className="text-muted-foreground">{r.car}</span>
            </figcaption>
          </figure>
        ))}
      </div>
  );
}

export function VisitUs({ dict, settings }: { dict: Dict; settings: Settings }) {
  return (
    <Section>
      <SectionHeading title={dict.home.contact.title} lead={dict.home.contact.text} />
      <div className="grid gap-8 lg:grid-cols-5">
        <div className="space-y-6 lg:col-span-2">
          <div>
            <h3 className="font-bold">{dict.common.address}</h3>
            <p className="mt-2 text-muted-foreground">
              {settings.street}
              <br />
              {settings.zip} {settings.city}
            </p>
          </div>
          <div>
            <h3 className="font-bold">{dict.common.phone}</h3>
            <a href={telHref(settings.phone)} className="mt-2 block text-muted-foreground hover:text-foreground hover:underline">
              {settings.phone}
            </a>
          </div>
          <div>
            <h3 className="mb-2 font-bold">{dict.common.openHours}</h3>
            <Hours settings={settings} dict={dict} />
          </div>
        </div>
        <div className="lg:col-span-3">
          <MapEmbed address={addressLine(settings)} text={dict.map} />
        </div>
      </div>
    </Section>
  );
}

const trustIcons = [ShieldCheck, Landmark, Truck];

export function TrustStrip({ lang, dict }: { lang: Lang; dict: Dict }) {
  return (
    <Section tone="gray" className="!py-10 lg:!py-12">
      <div className="grid gap-6 md:grid-cols-3">
        {dict.trust.items.map((item, i) => {
          const Icon = trustIcons[i];
          return (
            <Link key={item.title} href={href(lang, item.path)} className="group flex gap-4 rounded-md border border-border bg-background p-5 hover:border-foreground/40">
              <Icon size={24} strokeWidth={1.75} className="mt-0.5 shrink-0 text-navy" aria-hidden />
              <span>
                <span className="block font-bold">{item.title}</span>
                <span className="mt-1 block text-muted-foreground">{item.text}</span>
              </span>
            </Link>
          );
        })}
      </div>
    </Section>
  );
}

export function Areas({ lang, dict }: { lang: Lang; dict: Dict }) {
  return (
    <Section tone="gray">
      <SectionHeading title={dict.areas.title} lead={dict.areas.text} />
      <ul className="flex flex-wrap gap-3">
        {dict.areas.list.map((c) => (
          <li key={c} className="rounded-md border border-border bg-background px-4 py-2 font-medium">
            {c}
          </li>
        ))}
      </ul>
      <Link href={href(lang, "/bilforhandler-horsens")} className={`${btnSecondary} mt-8`}>
        {dict.areas.link} <ArrowRight size={16} aria-hidden />
      </Link>
    </Section>
  );
}

export function CategoryChips({ lang, dict, bodies, fuels }: { lang: Lang; dict: Dict; bodies: string[]; fuels: string[] }) {
  const chip = "rounded-md border border-border px-3 py-1.5 text-sm font-medium hover:bg-secondary";
  if (bodies.length + fuels.length === 0) return null;
  return (
    <div className="mb-8 flex flex-wrap gap-2" aria-label={dict.category.browse}>
      {bodies.map((b) => (
        <Link key={b} href={href(lang, `/biler/type/${slugify(b)}`)} className={chip}>
          {dict.body[b]}
        </Link>
      ))}
      {fuels.map((f) => (
        <Link key={f} href={href(lang, `/biler/braendstof/${slugify(f)}`)} className={chip}>
          {dict.fuel[f]}
        </Link>
      ))}
    </div>
  );
}

export function BrandChips({ lang, brands, label }: { lang: Lang; brands: string[]; label: string }) {
  if (brands.length === 0) return null;
  return (
    <div className="mb-8 flex flex-wrap items-center gap-2" aria-label={label}>
      <Car size={16} className="text-muted-foreground" aria-hidden />
      {brands.map((b) => (
        <Link key={b} href={href(lang, `/biler/maerke/${slugify(b)}`)} className="rounded-md border border-border px-3 py-1.5 text-sm font-medium hover:bg-secondary">
          {b}
        </Link>
      ))}
    </div>
  );
}
