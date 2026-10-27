"use client";
import { useActionState } from "react";
import { loginAction } from "../actions";

const input =
  "mt-1.5 w-full rounded-lg border border-input bg-background px-3.5 py-3 text-base outline-none focus:border-foreground";

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, null);

  return (
    <form action={action} className="mt-6 space-y-4">
      <label className="block text-sm font-medium">
        Brugernavn
        <input name="username" required autoFocus autoComplete="username" className={input} />
      </label>
      <label className="block text-sm font-medium">
        Adgangskode
        <input type="password" name="password" required autoComplete="current-password" className={input} />
      </label>
      {state?.error && (
        <p role="alert" className="rounded-lg bg-destructive/10 px-3.5 py-2.5 text-sm text-destructive">
          {state.error}
        </p>
      )}
      <button
        disabled={pending}
        className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60"
      >
        {pending ? "Logger ind…" : "Log ind"}
      </button>
    </form>
  );
}
