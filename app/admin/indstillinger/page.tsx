import { requireAdmin } from "@/app/lib/auth";
import { getSettings } from "@/app/lib/settings";
import { AdminForm } from "../AdminForm";
import { PageHeader } from "../PageHeader";
import { saveSettingsAction } from "../site-actions";

const input =
  "mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-base outline-none focus:border-foreground";

export default async function SettingsPage() {
  await requireAdmin();
  const s = await getSettings();

  return (
    <>
      <PageHeader
        title="Indstillinger"
        subtitle="Kontaktoplysninger, der vises i hele siden: menu, sidefod, kontaktblok, kort og søgemaskiner."
      />

      <section className="rounded-xl border border-border bg-background p-6 sm:p-8">
        <AdminForm action={saveSettingsAction}>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-medium">
              Telefon
              <input name="phone" required defaultValue={s.phone} className={input} />
            </label>
            <label className="text-sm font-medium">
              E-mail
              <input name="email" type="email" required defaultValue={s.email} className={input} />
            </label>
            <label className="text-sm font-medium">
              Adresse
              <input name="street" required defaultValue={s.street} className={input} />
            </label>
            <div className="grid grid-cols-3 gap-3">
              <label className="text-sm font-medium">
                Postnr.
                <input name="zip" required defaultValue={s.zip} className={input} />
              </label>
              <label className="col-span-2 text-sm font-medium">
                By
                <input name="city" required defaultValue={s.city} className={input} />
              </label>
            </div>
            <label className="text-sm font-medium">
              Firmanavn
              <input name="legalName" required defaultValue={s.legalName} className={input} />
            </label>
            <label className="text-sm font-medium">
              CVR
              <input name="cvr" required defaultValue={s.cvr} className={input} />
            </label>
          </div>
          <p className="mt-5 text-sm text-muted-foreground">
            Åbningstider og alle andre tekster rettes under <a href="/admin/tekster?section=contact" className="underline">Tekster</a>.
          </p>
        </AdminForm>
      </section>
    </>
  );
}
