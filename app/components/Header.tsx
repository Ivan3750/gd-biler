"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";
import { bilingual, href, type Lang } from "@/app/lib/i18n/core";
import type { Dict } from "@/app/lib/i18n";
import { telHref, type Settings } from "@/app/lib/settings-shared";
import { Logo } from "./Logo";
import { btnPrimary, container } from "./ui";

const links = [
  { key: "cars", path: "/biler" },
  { key: "finance", path: "/finansiering" },
  { key: "sell", path: "/saelg-din-bil" },
  { key: "about", path: "/om-os" },
  { key: "contact", path: "/kontakt" },
] as const;

export function Header({ lang, settings, nav }: { lang: Lang; settings: Settings; nav: Dict["nav"] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  // The browser URL carries /en for English; the rest is the page path.
  const path = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
  const other: Lang = lang === "da" ? "en" : "da";
  const notice = bilingual(lang, settings.notice);

  return (
    <>
      {notice && <p className="bg-secondary px-6 py-2 text-center text-sm">{notice}</p>}
      <header className="sticky top-0 z-40 border-b border-border bg-background">
        <div className="bg-navy text-navy-foreground">
          <div className={`${container} flex items-center justify-between py-1.5 text-xs`}>
            <span className="hidden text-white/75 sm:inline">
              {settings.street}, {settings.zip} {settings.city}
            </span>
            <a href={telHref(settings.phone)} className="ml-auto font-medium hover:underline">
              {settings.phone}
            </a>
          </div>
        </div>

        <div className={`${container} flex items-center justify-between py-3`}>
          <Link href={href(lang, "/")} aria-label="GD Biler" onClick={() => setOpen(false)}>
            <Logo />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
            {links.map(({ key, path: p }) => {
              const active = path === p || path.startsWith(`${p}/`);
              return (
                <Link
                  key={key}
                  href={href(lang, p)}
                  aria-current={active ? "page" : undefined}
                  className={`border-b-2 py-1 text-[15px] font-medium transition-colors ${
                    active ? "border-brand text-foreground" : "border-transparent text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {nav[key]}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href={href(other, path)}
              hrefLang={other}
              className="rounded-md px-2 py-1 text-sm font-medium text-foreground/70 hover:text-foreground"
            >
              {nav.language}
            </Link>
            <a href={telHref(settings.phone)} className={`${btnPrimary} hidden !px-4 !py-2 sm:inline-flex`}>
              <Phone size={15} aria-hidden />
              {settings.phone}
            </a>
            <button
              type="button"
              aria-label={open ? nav.close : nav.menu}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border lg:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {open && (
          <nav className="border-t border-border bg-background lg:hidden" aria-label="Mobile">
            <div className={`${container} flex flex-col py-2`}>
              {links.map(({ key, path: p }) => (
                <Link
                  key={key}
                  href={href(lang, p)}
                  onClick={() => setOpen(false)}
                  className="border-b border-border py-3.5 text-base font-medium last:border-0"
                >
                  {nav[key]}
                </Link>
              ))}
              <a href={telHref(settings.phone)} className={`${btnPrimary} my-4`}>
                <Phone size={15} aria-hidden /> {settings.phone}
              </a>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
