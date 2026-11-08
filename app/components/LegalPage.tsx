import { Header } from "./Header";
import { Footer } from "./Footer";
import { JsonLd } from "./JsonLd";
import { getDict, localePath } from "@/app/lib/i18n";
import { pagesDict } from "@/app/lib/pages";
import { breadcrumbJsonLd } from "@/app/lib/seo";

/** Plain reading layout for the terms and the privacy policy. */
export async function LegalPage({ kind, path }: { kind: "terms" | "privacy"; path: string }) {
  const { lang, t } = await getDict();
  const doc = pagesDict[lang].legal[kind];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t.car.home, path: localePath(lang, "/") },
          { name: doc.title, path: localePath(lang, path) },
        ])}
      />
      <Header />
      <main className="mesh pt-36 pb-24 lg:pt-44 lg:pb-32">
        <article className="mx-auto max-w-3xl px-6">
          <h1 className="animate-fade-up text-balance text-5xl font-semibold leading-[1.05] sm:text-6xl">{doc.title}</h1>
          <p className="animate-fade-up mt-6 text-lg leading-relaxed text-muted-foreground" style={{ animationDelay: "100ms" }}>
            {doc.intro}
          </p>
          <div className="mt-12 space-y-4">
            {doc.sections.map((s) => (
              <section key={s.h} className="reveal rounded-3xl border border-border bg-card p-7 sm:p-8">
                <h2 className="text-xl font-semibold">{s.h}</h2>
                <p className="mt-2 leading-relaxed text-muted-foreground">{s.p}</p>
              </section>
            ))}
          </div>
          <p className="mt-8 text-sm text-muted-foreground">{doc.draft}</p>
        </article>
      </main>
      <Footer />
    </div>
  );
}
