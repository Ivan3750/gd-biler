import { ShieldCheck, Banknote, Truck } from "lucide-react";

const items = [
  {
    icon: ShieldCheck,
    title: "Gennemgåede brugte biler",
    desc: "Alle biler er grundigt tjekket, så du får en pålidelig brugt bil uden ubehagelige overraskelser.",
  },
  {
    icon: Banknote,
    title: "Ærlige priser",
    desc: "Vi sælger brugte biler til fair og gennemsigtige priser – uden skjulte gebyrer eller ekstraomkostninger.",
  },
  {
    icon: Truck,
    title: "Klar til kørsel",
    desc: "Bilene er klargjort og serviceret, så du kan sætte dig bag rattet og køre videre med det samme.",
  },
];

export function WhyUs() {
  return (
    <section id="why" className="bg-secondary py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl mb-14">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
            Hvorfor vælge os
          </span>
          <h2 className="mt-4 text-balance text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.02]">
            Tryghed, kvalitet
            <br /> og service.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {items.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group rounded-2xl bg-background p-8 lg:p-10 border border-border transition-all duration-500 hover:shadow-elevated hover:-translate-y-1"
            >
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-navy text-navy-foreground transition-transform group-hover:scale-110 group-hover:rotate-[-4deg]">
                <Icon size={22} strokeWidth={1.75} />
              </div>
              <h3 className="mt-8 text-2xl font-semibold tracking-tight">{title}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
