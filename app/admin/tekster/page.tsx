import { requireAdmin } from "@/app/lib/auth";
import { SECTION_LABELS, dict, flatten, loadOverrides } from "@/app/lib/content";
import { AdminForm } from "../AdminForm";
import { PageHeader } from "../PageHeader";
import { resetContentAction, saveContentAction } from "../site-actions";

type Props = { searchParams: Promise<{ section?: string }> };

/** "why.items.1.title" → "items › 2 › title" (arrays are shown 1-based). */
const humanize = (path: string, section: string) =>
  path
    .slice(section.length + 1)
    .split(".")
    .map((p) => (/^\d+$/.test(p) ? String(Number(p) + 1) : p))
    .join(" › ");

export default async function ContentPage({ searchParams }: Props) {
  await requireAdmin();
  const { section: requested } = await searchParams;
  const sections = Object.keys(dict.da).filter((k) => k in SECTION_LABELS);
  const section = requested && sections.includes(requested) ? requested : sections[0];

  const overrides = await loadOverrides();
  const da = flatten(dict.da[section as keyof typeof dict.da], section);
  const en = new Map(flatten(dict.en[section as keyof typeof dict.en], section));
  const changed = (path: string) => path in overrides.da || path in overrides.en;
  const changedCount = da.filter(([path]) => changed(path)).length;

  const rows = (value: string) => Math.min(8, Math.max(1, Math.ceil(value.length / 60)));
  const area =
    "mt-1 w-full resize-y rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-foreground";

  return (
    <>
      <PageHeader title="Tekster" subtitle="Ret alle tekster på hjemmesiden – på dansk og engelsk." />

      <nav className="mb-6 flex flex-wrap gap-2">
        {sections.map((s) => (
          <a
            key={s}
            href={`/admin/tekster?section=${s}`}
            aria-current={s === section ? "page" : undefined}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              s === section ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:bg-background/60"
            }`}
          >
            {SECTION_LABELS[s]}
          </a>
        ))}
      </nav>

      <section className="rounded-xl border border-border bg-background p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">
            {SECTION_LABELS[section]}{" "}
            <span className="text-sm font-normal text-muted-foreground">
              ({da.length} tekster{changedCount > 0 ? `, ${changedCount} ændret` : ""})
            </span>
          </h2>
          {changedCount > 0 && (
            <form action={resetContentAction}>
              <input type="hidden" name="section" value={section} />
              <button className="text-sm font-medium text-destructive hover:underline">Nulstil afsnittet til standard</button>
            </form>
          )}
        </div>

        <AdminForm action={saveContentAction} key={section}>
          <input type="hidden" name="section" value={section} />
          <div className="mb-3 hidden grid-cols-2 gap-4 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground sm:grid">
            <span>Dansk</span>
            <span>English</span>
          </div>
          <div className="space-y-5">
            {da.map(([path, daValue]) => {
              const enValue = en.get(path) ?? "";
              return (
                <div key={path} className="rounded-lg border border-border p-4">
                  <p className="flex items-center gap-2 text-xs text-muted-foreground">
                    {humanize(path, section)}
                    {changed(path) && <span className="rounded-full bg-secondary px-2 py-0.5 font-medium text-foreground">Ændret</span>}
                  </p>
                  <div className="mt-2 grid gap-4 sm:grid-cols-2">
                    <label>
                      <span className="text-xs font-semibold text-muted-foreground sm:hidden">Dansk</span>
                      <textarea
                        name={`da|${path}`}
                        rows={rows(overrides.da[path] ?? daValue)}
                        defaultValue={overrides.da[path] ?? daValue}
                        className={area}
                      />
                    </label>
                    <label>
                      <span className="text-xs font-semibold text-muted-foreground sm:hidden">English</span>
                      <textarea
                        name={`en|${path}`}
                        rows={rows(overrides.en[path] ?? enValue)}
                        defaultValue={overrides.en[path] ?? enValue}
                        className={area}
                      />
                    </label>
                  </div>
                </div>
              );
            })}
          </div>
        </AdminForm>
      </section>
    </>
  );
}
