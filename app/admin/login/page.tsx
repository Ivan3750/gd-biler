import { redirect } from "next/navigation";
import { adminConfigured, isAdmin } from "@/app/lib/auth";
import { LoginForm } from "./LoginForm";

export default async function LoginPage() {
  if (await isAdmin()) redirect("/admin");

  return (
    <div className="mx-auto max-w-sm rounded-xl border border-border bg-background p-8">
      <h1 className="text-xl font-semibold">Log ind</h1>
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
