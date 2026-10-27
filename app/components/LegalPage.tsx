import type { Dict } from "@/app/lib/i18n";
import { addressLine, type Settings } from "@/app/lib/settings-shared";
import { PageHeader, Section } from "./Section";

type Doc = Dict["legal"]["privacy"];

/** Fills {company}, {cvr}, {address}, {email} and {phone} so the text always matches the settings. */
export function LegalPage({ doc, updatedLabel, settings }: { doc: Doc; updatedLabel: string; settings: Settings }) {
  const fill = (s: string) =>
    s
      .replaceAll("{company}", settings.company)
      .replaceAll("{cvr}", settings.cvr)
      .replaceAll("{address}", addressLine(settings))
      .replaceAll("{email}", settings.email)
      .replaceAll("{phone}", settings.phone);

  return (
    <>
      <PageHeader title={doc.title} lead={`${updatedLabel}: ${doc.updated}`} />
      <Section>
        <div className="max-w-3xl space-y-10">
          {doc.sections.map((s) => (
            <section key={s.h}>
              <h2 className="text-xl font-bold">{s.h}</h2>
              <div className="mt-3 space-y-3 leading-relaxed text-muted-foreground">
                {s.p.map((p) => (
                  <p key={p}>{fill(p)}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </Section>
    </>
  );
}
