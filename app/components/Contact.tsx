import { MapPin, Phone, Clock, ArrowUpRight } from "lucide-react";

const hours = [
  ["Mandag – Fredag", "09:00 – 17:00"],
  ["Lørdag", "9:00 – 17:00"],
  ["Søndag", "9:00 – 17:00"],
];

export function Contact() {
  return (
    <section id="contact" className="bg-navy text-navy-foreground py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl mb-14">
          <span className="text-xs uppercase tracking-[0.2em] text-white/60 font-medium">
            Kontakt
          </span>
          <h2 className="mt-4 text-balance text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.02]">
            Kom forbi
            <br /> showroom.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-2 space-y-6">
            <InfoBlock icon={MapPin} title="Adresse">
              Langmarksvej 36A
              <br />
              8700 Horsens
            </InfoBlock>
            <InfoBlock icon={Phone} title="Telefon">
              <a href="tel:+4550237115" className="hover:underline">
                +45 50 23 71 15
              </a>
            </InfoBlock>
            <InfoBlock icon={Clock} title="Åbningstider">
              <ul className="space-y-1">
                {hours.map(([d, t]) => (
                  <li key={d} className="flex justify-between gap-6 text-white/80">
                    <span>{d}</span>
                    <span className="text-white">{t}</span>
                  </li>
                ))}
              </ul>
            </InfoBlock>
            <a
              href="mailto:kontakt@gdbiler.dk"
              className="inline-flex items-center gap-2 rounded-full bg-white text-primary px-7 py-3.5 text-sm font-semibold transition-all hover:scale-[1.02]"
            >
              Kontakt os <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="lg:col-span-3 overflow-hidden rounded-3xl border border-white/10 min-h-[400px] bg-white/5">
            <iframe
              title="GD Biler kort"
              src="https://www.google.com/maps?q=Langmarksvej+36A,+8700+Horsens&output=embed"
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
