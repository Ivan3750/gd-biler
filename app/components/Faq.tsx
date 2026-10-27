import { JsonLd } from "./JsonLd";

export type QA = { q: string; a: string };

/** Accordion plus FAQPage data, so the same text serves visitors, search engines and AI assistants. */
export function Faq({ items, tone = "white", schema = true }: { items: QA[]; tone?: "white" | "gray"; schema?: boolean }) {
  return (
    <>
      <div className={`divide-y divide-border border-y border-border ${tone === "gray" ? "bg-background" : ""}`}>
        {items.map((f) => (
          <details key={f.q} className="group px-4 py-4 sm:px-5">
            <summary className="flex cursor-pointer items-center justify-between gap-4 py-1 text-[17px] font-bold">
              {f.q}
              <span aria-hidden className="shrink-0 text-xl text-muted-foreground transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="pb-2 pt-3 text-lg leading-relaxed text-muted-foreground">{f.a}</p>
          </details>
        ))}
      </div>
      {schema && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          }}
        />
      )}
    </>
  );
}
