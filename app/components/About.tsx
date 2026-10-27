import { ArrowUpRight } from "lucide-react";
import { getImages } from "@/app/lib/images";
import { getDict, localePath } from "@/app/lib/i18n";
import { Lines } from "./Lines";

export async function About() {
  const [{ lang, t }, images] = await Promise.all([getDict(), getImages()]);
  const a = t.about;

  return (
    <section id="about" className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative">
            <div className="overflow-hidden rounded-3xl">
              <img
                src={images.about}
                alt={a.imgAlt}
                width={1280}
                height={960}
                loading="lazy"
                className="h-full w-full object-cover aspect-[5/4]"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden sm:flex flex-col rounded-2xl bg-navy text-navy-foreground p-6 shadow-elevated w-48">
              <span className="text-4xl font-semibold">3+</span>
              <span className="text-sm text-white/70 mt-1">{a.years}</span>
            </div>
          </div>

          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
              {a.label}
            </span>
            <h2 className="mt-4 text-balance text-4xl sm:text-5xl font-semibold leading-[1.05]">
              <Lines lines={a.title} />
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{a.text}</p>
            <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-border pt-8">
              {a.stats.map(([value, label]) => (
                <Stat key={label} value={value} label={label} />
              ))}
            </dl>

            <a
              href={localePath(lang, "/om-os")}
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 text-sm font-semibold transition-all hover:scale-[1.02]"
            >
              {t.nav.about} <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt className="text-3xl font-semibold tracking-tight">{value}</dt>
      <dd className="mt-1 text-sm text-muted-foreground">{label}</dd>
    </div>
  );
}
