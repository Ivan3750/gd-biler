"use client";
import { useActionState } from "react";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import type { Dict, Lang } from "@/app/lib/i18n";
import type { LeadType } from "@/app/lib/leads";
import { submitLeadAction } from "@/app/lib/lead-actions";
import { btnPrimary, input } from "./ui";

type Props = {
  lang: Lang;
  type: LeadType;
  text: Dict["form"];
  privacyHref: string;
  carId?: string;
  defaultMessage?: string;
  messageLabel?: string;
  messagePlaceholder?: string;
  /** Values that travel with the form, e.g. the finance calculation. Names are sent as d_<key>. */
  hidden?: Record<string, string>;
  /** Extra inputs shown above the message field. */
  children?: React.ReactNode;
};

export function LeadForm({
  lang,
  type,
  text,
  privacyHref,
  carId,
  defaultMessage,
  messageLabel,
  messagePlaceholder,
  hidden,
  children,
}: Props) {
  const [state, action, pending] = useActionState(submitLeadAction, null);
  const v = (k: string, fallback = "") => state?.values?.[k] ?? fallback;
  const messageRequired = type === "contact" || type === "car";

  if (state?.ok) {
    return (
      <div role="status" className="rounded-md border border-border bg-background p-8">
        <CheckCircle2 className="text-brand" size={28} aria-hidden />
        <h3 className="mt-4 text-xl font-bold">{text.successTitle}</h3>
        <p className="mt-2 leading-relaxed text-muted-foreground">{text.successText}</p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-5 rounded-md border border-border bg-background p-6 sm:p-8">
      <input type="hidden" name="lang" value={lang} />
      <input type="hidden" name="type" value={type} />
      {carId && <input type="hidden" name="carId" value={carId} />}
      {Object.entries(hidden ?? {}).map(([k, val]) => (
        <input key={k} type="hidden" name={`d_${k}`} value={val} />
      ))}
      {/* Honeypot: hidden from people, filled in by bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-medium">
          {text.name} *
          <input name="name" required maxLength={100} autoComplete="name" defaultValue={v("name")} className={input} />
        </label>
        <label className="text-sm font-medium">
          {text.email} *
          <input name="email" type="email" required maxLength={200} autoComplete="email" defaultValue={v("email")} className={input} />
        </label>
        <label className="text-sm font-medium sm:col-span-2">
          {text.phone}
          <input name="phone" type="tel" maxLength={30} autoComplete="tel" defaultValue={v("phone")} className={input} />
        </label>
      </div>

      {children}

      <label className="block text-sm font-medium">
        {messageLabel ?? text.message} {messageRequired && "*"}
        <textarea
          name="message"
          rows={5}
          required={messageRequired}
          maxLength={3000}
          placeholder={messagePlaceholder}
          defaultValue={v("message", defaultMessage)}
          className={input}
        />
      </label>

      <label className="flex items-start gap-3 text-sm">
        <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 accent-[var(--navy)]" />
        <span>
          {text.consent}{" "}
          <Link href={privacyHref} className="underline underline-offset-2" target="_blank">
            {text.consentLink}
          </Link>
        </span>
      </label>

      {state?.error && (
        <p role="alert" className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {state.error}
        </p>
      )}

      <button disabled={pending} className={`${btnPrimary} w-full disabled:opacity-60 sm:w-auto`}>
        {pending ? text.sending : text.submit}
      </button>
    </form>
  );
}
