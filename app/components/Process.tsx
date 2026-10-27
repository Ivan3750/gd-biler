const steps = [
  {
    n: "01",
    title: "Find din bil",
    desc: "Gennemse vores udvalg af nøje udvalgte brugte biler.",
  },
  {
    n: "02",
    title: "Book prøvetur",
    desc: "Kom forbi vores showroom i Horsens og oplev bilen på vejen.",
  },
  {
    n: "03",
    title: "Aftal købet",
    desc: "Vi gennemgår bilen sammen og gør handlen klar på en enkel og tryg måde.",
  },
  {
    n: "04",
    title: "Få nøglerne",
    desc: "Vi klargør og leverer bilen, så du hurtigt kan køre afsted.",
  },
];

export function Process() {
  return (
    <section id="process" className="bg-navy text-navy-foreground py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl mb-14">
          <span className="text-xs uppercase tracking-[0.2em] text-white/60 font-medium">
            Sådan køber du
          </span>
          <h2 className="mt-4 text-balance text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.02]">
            Fra showroom
            <br /> til indkørsel.
          </h2>
        </div>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((s) => (
            <li
              key={s.n}
              className="group relative rounded-2xl glass p-8 transition-all duration-500 hover:-translate-y-1"
            >
              <span className="text-sm font-semibold text-white/50 tracking-[0.2em]">
                {s.n}
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
