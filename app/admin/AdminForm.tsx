"use client";
import { useActionState } from "react";
import { Check } from "lucide-react";
import type { SaveState } from "./site-actions";

/** A form that saves through a server action and shows "Gemt" or the error underneath. */
export function AdminForm({
  action,
  children,
  submitLabel = "Gem ændringer",
  className = "",
  footer,
}: {
  action: (state: SaveState, formData: FormData) => Promise<SaveState>;
  children: React.ReactNode;
  submitLabel?: string;
  className?: string;
  footer?: React.ReactNode;
}) {
  const [state, formAction, pending] = useActionState(action, null);

  return (
    <form action={formAction} className={className}>
      {children}
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          disabled={pending}
          className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-60"
        >
          {pending ? "Gemmer…" : submitLabel}
        </button>
        {state?.ok && !pending && (
          <span role="status" className="inline-flex items-center gap-1.5 text-sm font-medium text-green-700">
            <Check size={16} /> Gemt – ændringen er live på hjemmesiden
          </span>
        )}
        {state?.error && (
          <span role="alert" className="text-sm font-medium text-destructive">
            {state.error}
          </span>
        )}
        {footer}
      </div>
    </form>
  );
}
