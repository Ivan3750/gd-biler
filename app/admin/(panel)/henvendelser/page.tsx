import Link from "next/link";
import { requireAdmin } from "@/app/lib/auth";
import { formatDate } from "@/app/lib/format";
import { LEAD_TYPES, listLeads, type LeadType } from "@/app/lib/leads";
import { deleteLeadAction, setLeadStatusAction } from "../../actions";
import { ConfirmButton } from "../../ConfirmButton";
import { badge, btnGhost, card, field } from "../../ui";
import { LEAD_LABEL } from "./labels";

export const metadata = { title: "Henvendelser" };

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

export default async function LeadsPage({ searchParams }: PageProps<"/admin/henvendelser">) {
  await requireAdmin();
  const sp = await searchParams;
  const status = one(sp.status) || "new";
  const type = LEAD_TYPES.find((t) => t === one(sp.type)) as LeadType | undefined;

  const all = await listLeads();
  const leads = all.filter((l) => (status === "all" || l.status === status) && (!type || l.type === type));
  const newCount = all.filter((l) => l.status === "new").length;

  const tabs = [
    ["new", `Nye (${newCount})`],
    ["handled", "Behandlet"],
    ["all", "Alle"],
  ] as const;

  return (
    <>
      <h1 className="mb-6 text-2xl font-bold">Henvendelser</h1>

      <form className={`${card} mb-5 flex flex-wrap items-end gap-3 p-4`}>
        <label className="text-sm font-medium">
          Status
          <select name="status" defaultValue={status} className={field}>
            {tabs.map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium">
          Type
          <select name="type" defaultValue={type ?? ""} className={field}>
            <option value="">Alle</option>
            {LEAD_TYPES.map((t) => (
              <option key={t} value={t}>
                {LEAD_LABEL[t]}
              </option>
            ))}
          </select>
        </label>
        <button className={btnGhost}>Vis</button>
      </form>

      {leads.length === 0 ? (
        <p className={`${card} p-10 text-center text-muted-foreground`}>
          {status === "new" ? "Ingen nye henvendelser. Godt gået!" : "Ingen henvendelser at vise."}
        </p>
      ) : (
        <ul className="space-y-4">
          {leads.map((l) => (
            <li key={l.id} id={l.id} className={`${card} scroll-mt-6 p-5 sm:p-6 ${l.status === "new" ? "border-l-4 border-l-brand" : ""}`}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold">{l.name}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {formatDate(l.createdAt)} · {l.lang === "en" ? "Engelsk" : "Dansk"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className={`${badge} bg-secondary`}>{LEAD_LABEL[l.type]}</span>
                  <span className={`${badge} ${l.status === "new" ? "bg-brand/25" : "bg-green-100 text-green-800"}`}>
                    {l.status === "new" ? "Ny" : "Behandlet"}
                  </span>
                </div>
              </div>

              <p className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm">
                <a href={`mailto:${l.email}?subject=${encodeURIComponent("Din henvendelse hos GD Biler")}`} className="font-medium hover:underline">
                  {l.email}
                </a>
                {l.phone && (
                  <a href={`tel:${l.phone.replace(/[^+\d]/g, "")}`} className="font-medium hover:underline">
                    {l.phone}
                  </a>
                )}
              </p>

              {l.carTitle && (
                <p className="mt-3 text-sm">
                  Bil: <strong>{l.carTitle}</strong>
                  {l.carId && (
                    <>
                      {" "}
                      · <Link href={`/admin/biler/${l.carId}`} className="underline">Åbn annonce</Link>
                    </>
                  )}
                </p>
              )}

              {l.details && (
                <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 rounded-lg bg-secondary p-4 text-sm sm:grid-cols-3">
                  {Object.entries(l.details).map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-muted-foreground">{k}</dt>
                      <dd className="font-semibold">{v}</dd>
                    </div>
                  ))}
                </dl>
              )}

              {l.message && <p className="mt-4 whitespace-pre-line leading-relaxed">{l.message}</p>}

              <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-border pt-4 text-sm">
                <form action={setLeadStatusAction}>
                  <input type="hidden" name="id" value={l.id} />
                  <input type="hidden" name="status" value={l.status === "new" ? "handled" : "new"} />
                  <button className="font-medium hover:underline">{l.status === "new" ? "Markér som behandlet" : "Markér som ny"}</button>
                </form>
                <form action={deleteLeadAction}>
                  <input type="hidden" name="id" value={l.id} />
                  <ConfirmButton message={`Slet henvendelsen fra ${l.name}? Det kan ikke fortrydes.`} className="text-destructive hover:underline">
                    Slet
                  </ConfirmButton>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
