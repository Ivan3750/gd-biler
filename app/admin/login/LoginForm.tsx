"use client";
import { useActionState } from "react";
import { loginAction } from "../actions";
import { btnPrimary, field } from "../ui";

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, null);

  return (
    <form action={action} className="mt-5 space-y-4">
      <label className="block text-sm font-medium">
        Adgangskode
        <input type="password" name="password" required autoFocus autoComplete="current-password" className={field} />
      </label>
      {state?.error && (
        <p role="alert" className="text-sm text-destructive">
          {state.error}
        </p>
      )}
      <button disabled={pending} className={`${btnPrimary} w-full`}>
        {pending ? "Logger ind…" : "Log ind"}
      </button>
    </form>
  );
}
