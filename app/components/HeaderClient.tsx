"use client";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Logo } from "./Logo";
import { LanguageSwitch } from "./LanguageSwitch";
import type { Lang } from "@/app/lib/dict";

type Nav = { label: string; href: string }[];

export function HeaderClient({
  lang,
  phone,
  phoneHref,
  logoSrc,
  homeHref,
  nav,
  menuLabel,
  switchLabel,
}: {
  lang: Lang;
  phone: string;
  phoneHref: string;
  logoSrc: string;
  homeHref: string;
  nav: Nav;
  menuLabel: string;
  switchLabel: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        solid
          ? "bg-background/85 backdrop-blur-xl border-b border-border"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <a href={homeHref} className="z-10">
          <Logo variant={solid ? "dark" : "light"} src={logoSrc} />
        </a>

        <nav className="hidden lg:flex items-center gap-9">
          {nav.map((n) => (
            <a
              key={n.label}
              href={n.href}
              className={`text-sm font-medium transition-colors ${
                solid ? "text-foreground/80 hover:text-foreground" : "text-white/80 hover:text-white"
              }`}
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitch lang={lang} solid={solid} label={switchLabel} />
          <a
            href={phoneHref}
            className={`hidden sm:inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
              solid
                ? "bg-primary text-primary-foreground hover:opacity-90"
                : "glass text-white hover:bg-white/15"
            }`}
          >
            <Phone size={15} />
            {phone}
          </a>
          <button
            aria-label={menuLabel}
            onClick={() => setOpen((o) => !o)}
            className={`lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-full transition-colors ${
              solid ? "bg-secondary text-foreground" : "glass text-white"
            }`}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background animate-fade-in">
          <nav className="flex flex-col px-6 py-6 gap-1">
            {nav.map((n) => (
              <a
                key={n.label}
                href={n.href}
                onClick={() => setOpen(false)}
                className="py-3 text-base font-medium text-foreground/90 hover:text-foreground border-b border-border last:border-0"
              >
                {n.label}
              </a>
            ))}
            <a
              href={phoneHref}
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-3 text-sm font-semibold"
            >
              <Phone size={15} /> {phone}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
