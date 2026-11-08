"use client";
import { useActionState } from "react";
import { BellRing, CheckCircle2 } from "lucide-react";
import { subscribeAction } from "@/app/kontakt/subscribe";
import type { Lang } from "@/app/lib/dict";
import type { FilterText } from "@/app/lib/filter-text";

/** E-mail sign-up for news about new cars. `search` is the car search to remember, if any. */
export function NewsletterForm({ lang, text, search }: { lang: Lang; text: FilterText["nl"]; search?: string }) {
  const [state, action, pending] = useActionState(subscribeAction, null);

  if (state?.ok) {
    return (
      <div role="status" className="flex items-start gap-4 rounded-2xl bg-white/10 p-6">
        <CheckCircle2 size={28} className="mt-0.5 shrink-0 text-white" />
        <div>
          <h3 className="text-xl font-semibold">{text.successTitle}</h3>
          <p className="mt-1 text-white/75">
            {text.successText}
            {search ? ` ${text.saved}` : ""}
          </p>
        </div>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-3">
      <input type="hidden" name="lang" value={lang} />
      {search && <input type="hidden" name="search" value={search} />}
      {/* Honeypot: invisible to people, tempting to bots */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <label className="flex-1">
          <span className="sr-only">{text.email}</span>
          <input
            type="email"
            name="email"
            required
            defaultValue={state?.email ?? ""}
            autoComplete="email"
            placeholder={text.email}
            className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3.5 text-base text-white outline-none placeholder:text-white/50 focus:border-white"
          />
        </label>
        <button
          disabled={pending}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-primary transition-colors hover:bg-white/90 disabled:opacity-60"
        >
          <BellRing size={16} /> {text.button}
        </button>
      </div>
      <label className="flex items-start gap-2.5 text-sm text-white/70">
        <input type="checkbox" name="consent" className="mt-0.5 h-4 w-4 shrink-0 accent-white" />
        <span>{text.consent}</span>
      </label>
      {state?.error && (
        <p role="alert" className="text-sm font-medium text-red-300">
          {text.errors[state.error] ?? text.errors.server}
        </p>
      )}
    </form>
  );
}
