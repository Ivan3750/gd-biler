"use client";
import { useActionState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { sendMessageAction } from "@/app/kontakt/actions";
import type { Dict, Lang } from "@/app/lib/dict";

const field =
  "mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-base outline-none transition-colors focus:border-foreground";

export function ContactForm({
  lang,
  t,
  defaultTopic = "buy",
  carId,
  carName,
  defaultMessage = "",
  variant = "default",
}: {
  lang: Lang;
  t: Dict["form"];
  defaultTopic?: string;
  carId?: string;
  carName?: string;
  defaultMessage?: string;
  /** "sell" asks for registration number and mileage instead of a topic. */
  variant?: "default" | "sell";
}) {
  const [state, action, pending] = useActionState(sendMessageAction, null);
  const v = (k: string, fallback = "") => state?.values?.[k] ?? fallback;

  if (state?.ok) {
    return (
      <div role="status" className="rounded-2xl border border-border bg-background p-8 text-center">
        <CheckCircle2 size={36} className="mx-auto text-foreground/70" />
        <h3 className="mt-4 text-2xl font-semibold">{t.successTitle}</h3>
        <p className="mt-2 text-muted-foreground">{t.successText}</p>
        <a href="" className="mt-6 inline-block text-sm font-semibold underline underline-offset-4">
          {t.another}
        </a>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-5 rounded-2xl border border-border bg-background p-6 sm:p-8">
      <input type="hidden" name="lang" value={lang} />
      {carId && <input type="hidden" name="carId" value={carId} />}
      {variant === "sell" && <input type="hidden" name="topic" value="sell" />}
      {/* Honeypot: invisible to people, tempting to bots */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {carName && (
        <p className="rounded-xl bg-secondary px-4 py-3 text-sm">
          <span className="text-muted-foreground">{t.car}: </span>
          <span className="font-semibold">{carName}</span>
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-medium">
          {t.name}
          <input name="name" required maxLength={100} autoComplete="name" defaultValue={v("name")} className={field} />
        </label>
        {variant === "sell" ? (
          <label className="text-sm font-medium">
            {t.regNo}
            <input name="regNo" required maxLength={20} autoCapitalize="characters" defaultValue={v("regNo")} placeholder="AB 12 345" className={`${field} uppercase`} />
          </label>
        ) : (
          <label className="text-sm font-medium">
            {t.topic}
            <select name="topic" defaultValue={v("topic", defaultTopic)} className={`plain-select !rounded-xl !px-4 !py-3 !text-base ${field}`}>
              {Object.entries(t.topics).map(([k, label]) => (
                <option key={k} value={k}>{label}</option>
              ))}
            </select>
          </label>
        )}
        {variant === "sell" && (
          <label className="text-sm font-medium">
            {t.mileage}
            <input name="km" inputMode="numeric" maxLength={12} defaultValue={v("km")} placeholder="85000" className={field} />
          </label>
        )}
        <label className="text-sm font-medium">
          {t.phone}
          <input name="phone" type="tel" maxLength={40} autoComplete="tel" defaultValue={v("phone")} className={field} />
        </label>
        <label className="text-sm font-medium">
          {t.email}
          <input name="email" type="email" maxLength={120} autoComplete="email" defaultValue={v("email")} className={field} />
        </label>
      </div>

      <label className="block text-sm font-medium">
        {variant === "sell" ? `${t.sellMessage} (${t.optional})` : t.message}
        <textarea
          name="message"
          required={variant !== "sell"}
          rows={5}
          maxLength={2000}
          placeholder={t.messagePlaceholder}
          defaultValue={v("message", defaultMessage)}
          className={field}
        />
      </label>

      <label className="flex items-start gap-3 text-sm">
        <input type="checkbox" name="consent" required defaultChecked={v("consent") === "on"} className="mt-1 h-4 w-4 accent-[var(--navy)]" />
        <span>
          {t.consent} <span className="text-muted-foreground">{t.privacy}</span>
        </span>
      </label>

      {state?.error && (
        <p role="alert" className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {t.errors[state.error] ?? t.errors.server}
        </p>
      )}

      <button
        disabled={pending}
        className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:scale-[1.02] disabled:opacity-60"
      >
        <Send size={15} /> {pending ? t.sending : t.send}
      </button>
    </form>
  );
}
