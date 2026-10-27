import { MapPin, Phone, Clock, ArrowUpRight } from "lucide-react";
import { getDict } from "@/app/lib/i18n";
import { getSettings, mapsEmbedUrl, telHref } from "@/app/lib/settings";
import { Lines } from "./Lines";

export async function Contact() {
  const [{ t }, s] = await Promise.all([getDict(), getSettings()]);
  const c = t.contact;

  return (
    <section id="contact" className="bg-navy texture-light text-navy-foreground py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl mb-14">
          <span className="text-xs uppercase tracking-[0.2em] text-white/60 font-medium">
            {c.label}
          </span>
          <h2 className="mt-4 text-balance text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.02]">
            <Lines lines={c.title} />
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-2 space-y-6">
            <InfoBlock icon={MapPin} title={c.address}>
              {s.street}
              <br />
              {s.zip} {s.city}
            </InfoBlock>
            <InfoBlock icon={Phone} title={c.phone}>
              <a href={telHref(s.phone)} className="hover:underline">
                {s.phone}
              </a>
            </InfoBlock>
            <InfoBlock icon={Clock} title={c.hoursTitle}>
              <ul className="space-y-1">
                {c.hours.map(([d, h]) => (
                  <li key={d} className="flex justify-between gap-6 text-white/80">
                    <span>{d}</span>
                    <span className="text-white">{h}</span>
                  </li>
                ))}
              </ul>
            </InfoBlock>
            <a
              href={`mailto:${s.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-white text-primary px-7 py-3.5 text-sm font-semibold transition-all hover:scale-[1.02]"
            >
              {c.cta} <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="lg:col-span-3 overflow-hidden rounded-3xl border border-white/10 min-h-[400px] bg-white/5">
            <iframe
              title={c.map}
              src={mapsEmbedUrl(s)}
              className="h-full w-full min-h-[400px] grayscale-[40%] contrast-110"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoBlock({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl glass p-6">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
          <Icon size={16} strokeWidth={1.75} />
        </span>
        <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">{title}</h3>
      </div>
      <div className="mt-4 text-base leading-relaxed text-white">{children}</div>
    </div>
  );
}
