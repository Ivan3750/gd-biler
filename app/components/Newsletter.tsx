import { Mail } from "lucide-react";
import { getLang } from "@/app/lib/i18n";
import { filterText } from "@/app/lib/filter-text";
import { NewsletterForm } from "./NewsletterForm";

/** Band with the e-mail sign-up; `search` remembers the visitor's current car search. */
export async function Newsletter({ search }: { search?: string }) {
  const lang = await getLang();
  const n = filterText(lang).nl;
  return (
    <section id="nyhedsbrev" className="bg-primary texture-light py-16 text-primary-foreground lg:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-6 lg:grid-cols-2 lg:gap-16 lg:px-10">
        <div className="flex items-start gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white/10">
            <Mail size={22} />
          </span>
          <div>
            <h2 className="text-balance text-3xl font-semibold leading-tight sm:text-4xl">{n.title}</h2>
            <p className="mt-3 max-w-md text-white/75 leading-relaxed">{search ? n.textFiltered : n.text}</p>
          </div>
        </div>
        <NewsletterForm lang={lang} text={n} search={search} />
      </div>
    </section>
  );
}
