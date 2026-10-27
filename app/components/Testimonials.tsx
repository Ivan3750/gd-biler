import { Star, Quote } from "lucide-react";

type Review = {
  name: string;
  city: string;
  rating: number;
  text: string;
  car: string;
};

const reviews: Review[] = [
  {
    name: "Anastasia Griciuc",
    city: "Aarhus",
    rating: 5,
    car: "Audi A6 – 2022",
    text: "Professionel betjening fra start til slut. Bilen var præcis som beskrevet, og handlen var helt uden overraskelser. Kan varmt anbefales.",
  },
  {
    name: "Jens Kristensen",
    city: "Vejle",
    rating: 5,
    car: "BMW 530e – 2023",
    text: "GD Biler hjalp mig med finansieringen og leverede bilen til døren i Vejle. Ærlig rådgivning og en super skarp pris.",
  },
  {
    name: "Anders Holm",
    city: "Horsens",
    rating: 5,
    car: "Volvo XC60 – 2022",
    text: "Vi har købt to biler hos GD Biler. Tryghed, kvalitet og personlig service – det er derfor vi kommer igen.",
  },
  {
    name: "Camilla Nielsen",
    city: "København",
    rating: 5,
    car: "Tesla Model 3 – 2023",
    text: "Fantastisk oplevelse. Bilen blev synet og klargjort, og alt papirarbejde var ordnet inden afhentning.",
  },
];

export function Testimonials() {
  return (
    <section id="reviews" className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
              Kundeanmeldelser
            </span>
            <h2 className="mt-4 text-balance text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.02]">
              Hvad vores
              <br /> kunder siger.
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={18} className="fill-foreground text-foreground" />
              ))}
            </div>
            <div className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">4,9 / 5</span> · 50+ anmeldelser
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {reviews.map((r) => (
            <article
              key={r.name}
              className="group relative flex flex-col rounded-2xl bg-secondary p-8 lg:p-10 transition-all duration-500 hover:shadow-elevated hover:-translate-y-1"
            >
              <Quote
                size={36}
                strokeWidth={1.25}
                className="text-foreground/15 absolute top-6 right-6"
              />
              <div className="flex items-center gap-1">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} size={14} className="fill-foreground text-foreground" />
                ))}
              </div>
              <p className="mt-6 text-lg leading-relaxed text-foreground/90">
                “{r.text}”
              </p>
              <div className="mt-8 flex items-center justify-between pt-6 border-t border-border">
                <div>
                  <div className="font-semibold">{r.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{r.city}</div>
                </div>
                <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  {r.car}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
