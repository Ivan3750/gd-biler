"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { bilingual, href, type Lang } from "@/app/lib/i18n/core";
import type { Dict } from "@/app/lib/i18n";
import { telHref, type Settings } from "@/app/lib/settings-shared";
import { afterLinks as after, infoLinks, mainLinks as links } from "@/app/lib/nav";
import { Logo } from "./Logo";
import { btnPrimary, container } from "./ui";

export function Header({ lang, settings, nav, info }: { lang: Lang; settings: Settings; nav: Dict["nav"]; info: Dict["info"] }) {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  // The browser URL carries /en for English; the rest is the page path.
  const path = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
  const other: Lang = lang === "da" ? "en" : "da";
  const notice = bilingual(lang, settings.notice);
  const infoActive = infoLinks.some((l) => path === l.path);

  // Close menus when the page changes, on Escape and on clicks elsewhere.
  useEffect(() => {
    const t = setTimeout(() => {
      setOpen(false);
      setMenu(false);
    }, 0);
    return () => clearTimeout(t);
  }, [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    const onClick = (e: MouseEvent) => menuRef.current && !menuRef.current.contains(e.target as Node) && setMenu(false);
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  const navLink = (key: keyof Dict["nav"], p: string) => {
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
  };

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
          <Link href={href(lang, "/")} aria-label="GD Biler">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
            {links.map((l) => navLink(l.key, l.path))}

            <div ref={menuRef} className="relative">
              <button
                type="button"
                aria-expanded={menu}
                aria-haspopup="true"
                onClick={() => setMenu((m) => !m)}
                className={`inline-flex items-center gap-1 border-b-2 py-1 text-[15px] font-medium transition-colors ${
                  infoActive ? "border-brand text-foreground" : "border-transparent text-foreground/70 hover:text-foreground"
                }`}
              >
                {info.title} <ChevronDown size={15} aria-hidden className={`transition-transform ${menu ? "rotate-180" : ""}`} />
              </button>
              {menu && (
                <ul className="anim-drop absolute left-0 top-full mt-3 w-64 rounded-md border border-border bg-background py-2 shadow-lg">
                  {infoLinks.map((l) => (
                    <li key={l.key}>
                      <Link
                        href={href(lang, l.path)}
                        className="block px-4 py-2.5 text-[15px] hover:bg-secondary"
                        aria-current={path === l.path ? "page" : undefined}
                      >
                        {info.items[l.key]}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {after.map((l) => navLink(l.key, l.path))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href={href(other, path)}
              hrefLang={other}
              className="rounded-md px-2 py-2 text-sm font-medium text-foreground/70 hover:text-foreground"
            >
              {nav.language}
            </Link>
            <a
              href={telHref(settings.phone)}
              className="hidden items-center gap-2 whitespace-nowrap rounded-md bg-primary px-4 py-2 text-[15px] font-semibold text-primary-foreground hover:bg-primary/85 xl:inline-flex"
            >
              <Phone size={15} aria-hidden />
              {settings.phone}
            </a>
            <button
              type="button"
              aria-label={open ? nav.close : nav.menu}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border lg:hidden"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {open && (
          <nav className="anim-drop max-h-[calc(100svh-6rem)] overflow-y-auto border-t border-border bg-background lg:hidden" aria-label="Mobile">
            <div className={`${container} flex flex-col py-2`}>
              {[...links, ...after].map(({ key, path: p }) => (
                <Link key={key} href={href(lang, p)} className="border-b border-border py-4 text-base font-semibold">
                  {nav[key]}
                </Link>
              ))}
              <p className="pb-1 pt-5 text-sm font-bold text-muted-foreground">{info.title}</p>
              {infoLinks.map((l) => (
                <Link key={l.key} href={href(lang, l.path)} className="border-b border-border py-3.5 text-base last:border-0">
                  {info.items[l.key]}
                </Link>
              ))}
              <a href={telHref(settings.phone)} className={`${btnPrimary} my-5`}>
                <Phone size={16} aria-hidden /> {settings.phone}
              </a>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
