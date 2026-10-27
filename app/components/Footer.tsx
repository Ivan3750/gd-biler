import Link from "next/link";
import { href, type Dict, type Lang } from "@/app/lib/i18n";
import { telHref, type Settings } from "@/app/lib/settings-shared";
import { Logo } from "./Logo";
import { container } from "./ui";

const menu = [
  { key: "cars", path: "/biler" },
  { key: "finance", path: "/finansiering" },
  { key: "sell", path: "/saelg-din-bil" },
  { key: "about", path: "/om-os" },
  { key: "contact", path: "/kontakt" },
] as const;

export function Footer({ lang, settings, dict, address }: { lang: Lang; settings: Settings; dict: Dict; address: string }) {
  const linkClass = "text-sm text-white/80 hover:text-white";
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className={`${container} py-16`}>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/70">{dict.footer.about}</p>
          </div>

          <FooterCol title={dict.footer.menu}>
            {menu.map(({ key, path }) => (
              <li key={key}>
                <Link href={href(lang, path)} className={linkClass}>
                  {dict.nav[key]}
                </Link>
              </li>
            ))}
          </FooterCol>

          <FooterCol title={dict.footer.contact}>
            <li className="text-sm text-white/80">
              {settings.street}
              <br />
              {settings.zip} {settings.city}
            </li>
            <li>
              <a href={telHref(settings.phone)} className={linkClass}>
                {settings.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${settings.email}`} className={linkClass}>
                {settings.email}
              </a>
            </li>
            {settings.facebook && (
              <li>
                <a href={settings.facebook} className={linkClass} rel="noopener noreferrer" target="_blank">
                  Facebook
                </a>
              </li>
            )}
            {settings.instagram && (
              <li>
                <a href={settings.instagram} className={linkClass} rel="noopener noreferrer" target="_blank">
                  Instagram
                </a>
              </li>
            )}
          </FooterCol>

          <FooterCol title={dict.footer.hours}>
            {settings.hours.map((h, i) => (
              <li key={i} className="flex justify-between gap-4 text-sm text-white/80">
                <span>{dict.days[i]}</span>
                <span className="text-white">{h.closed ? dict.common.closed : `${h.open}–${h.close}`}</span>
              </li>
            ))}
          </FooterCol>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/60 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {settings.company}. {dict.footer.rights} · {dict.footer.cvr} {settings.cvr} · {address}
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href={href(lang, "/handelsbetingelser")} className="hover:text-white">
              {dict.footer.legal.terms}
            </Link>
            <Link href={href(lang, "/privatlivspolitik")} className="hover:text-white">
              {dict.footer.legal.privacy}
            </Link>
            <Link href={href(lang, "/cookies")} className="hover:text-white">
              {dict.footer.legal.cookies}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="border-l-2 border-brand pl-3 text-sm font-bold">{title}</h2>
      <ul className="mt-5 space-y-3">{children}</ul>
    </div>
  );
}
