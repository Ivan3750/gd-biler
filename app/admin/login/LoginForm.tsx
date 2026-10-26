"use client";
import { useActionState } from "react";
import { loginAction } from "../actions";

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, null);

  return (
    <form action={action} className="mt-5 space-y-4">
      <label className="block text-sm font-medium">
        Adgangskode
        <input
          type="password"
          name="password"
          required
          autoFocus
          autoComplete="current-password"
          className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-base outline-none focus:border-foreground"
        />
      </label>
      {state?.error && <p className="text-sm text-destructive">{state.error}</p>}
      <button
        disabled={pending}
        className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-60"
      >
        {pending ? "Logger ind…" : "Log ind"}
      </button>
    </form>
  );
}
