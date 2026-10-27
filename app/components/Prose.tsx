export function Prose({ sections, fill }: { sections: { h: string; p: string[] }[]; fill: (s: string) => string }) {
  return (
    <div className="max-w-3xl space-y-10">
      {sections.map((s) => (
        <section key={s.h}>
          <h2 className="text-xl font-bold sm:text-2xl">{s.h}</h2>
          <div className="mt-3 space-y-3 text-lg leading-relaxed text-muted-foreground">
            {s.p.map((p) => (
              <p key={p}>{fill(p)}</p>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
