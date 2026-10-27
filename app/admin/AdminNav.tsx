"use client";
import { usePathname } from "next/navigation";
import { ExternalLink, Image as ImageIcon, LayoutDashboard, LogOut, Mail, Settings, Type, Car } from "lucide-react";
import { logoutAction } from "./actions";

const items = [
  { href: "/admin", label: "Overblik", icon: LayoutDashboard, exact: true },
  { href: "/admin/cars", label: "Annoncer", icon: Car },
  { href: "/admin/messages", label: "Beskeder", icon: Mail, badge: true },
  { href: "/admin/tekster", label: "Tekster", icon: Type },
  { href: "/admin/billeder", label: "Billeder", icon: ImageIcon },
  { href: "/admin/indstillinger", label: "Indstillinger", icon: Settings },
];

export function AdminNav({ unread }: { unread: number }) {
  const pathname = usePathname();
  const active = (href: string, exact?: boolean) => (exact ? pathname === href : pathname.startsWith(href));

  return (
    <aside className="bg-navy text-navy-foreground lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-64 lg:shrink-0 lg:flex-col">
      <div className="flex items-center justify-between px-5 py-4 lg:block lg:px-6 lg:py-6">
        <a href="/admin" className="block leading-tight">
          <span className="text-lg font-semibold">GD Biler</span>
          <span className="block text-[11px] uppercase tracking-[0.2em] text-white/50">Administration</span>
        </a>
        <div className="flex items-center gap-4 text-sm lg:hidden">
          <a href="/" target="_blank" className="text-white/70 hover:text-white">Hjemmeside</a>
          <form action={logoutAction}>
            <button className="text-white/70 hover:text-white">Log ud</button>
          </form>
        </div>
      </div>

      <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-1 lg:flex-col lg:overflow-visible lg:pb-0">
        {items.map(({ href, label, icon: Icon, exact, badge }) => {
          const on = active(href, exact);
          return (
            <a
              key={href}
              href={href}
              aria-current={on ? "page" : undefined}
              className={`flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                on ? "bg-white text-primary" : "text-white/75 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon size={17} strokeWidth={1.75} />
              {label}
              {badge && unread > 0 && (
                <span className="ml-auto rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-semibold text-primary">
                  {unread}
                </span>
              )}
            </a>
          );
        })}
      </nav>

      <div className="hidden space-y-1 border-t border-white/10 p-3 lg:block">
        <a
          href="/"
          target="_blank"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/75 hover:bg-white/10 hover:text-white"
        >
          <ExternalLink size={17} strokeWidth={1.75} /> Se hjemmesiden
        </a>
        <form action={logoutAction}>
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/75 hover:bg-white/10 hover:text-white">
            <LogOut size={17} strokeWidth={1.75} /> Log ud
          </button>
        </form>
      </div>
    </aside>
  );
}
