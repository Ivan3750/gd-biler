import { Search, ChevronRight, ChevronDown, Calendar } from "lucide-react";
import heroImg from "@/app/assets/hero.jpg";

const brands = [
  "Alle mærker",
  "Audi",
  "BMW",
  "Mercedes",
  "Volkswagen",
  "Tesla",
  "Volvo",
];

const bodyTypes = [
  "Alle typer",
  "Sedan",
  "SUV",
  "Stationcar",
  "Coupe",
];

const prices = [
  "Alle priser",
  "< 150.000",
  "150-300.000",
  "300-500.000",
  "> 500.000",
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] w-full overflow-hidden bg-navy text-white"
    >
      <img
        src={heroImg.src}
        alt=""
        width={1920}
        height={1280}
        className="absolute inset-0 h-full w-full object-cover opacity-90"
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.12 0.03 254 / 0.55) 0%, oklch(0.10 0.03 254 / 0.65) 50%, oklch(0.08 0.02 254 / 0.92) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-6 pt-40 pb-16 lg:px-10 lg:pb-24">
        <div className="max-w-3xl animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-white/90">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            Bilforhandler · Horsens
          </span>

          <h1 className="mt-6 text-balance text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            Find din næste bil
            <br />
            <span className="text-white/70">hos GD Biler</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
            Brugte kvalitetsbiler med fokus på tryghed og god service
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#cars"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-primary transition-all hover:scale-[1.02] hover:shadow-elevated"
            >
              Se biler
              <ChevronRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full glass px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/15"
            >
              <Calendar size={15} />
              Book tid
            </a>
          </div>
        </div>

        <div
          className="mt-12 animate-fade-up lg:mt-16"
          style={{ animationDelay: "200ms" }}
        >
          <div className="glass shadow-elevated max-w-4xl rounded-2xl p-3 sm:p-4">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
              <SearchField label="Mærke" options={brands} />
              <SearchField label="Type" options={bodyTypes} />
              <SearchField label="Pris" options={prices} />

              <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-white py-4 font-semibold text-primary transition-all hover:bg-white/90">
                <Search size={16} />
                Søg biler
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SearchField({
  label,
  options,
}: {
  label: string;
  options: string[];
}) {
  return (
    <label className="group relative flex cursor-pointer flex-col rounded-xl border border-white/5 bg-white/5 px-4 py-3 transition-all hover:border-white/10 hover:bg-white/10">
      <span className="text-[10px] uppercase tracking-[0.18em] text-white/60">
        {label}
      </span>

      <select
        defaultValue={options[0]}
        className="
          mt-1
          w-full
          appearance-none
          bg-transparent
          pr-8
          text-sm
          font-medium
          text-white
          outline-none
          cursor-pointer
        "
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
            className="bg-[#0E2A47] text-white"
          >
            {option}
          </option>
        ))}
      </select>

      <ChevronDown
        size={16}
        className="pointer-events-none absolute right-4 top-1/2 text-white/60"
      />
    </label>
  );
}