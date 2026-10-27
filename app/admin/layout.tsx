import type { Metadata } from "next";
import { isAdmin } from "@/app/lib/auth";
import { logoutAction } from "./actions";

export const metadata: Metadata = {
  title: "Admin | GD Biler",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const loggedIn = await isAdmin();

  return (
    <div className="min-h-screen bg-secondary text-foreground">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <a href="/admin" className="font-semibold">
            GD Biler <span className="font-normal text-muted-foreground">· Admin</span>
          </a>
          <div className="flex items-center gap-5 text-sm">
            <a href="/" className="text-muted-foreground hover:text-foreground">
              Se hjemmesiden
            </a>
            {loggedIn && (
              <form action={logoutAction}>
                <button className="font-medium hover:underline">Log ud</button>
              </form>
            )}
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
    </div>
  );
}
