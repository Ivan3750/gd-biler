import { Star, Quote } from "lucide-react";
import { getDict } from "@/app/lib/i18n";
import { Lines } from "./Lines";

export async function Testimonials() {
  const { t } = await getDict();
  const r = t.reviews;

  return (
    <section id="reviews" className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
              {r.label}
            </span>
            <h2 className="mt-4 text-balance text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.02]">
              <Lines lines={r.title} />
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={18} className="fill-foreground text-foreground" />
              ))}
            </div>
            <div className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{r.score}</span> · {r.count}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {r.items.map((item) => (
            <article
              key={item.name}
              className="group relative flex flex-col rounded-2xl bg-secondary p-8 lg:p-10 transition-all duration-500 hover:shadow-elevated hover:-translate-y-1"
            >
              <Quote
                size={36}
                strokeWidth={1.25}
                className="text-foreground/15 absolute top-6 right-6"
              />
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className="fill-foreground text-foreground" />
                ))}
              </div>
              <p className="mt-6 text-lg leading-relaxed text-foreground/90">“{item.text}”</p>
              <div className="mt-8 flex items-center justify-between pt-6 border-t border-border">
                <div>
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{item.city}</div>
                </div>
                <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  {item.car}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
