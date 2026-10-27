import { Logo } from "@/app/components/Logo";
import { requireAdmin } from "@/app/lib/auth";
import { listLeads } from "@/app/lib/leads";
import { logoutAction } from "../actions";
import { AdminNav } from "./AdminNav";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  const newLeads = (await listLeads()).filter((l) => l.status === "new").length;

  return (
    <div className="min-h-screen lg:flex">
      <aside className="border-b border-border bg-background lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:shrink-0 lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between px-5 py-4 lg:py-6">
          <Logo />
          <form action={logoutAction} className="lg:hidden">
            <button className="text-sm font-medium">Log ud</button>
          </form>
        </div>
        <div className="px-3 pb-3 lg:px-4">
          <AdminNav newLeads={newLeads} />
        </div>
      </aside>
      <main className="min-w-0 flex-1 px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
        <div className="mx-auto max-w-5xl">{children}</div>
      </main>
    </div>
  );
}
