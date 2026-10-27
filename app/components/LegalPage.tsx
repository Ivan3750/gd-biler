import type { Dict } from "@/app/lib/i18n";
import type { Settings } from "@/app/lib/settings-shared";
import { fillTokens } from "@/app/lib/text";
import { PageHeader, Section } from "./Section";

type Doc = Dict["legal"]["privacy"];

/** Fills {company}, {cvr}, {address}, {email} and {phone} so the text always matches the settings. */
export function LegalPage({
  doc,
  updatedLabel,
  settings,
  crumbs,
}: {
  doc: Doc;
  updatedLabel: string;
  settings: Settings;
  crumbs?: React.ReactNode;
}) {
  const fill = fillTokens(settings);

  return (
    <>
      <PageHeader title={doc.title} lead={`${updatedLabel}: ${doc.updated}`}>
        {crumbs}
      </PageHeader>
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
