"use client";
import { usePathname, useSearchParams } from "next/navigation";
import type { Lang } from "@/app/lib/dict";

/** Language links point at the same page under /en (or without it), so each language has its own URL. */
export function LanguageSwitch({ lang, solid, label }: { lang: Lang; solid: boolean; label: string }) {
  // The browser sees the public URL (/en/...), not the internal rewrite.
  const pathname = usePathname();
  const query = useSearchParams().toString();
  const base = pathname === "/en" ? "/" : pathname.replace(/^\/en(?=\/)/, "");
  const url = (l: Lang) => (l === "en" ? `/en${base === "/" ? "" : base}` : base) + (query ? `?${query}` : "");

  return (
    <div
      role="group"
      aria-label={label}
      className={`inline-flex h-10 items-center rounded-full px-1 text-xs font-semibold transition-colors ${
        solid ? "bg-secondary text-foreground" : "glass text-white"
      }`}
    >
      {(["da", "en"] as const).map((l) => (
        <a
          key={l}
          href={url(l)}
          hrefLang={l}
          lang={l}
          aria-current={l === lang ? "true" : undefined}
          className={`rounded-full px-2.5 py-1.5 uppercase ${
            l === lang ? (solid ? "bg-primary text-primary-foreground" : "bg-white text-primary") : "opacity-60 hover:opacity-100"
          }`}
        >
          {l}
        </a>
      ))}
    </div>
  );
}
