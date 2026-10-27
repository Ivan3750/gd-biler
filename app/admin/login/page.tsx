import { redirect } from "next/navigation";
import { adminConfigured, isAdmin } from "@/app/lib/auth";
import { Logo } from "@/app/components/Logo";
import { LoginForm } from "./LoginForm";

export default async function LoginPage() {
  if (await isAdmin()) redirect("/admin");

  return (
    <div className="w-full max-w-sm rounded-2xl border border-border bg-background p-8 shadow-elevated">
      <div className="text-primary">
        <Logo />
      </div>
      <h1 className="mt-6 text-2xl font-semibold tracking-tight">Log ind</h1>
      <p className="mt-1 text-sm text-muted-foreground">Administration af hjemmesiden</p>
      {adminConfigured() ? (
        <LoginForm />
      ) : (
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Admin er ikke sat op endnu. Sæt <code className="rounded bg-secondary px-1">ADMIN_PASSWORD</code> (mindst 8
          tegn) i <code className="rounded bg-secondary px-1">.env.local</code>, og genstart serveren.
        </p>
      )}
    </div>
  );
}
