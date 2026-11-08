import type { ReactNode } from "react";
import { ArrowUpRight, Banknote, Check, MapPin, ShieldCheck, Truck, Wrench, Car, BadgeEuro, type LucideIcon } from "lucide-react";
import { Lines } from "./Lines";
import { ContactForm } from "./ContactForm";
import type { Dict, Lang } from "@/app/lib/dict";
import { localePath } from "@/app/lib/i18n";

/** Pill label + big title, the heading used by every section. */
export function SectionHead({
  label,
  title,
  text,
  dark = false,
  className = "",
}: {
  label: string;
  title: readonly string[];
  text?: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={`max-w-2xl ${className}`}>
      <span
        className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] ${
          dark ? "border-white/15 bg-white/5 text-white/70" : "border-border bg-background text-muted-foreground"
        }`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-brand" />
        {label}
      </span>
      <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.02] sm:text-5xl lg:text-6xl">
        <Lines lines={title} />
      </h2>
      {text && <p className={`mt-5 text-lg leading-relaxed ${dark ? "text-white/70" : "text-muted-foreground"}`}>{text}</p>}
    </div>
  );
}

/** Big numbers on a dark band ("3 mdr", "0 kr"). */
export function Figures({ label, title, items }: { label: string; title: readonly string[]; items: [string, string, string][] }) {
  return (
    <section className="relative overflow-hidden bg-navy texture-light py-24 text-navy-foreground lg:py-32">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-brand/20 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHead dark label={label} title={title} className="reveal" />
        <dl className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(([big, small, desc]) => (
            <div key={small} className="reveal group bg-navy p-8 transition-colors duration-500 hover:bg-white/[0.04] lg:p-10">
              <dd className="bg-gradient-to-b from-white to-white/60 bg-clip-text text-5xl font-semibold tracking-tight text-transparent transition-transform duration-500 group-hover:-translate-y-1 lg:text-6xl">
                {big}
              </dd>
              <dt className="mt-3 text-sm font-semibold uppercase tracking-[0.16em] text-white/80">{small}</dt>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{desc}</p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

const serviceIcons: Record<string, LucideIcon> = {
  "/biler": Car,
  "/finansiering": BadgeEuro,
  "/garanti": ShieldCheck,
  "/levering": Truck,
  "/saelg-din-bil": Banknote,
  "/vaerksted": Wrench,
};

/** Bento grid linking to every part of the business. */
export function ServiceBento({
  lang,
  label,
  title,
  text,
  items,
}: {
  lang: Lang;
  label: string;
  title: readonly string[];
  text: string;
  items: { title: string; desc: string; href: string }[];
}) {
  return (
    <section className="mesh py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="reveal flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHead label={label} title={title} />
          <p className="max-w-md text-lg leading-relaxed text-muted-foreground">{text}</p>
        </div>
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {items.map((s, i) => {
            const Icon = serviceIcons[s.href] ?? Car;
            const featured = i === 0;
            return (
              <a
                key={s.href}
                href={localePath(lang, s.href)}
                className={`shop-card reveal group relative flex min-h-56 flex-col justify-between overflow-hidden rounded-3xl border p-7 lg:p-8 ${
                  featured
                    ? "border-transparent bg-navy text-navy-foreground sm:col-span-2 lg:col-span-1 lg:row-span-1"
                    : "border-border bg-card hover:shadow-elevated"
                }`}
              >
                <div className="flex items-start justify-between">
                  <span
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110 ${
                      featured ? "bg-white/10" : "bg-secondary"
                    }`}
                  >
                    <Icon size={22} strokeWidth={1.75} />
                  </span>
                  <ArrowUpRight
                    size={20}
                    className="opacity-40 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100"
                  />
                </div>
                <div className="mt-10">
                  <h3 className="text-2xl font-semibold tracking-tight">{s.title}</h3>
                  <p className={`mt-2 leading-relaxed ${featured ? "text-white/70" : "text-muted-foreground"}`}>{s.desc}</p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** Local-SEO block: the towns customers come from. */
export function Areas({
  lang,
  label,
  title,
  text,
  areas,
  href = "/levering",
}: {
  lang: Lang;
  label: string;
  title: readonly string[];
  text: string;
  areas: string[];
  href?: string;
}) {
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
        <div className="reveal">
          <SectionHead label={label} title={title} text={text} />
        </div>
        <ul className="reveal flex flex-wrap gap-3">
          {areas.map((a) => (
            <li key={a}>
              <a
                href={localePath(lang, href)}
                className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:border-foreground hover:shadow-soft"
              >
                <MapPin size={15} className="text-muted-foreground transition-colors group-hover:text-brand" />
                {a}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Chat-bubble preview of how easy it is to get in touch. */
export function ChatDemo({
  lang,
  chat,
}: {
  lang: Lang;
  chat: { label: string; title: readonly string[]; text: string; bubbles: { me: boolean; text: string }[]; cta: string };
}) {
  return (
    <section className="bg-secondary py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
        <div className="reveal">
          <SectionHead label={chat.label} title={chat.title} text={chat.text} />
          <a
            href={localePath(lang, "/saelg-din-bil")}
            className="btn-sheen mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:scale-[1.02]"
          >
            {chat.cta} <ArrowUpRight size={16} />
          </a>
        </div>
        <div className="reveal mx-auto w-full max-w-md rounded-[2rem] border border-border bg-background p-5 shadow-elevated">
          <div className="mb-4 flex items-center gap-3 border-b border-border pb-4">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-navy text-sm font-semibold text-navy-foreground">GD</span>
            <div className="leading-tight">
              <span className="block text-sm font-semibold">GD Biler</span>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Horsens
              </span>
            </div>
          </div>
          <ul className="space-y-3">
            {chat.bubbles.map((b, i) => (
              <li
                key={i}
                className={`animate-fade-up flex ${b.me ? "justify-end" : "justify-start"}`}
                style={{ animationDelay: `${300 + i * 450}ms` }}
              >
                <span
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    b.me ? "rounded-br-md bg-primary text-primary-foreground" : "rounded-bl-md bg-secondary"
                  }`}
                >
                  {b.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** Numbered steps with a "01 / 04" counter, on a dark band. */
export function Steps({
  label,
  title,
  steps,
}: {
  label: string;
  title: readonly string[];
  steps: { title: string; desc: string }[];
}) {
  const total = String(steps.length).padStart(2, "0");
  return (
    <section className="bg-navy texture-light py-24 text-navy-foreground lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHead dark label={label} title={title} className="reveal" />
        <ol className={`mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 ${steps.length > 3 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
          {steps.map((s, i) => (
            <li key={s.title} className="reveal glass group rounded-3xl p-7 transition-all duration-500 hover:-translate-y-1.5 hover:bg-white/10 lg:p-8">
              <div className="flex items-center justify-between text-xs font-semibold tracking-[0.2em] text-white/50">
                <span>{String(i + 1).padStart(2, "0")}</span>
                <span>
                  {String(i + 1).padStart(2, "0")} / {total}
                </span>
              </div>
              <div className="mt-5 h-px w-full bg-white/10">
                <div className="h-px bg-brand" style={{ width: `${((i + 1) / steps.length) * 100}%` }} />
              </div>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-3 leading-relaxed text-white/70">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Cards with an icon, title and text. */
export function FeatureGrid({
  label,
  title,
  items,
  icons,
  tone = "light",
}: {
  label: string;
  title: readonly string[];
  items: { title: string; desc: string }[];
  icons: LucideIcon[];
  tone?: "light" | "muted";
}) {
  return (
    <section className={`py-24 lg:py-32 ${tone === "muted" ? "mesh" : "bg-background"}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHead label={label} title={title} className="reveal" />
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {items.map((it, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div key={it.title} className="shop-card reveal group rounded-3xl border border-border bg-card p-7 hover:shadow-elevated lg:p-8">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-navy-foreground transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                  <Icon size={21} strokeWidth={1.75} />
                </span>
                <h3 className="mt-6 text-xl font-semibold tracking-tight">{it.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{it.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** Dark call-to-action card. */
export function CtaBand({ title, children }: { title: readonly string[]; children: ReactNode }) {
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="reveal relative flex flex-col gap-8 overflow-hidden rounded-[2rem] bg-navy texture-light p-10 text-navy-foreground lg:flex-row lg:items-center lg:justify-between lg:p-16">
          <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-brand/20 blur-3xl" />
          <h2 className="relative max-w-xl text-balance text-3xl font-semibold leading-[1.1] sm:text-5xl">
            <Lines lines={title} />
          </h2>
          <div className="relative flex flex-wrap gap-3">{children}</div>
        </div>
      </div>
    </section>
  );
}

/** Contact form on a light surface, with its own heading. */
export function FormSection({
  lang,
  t,
  title,
  text,
  topic,
  id = "form",
}: {
  lang: Lang;
  t: Dict;
  title: string;
  text: string;
  topic: "buy" | "service" | "sell" | "other";
  id?: string;
}) {
  return (
    <section id={id} className="mesh scroll-mt-24 py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-5 lg:gap-14 lg:px-10">
        <div className="reveal lg:col-span-2">
          <h2 className="text-balance text-4xl font-semibold leading-[1.05] sm:text-5xl">{title}</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{text}</p>
        </div>
        <div className="reveal lg:col-span-3">
          <ContactForm lang={lang} t={t.form} defaultTopic={topic} />
        </div>
      </div>
    </section>
  );
}

/** Tick list used for short promises. */
export function Ticks({ items }: { items: string[] }) {
  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {items.map((x) => (
        <li key={x} className="flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-4">
          <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy text-navy-foreground">
            <Check size={15} strokeWidth={2.5} />
          </span>
          <span className="font-medium">{x}</span>
        </li>
      ))}
    </ul>
  );
}
