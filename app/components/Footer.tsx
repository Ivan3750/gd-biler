import { getDict, localePath } from "@/app/lib/i18n";
import { getSettings, telHref } from "@/app/lib/settings";
import { getImages } from "@/app/lib/images";

import { Logo } from "./Logo";

export async function Footer() {
  const [{ lang, t }, s, images] = await Promise.all([getDict(), getSettings(), getImages()]);
  const f = t.footer;
  const p = (path: string) => localePath(lang, path);

  return (
    <footer className="bg-primary texture-light text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2">
            <Logo variant="light" src={images.logo} />
            <p className="mt-5 text-sm text-white/60 max-w-xs leading-relaxed">{f.tagline}</p>
          </div>

          <FooterCol
            title={f.menu}
            links={[
              [t.nav.cars, p("/biler")],
              [t.nav.sell, p("/saelg-din-bil")],
              [t.nav.workshop, p("/vaerksted")],
              [t.nav.about, p("/om-os")],
              [t.nav.contact, p("/kontakt")],
            ]}
          />
          <FooterCol
            title={f.contact}
            links={[
              [s.street, p("/kontakt")],
              [`${s.zip} ${s.city}`, p("/kontakt")],
              [s.phone, telHref(s.phone)],
              [s.email, `mailto:${s.email}`],
            ]}
          />
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row gap-4 justify-between text-xs text-white/50">
          <div className="flex gap-6">
            <span>© {new Date().getFullYear()} {s.legalName}. {f.rights}</span>
            <span>CVR: {s.cvr}</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">{f.terms}</a>
            <a href="#" className="hover:text-white">{f.privacy}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="text-xs uppercase tracking-[0.18em] text-white/50 font-semibold">{title}</h4>
      <ul className="mt-5 space-y-3">
        {links.map(([l, href]) => (
          <li key={l}>
            <a href={href} className="text-sm text-white/85 hover:text-white transition-colors">
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
