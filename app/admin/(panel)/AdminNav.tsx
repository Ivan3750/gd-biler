"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Car, ExternalLink, Inbox, LayoutDashboard, LogOut, Settings } from "lucide-react";
import { logoutAction } from "../actions";

const items = [
  { href: "/admin", label: "Overblik", icon: LayoutDashboard, exact: true },
  { href: "/admin/biler", label: "Biler", icon: Car },
  { href: "/admin/henvendelser", label: "Henvendelser", icon: Inbox },
  { href: "/admin/indstillinger", label: "Indstillinger", icon: Settings },
];

export function AdminNav({ newLeads }: { newLeads: number }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Admin" className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
      {items.map(({ href, label, icon: Icon, exact }) => {
        const active = exact ? pathname === href : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${
              active ? "bg-primary text-primary-foreground" : "text-foreground/75 hover:bg-secondary"
            }`}
          >
            <Icon size={17} aria-hidden />
            {label}
            {href === "/admin/henvendelser" && newLeads > 0 && (
              <span className="ml-auto rounded-full bg-brand px-2 py-0.5 text-xs font-bold text-brand-foreground">{newLeads}</span>
            )}
          </Link>
        );
      })}
      <div className="hidden lg:mt-4 lg:block lg:border-t lg:border-border lg:pt-4">
        <a
          href="/"
          target="_blank"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/75 hover:bg-secondary"
        >
          <ExternalLink size={17} aria-hidden /> Se hjemmesiden
        </a>
        <form action={logoutAction}>
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/75 hover:bg-secondary">
            <LogOut size={17} aria-hidden /> Log ud
          </button>
        </form>
      </div>
    </nav>
  );
}
