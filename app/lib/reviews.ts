import type { Lang } from "./i18n";

export type Review = {
  name: string;
  city: string;
  car: string;
  text: Record<Lang, string>;
};

export const REVIEWS: Review[] = [
  {
    name: "Anastasia Griciuc",
    city: "Aarhus",
    car: "Audi A6 – 2022",
    text: {
      da: "Professionel betjening fra start til slut. Bilen var præcis som beskrevet, og handlen var helt uden overraskelser. Kan varmt anbefales.",
      en: "Professional service from start to finish. The car was exactly as described and the deal had no surprises. Highly recommended.",
    },
  },
  {
    name: "Jens Kristensen",
    city: "Vejle",
    car: "BMW 530e – 2023",
    text: {
      da: "GD Biler hjalp mig med finansieringen og leverede bilen til døren i Vejle. Ærlig rådgivning og en super skarp pris.",
      en: "GD Biler helped me with the finance and delivered the car to my door in Vejle. Honest advice and a very sharp price.",
    },
  },
  {
    name: "Anders Holm",
    city: "Horsens",
    car: "Volvo XC60 – 2022",
    text: {
      da: "Vi har købt to biler hos GD Biler. Tryghed, kvalitet og personlig service – det er derfor vi kommer igen.",
      en: "We have bought two cars from GD Biler. Safety, quality and personal service – that is why we come back.",
    },
  },
  {
    name: "Camilla Nielsen",
    city: "København",
    car: "Tesla Model 3 – 2023",
    text: {
      da: "Fantastisk oplevelse. Bilen blev synet og klargjort, og alt papirarbejde var ordnet inden afhentning.",
      en: "A fantastic experience. The car was inspected and prepared, and all the paperwork was done before pick-up.",
    },
  },
];
