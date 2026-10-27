import { getDict } from "@/app/lib/i18n";
import { Lines } from "./Lines";

export async function Process() {
  const { t } = await getDict();

  return (
    <section id="process" className="bg-navy texture-light text-navy-foreground py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl mb-14">
          <span className="text-xs uppercase tracking-[0.2em] text-white/60 font-medium">
            {t.process.label}
          </span>
          <h2 className="mt-4 text-balance text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.02]">
            <Lines lines={t.process.title} />
          </h2>
        </div>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {t.process.steps.map((s, i) => (
            <li
              key={s.title}
              className="group relative rounded-2xl glass p-8 transition-all duration-500 hover:-translate-y-1"
            >
              <span className="text-sm font-semibold text-white/50 tracking-[0.2em]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-3 text-white/70 leading-relaxed">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
