import { requireAdmin } from "@/app/lib/auth";
import { listSubscribers } from "@/app/lib/subscribers";
import { deleteSubscriberAction } from "@/app/admin/actions";
import { ConfirmButton } from "@/app/admin/ConfirmButton";

export default async function SubscribersPage() {
  await requireAdmin();
  const subs = await listSubscribers();

  return (
    <>
      <h1 className="mb-6 text-2xl font-semibold">Abonnenter ({subs.length})</h1>
      {subs.length === 0 ? (
        <p className="rounded-xl border border-border bg-background p-10 text-center text-muted-foreground">
          Der er ingen tilmeldinger endnu.
        </p>
      ) : (
        <>
          <div className="mb-6 rounded-xl border border-border bg-background p-5">
            <label htmlFor="all-emails" className="text-sm font-medium">
              Alle e-mailadresser (kopiér og indsæt i dit mailprogram)
            </label>
            <textarea
              id="all-emails"
              readOnly
              rows={3}
              defaultValue={subs.map((s) => s.email).join(", ")}
              className="mt-2 w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm"
            />
          </div>
          <ul className="space-y-3">
            {subs.map((s) => (
              <li key={s.id} className="flex flex-wrap items-center gap-x-4 gap-y-1 rounded-xl border border-border bg-background p-4">
                <a href={`mailto:${s.email}`} className="font-semibold hover:underline">{s.email}</a>
                {s.search && (
                  <a href={`/biler?${s.search}`} target="_blank" className="rounded-full bg-secondary px-2.5 py-0.5 text-xs hover:underline">
                    Gemt søgning: {s.search}
                  </a>
                )}
                <span className="ml-auto text-xs text-muted-foreground">
                  {new Date(s.createdAt).toLocaleString("da-DK")} · {s.lang.toUpperCase()}
                </span>
                <form action={deleteSubscriberAction}>
                  <input type="hidden" name="id" value={s.id} />
                  <ConfirmButton message="Fjern denne abonnent?" className="text-sm font-medium text-destructive hover:underline">
                    Fjern
                  </ConfirmButton>
                </form>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
