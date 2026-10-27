import Link from "next/link";
import { redirect } from "next/navigation";
import { adminConfigured, isAdmin } from "@/app/lib/auth";
import { Logo } from "@/app/components/Logo";
import { LoginForm } from "./LoginForm";

export default async function LoginPage() {
  if (await isAdmin()) redirect("/admin");

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex justify-center">
          <Logo />
        </div>
        <div className="rounded-xl border border-border bg-background p-8">
          <h1 className="text-xl font-bold">Log ind</h1>
          {adminConfigured() ? (
            <LoginForm />
          ) : (
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Admin er ikke sat op endnu. Sæt <code className="rounded bg-secondary px-1">ADMIN_PASSWORD</code> (mindst 8 tegn) i{" "}
              <code className="rounded bg-secondary px-1">.env.local</code>, og genstart serveren.
            </p>
          )}
        </div>
        <p className="mt-6 text-center text-sm">
          <Link href="/" className="text-muted-foreground hover:text-foreground">
            ← Tilbage til hjemmesiden
          </Link>
        </p>
      </div>
    </div>
  );
}
