"use client";
import { useActionState } from "react";
import type { Settings } from "@/app/lib/settings-shared";
import { saveSettingsAction } from "../../actions";
import { btnPrimary, field } from "../../ui";

const DAYS = ["Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag", "Søndag"];

export function SettingsForm({ settings: s }: { settings: Settings }) {
  const [state, action, pending] = useActionState(saveSettingsAction, null);

  return (
    <form action={action} className="space-y-8">
      <Card title="Virksomhed">
        <div className="grid gap-5 sm:grid-cols-2">
          <Text name="company" label="Firmanavn" value={s.company} />
          <Text name="cvr" label="CVR" value={s.cvr} />
        </div>
      </Card>

      <Card title="Kontakt">
        <div className="grid gap-5 sm:grid-cols-2">
          <Text name="phone" label="Telefon" value={s.phone} />
          <Text name="email" label="E-mail" value={s.email} type="email" />
          <Text name="street" label="Adresse" value={s.street} />
          <div className="grid grid-cols-3 gap-4">
            <Text name="zip" label="Postnr." value={s.zip} />
            <div className="col-span-2">
              <Text name="city" label="By" value={s.city} />
            </div>
          </div>
          <Text name="facebook" label="Facebook (link, valgfri)" value={s.facebook} placeholder="https://facebook.com/…" required={false} />
          <Text name="instagram" label="Instagram (link, valgfri)" value={s.instagram} placeholder="https://instagram.com/…" required={false} />
        </div>
      </Card>

      <Card title="Åbningstider">
        <ul className="space-y-3">
          {s.hours.map((h, i) => (
            <li key={i} className="grid grid-cols-[6rem_1fr_1fr] items-center gap-3 sm:grid-cols-[8rem_8rem_8rem_auto]">
              <span className="text-sm font-medium">{DAYS[i]}</span>
              <input name={`open${i}`} type="time" defaultValue={h.open} aria-label={`${DAYS[i]} åbner`} className={`${field} !mt-0`} />
              <input name={`close${i}`} type="time" defaultValue={h.close} aria-label={`${DAYS[i]} lukker`} className={`${field} !mt-0`} />
              <label className="col-span-3 flex items-center gap-2 text-sm sm:col-span-1">
                <input type="checkbox" name={`closed${i}`} defaultChecked={h.closed} className="h-4 w-4 accent-[var(--navy)]" />
                Lukket
              </label>
            </li>
          ))}
        </ul>
      </Card>

      <Card title="Forsiden">
        <div className="grid gap-5 lg:grid-cols-2">
          <Text name="heroTitleDa" label="Overskrift (dansk)" value={s.heroTitle.da} />
          <Text name="heroTitleEn" label="Overskrift (engelsk)" value={s.heroTitle.en} />
          <Text name="heroSubtitleDa" label="Underoverskrift (dansk)" value={s.heroSubtitle.da} />
          <Text name="heroSubtitleEn" label="Underoverskrift (engelsk)" value={s.heroSubtitle.en} />
        </div>
      </Card>

      <Card title="Om os">
        <p className="mb-4 text-sm text-muted-foreground">Vises på forsiden og på siden Om os.</p>
        <div className="grid gap-5 lg:grid-cols-2">
          <label className="block text-sm font-medium">
            Dansk
            <textarea name="aboutDa" rows={7} maxLength={2000} defaultValue={s.about.da} className={field} />
          </label>
          <label className="block text-sm font-medium">
            Engelsk
            <textarea name="aboutEn" rows={7} maxLength={2000} defaultValue={s.about.en} className={field} />
          </label>
        </div>
      </Card>

      <Card title="Meddelelse øverst på siden">
        <p className="mb-4 text-sm text-muted-foreground">Fx ferielukket eller en kampagne. Lad felterne stå tomme for at skjule den.</p>
        <div className="grid gap-5 lg:grid-cols-2">
          <Text name="noticeDa" label="Dansk" value={s.notice.da} required={false} />
          <Text name="noticeEn" label="Engelsk" value={s.notice.en} required={false} />
        </div>
      </Card>

      <Card title="Priser og finansiering">
        <div className="grid gap-5 sm:grid-cols-2">
          <Text name="currency" label="Valuta (vises efter prisen)" value={s.currency} />
          <label className="text-sm font-medium">
            Standardrente i finansieringsberegneren (% om året)
            <input name="financeRate" inputMode="decimal" required defaultValue={s.financeRate} className={field} />
          </label>
        </div>
      </Card>

      {state?.error && (
        <p role="alert" className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {state.error}
        </p>
      )}
      {state?.ok && (
        <p role="status" className="rounded-lg bg-green-100 px-4 py-3 text-sm text-green-800">
          Indstillingerne er gemt.
        </p>
      )}

      <button disabled={pending} className={btnPrimary}>
        {pending ? "Gemmer…" : "Gem indstillinger"}
      </button>
    </form>
  );
}

function Text({
  name,
  label,
  value,
  type = "text",
  placeholder,
  required = true,
}: {
  name: string;
  label: string;
  value: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <input name={name} type={type} defaultValue={value} placeholder={placeholder} required={required && name !== "cvr"} className={field} />
    </label>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-border bg-background p-6 sm:p-7">
      <h2 className="mb-5 text-lg font-bold">{title}</h2>
      {children}
    </section>
  );
}
