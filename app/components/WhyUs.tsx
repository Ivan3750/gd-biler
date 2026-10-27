import { ShieldCheck, Banknote, Truck } from "lucide-react";
import { getDict } from "@/app/lib/i18n";
import { Lines } from "./Lines";

const icons = [ShieldCheck, Banknote, Truck];

export async function WhyUs() {
  const { t } = await getDict();

  return (
    <section id="why" className="bg-secondary texture-dark py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl mb-14">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
            {t.why.label}
          </span>
          <h2 className="mt-4 text-balance text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.02]">
            <Lines lines={t.why.title} />
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {t.why.items.map(({ title, desc }, i) => {
            const Icon = icons[i];
            return (
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
