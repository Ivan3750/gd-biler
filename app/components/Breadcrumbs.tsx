import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { href, type Lang } from "@/app/lib/i18n";
import { SITE_URL } from "@/app/lib/site";
import { JsonLd } from "./JsonLd";

export type Crumb = { name: string; path?: string };

/** Visible trail plus BreadcrumbList data. The last crumb is the current page and has no link. */
export function Breadcrumbs({ lang, home, items }: { lang: Lang; home: string; items: Crumb[] }) {
  const all: Crumb[] = [{ name: home, path: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-5">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
          {all.map((c, i) => (
            <li key={c.name} className="flex items-center gap-1">
              {i > 0 && <ChevronRight size={14} aria-hidden />}
              {c.path && i < all.length - 1 ? (
                <Link href={href(lang, c.path)} className="hover:text-foreground hover:underline">
                  {c.name}
                </Link>
              ) : (
                <span aria-current="page" className="text-foreground">
                  {c.name}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.name,
            ...(c.path ? { item: `${SITE_URL}${href(lang, c.path)}` } : {}),
          })),
        }}
      />
    </>
  );
}
