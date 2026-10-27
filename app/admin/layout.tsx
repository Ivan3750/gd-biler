import type { Metadata } from "next";
import { isAdmin } from "@/app/lib/auth";
import { listMessages } from "@/app/lib/messages";
import { AdminNav } from "./AdminNav";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAdmin())) {
    // Login screen: no navigation, just the card.
    return (
      <div className="texture-dark flex min-h-screen items-center justify-center bg-secondary p-6 text-foreground">
        {children}
      </div>
    );
  }

  const unread = (await listMessages()).filter((m) => !m.read).length;

  return (
    <div className="min-h-screen bg-secondary text-foreground lg:flex">
      <AdminNav unread={unread} />
      <main className="min-w-0 flex-1 px-5 py-8 lg:px-10 lg:py-10">
        <div className="mx-auto max-w-5xl">{children}</div>
      </main>
    </div>
  );
}
