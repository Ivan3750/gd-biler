import { ChevronDown } from "lucide-react";
import { JsonLd } from "./JsonLd";
import { SectionHead } from "./shop";

type Item = { q: string; a: string };

export function Faq({ label, title, items }: { label: string; title: readonly string[]; items: Item[] }) {
  return (
    <section className="bg-background py-20 lg:py-28">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((i) => ({
            "@type": "Question",
            name: i.q,
            acceptedAnswer: { "@type": "Answer", text: i.a },
          })),
        }}
      />
      <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-5 lg:gap-16 lg:px-10">
        <div className="reveal lg:col-span-2">
          <SectionHead label={label} title={title} />
        </div>
        <div className="space-y-3 lg:col-span-3">
          {items.map((i) => (
            <details key={i.q} className="group reveal rounded-3xl border border-border bg-secondary px-6 py-5 transition-all duration-300 open:bg-background open:shadow-soft hover:border-foreground/30">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                {i.q}
                <ChevronDown size={18} className="shrink-0 transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 leading-relaxed text-muted-foreground">{i.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
