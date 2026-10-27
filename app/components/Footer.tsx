/* import { Facebook, Instagram, Linkedin } from "lucide-react";
 */import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2">
            <Logo variant="light" />
            <p className="mt-5 text-sm text-white/60 max-w-xs leading-relaxed">
              Bilforhandler i Horsens med fokus på kvalitet, finansiering og service.
            </p>
         {/*    <div className="mt-6 flex gap-3">
              {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 hover:bg-white/15 transition-colors"
                  aria-label="Social"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div> */}
          </div>

          <FooterCol
            title="Menu"
            links={[
              ["Biler", "/new"],
              ["Finansiering", "/new"],
              ["Værksted", "/new"],
              ["Om os", "/new"],
              ["Kontakt", "/new"],    
            ]}
          />
          <FooterCol
            title="Kontakt"
            links={[
              ["Langmarksvej 36A", "#"],
              ["8700 Horsens", "#"],
              ["+45 50 23 71 15", "tel:+4550237115"],
              ["kontakt@gdbiler.dk", "mailto:kontakt@gdbiler.dk"],
            ]}
          />
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row gap-4 justify-between text-xs text-white/50">
          <div className="flex gap-6">
          <span>© {new Date().getFullYear()} GD Biler I/S. Alle rettigheder forbeholdes.</span>
           <span>CVR: 44366452</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Handelsbetingelser</a>
            <a href="#" className="hover:text-white">Privatlivspolitik</a>
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
