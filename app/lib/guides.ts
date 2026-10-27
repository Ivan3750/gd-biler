import type { Lang } from "./i18n/core";

export type Guide = {
  slug: string;
  title: string;
  description: string;
  lead: string;
  /** ISO date shown as "updated" and used in Article data. */
  updated: string;
  sections: { h: string; p?: string[]; list?: string[] }[];
};

const da: Guide[] = [
  {
    slug: "tjekliste-brugt-bil",
    title: "Tjekliste: sådan tjekker du en brugt bil",
    description: "En enkel tjekliste til dig, der skal købe brugt bil: hvad du skal se efter, spørge om og prøve, før du siger ja.",
    lead: "Det tager en halv time at tjekke en bil ordentligt. Her er de ting, vi selv ville kigge på.",
    updated: "2026-10-27",
    sections: [
      {
        h: "Før du kommer",
        p: ["Læs annoncen grundigt, og skriv de spørgsmål ned, du vil have svar på. Spørg efter servicehistorik, antal tidligere ejere og om bilen har været skadet."],
        list: ["Slå bilen op i Motorregistret med registreringsnummeret", "Bed om at se servicebogen eller regninger fra værksted", "Spørg, om der er garanti, og hvad den dækker"],
      },
      {
        h: "Når du ser bilen",
        p: ["Se bilen i dagslys og på tør vej, så du kan se lak og skader."],
        list: [
          "Gå rundt om bilen og se efter forskel i lakken og skæve mellemrum mellem paneler",
          "Tjek dæk for ensartet slid, og se efter rust i hjulbuer og undervogn",
          "Åbn alle døre, bagklap og motorhjelm",
          "Tjek, at alle lys, ruder, spejle og elektronik virker",
          "Lugt i kabinen efter fugt eller røg",
        ],
      },
      {
        h: "På prøveturen",
        p: ["Kør både i by og på motorvej, og sluk for radioen, så du kan høre bilen."],
        list: [
          "Start motoren kold, og lyt efter usædvanlige lyde",
          "Prøv bremser, gearskift og styretøj",
          "Tjek, at bilen kører lige, og at der ikke er rystelser",
          "Se efter advarselslamper på instrumentbrættet",
        ],
      },
      {
        h: "Papirer og aftale",
        p: ["Læs købsaftalen, før du skriver under. Tjek, at stelnummer og kilometertal passer med papirerne, og at garantien står i aftalen."],
      },
    ],
  },
  {
    slug: "finansiering-af-bil",
    title: "Finansiering af bil: det skal du vide",
    description: "Sådan hænger udbetaling, løbetid og rente sammen, når du finansierer en bil, og hvad du skal sammenligne.",
    lead: "Når du finansierer en bil, betaler du ofte mere i alt, end bilen koster. Her er de ting, der afgør ydelsen.",
    updated: "2026-10-27",
    sections: [
      {
        h: "Udbetaling",
        p: ["Jo mere du betaler fra start, jo mindre skal du låne, og jo lavere bliver ydelsen. En udbetaling gør det også billigere i renter."],
      },
      {
        h: "Løbetid",
        p: ["En lang løbetid giver en lav månedlig ydelse, men du betaler flere renter i alt. En kort løbetid er dyrere pr. måned, men billigere samlet."],
      },
      {
        h: "Rente og ÅOP",
        p: ["Sammenlign altid de årlige omkostninger i procent (ÅOP), ikke kun renten. ÅOP viser den samlede pris for lånet, inklusive gebyrer."],
      },
      {
        h: "Det skal du sammenligne",
        list: ["Samlet tilbagebetaling", "ÅOP", "Gebyrer og oprettelsesomkostninger", "Om du kan indfri lånet før tid, og hvad det koster"],
      },
      {
        h: "Prøv selv",
        p: ["Brug vores beregner på siden Finansiering til at se, hvad ydelsen bliver. Beregningen er vejledende."],
      },
    ],
  },
  {
    slug: "saadan-saelger-du-din-bil",
    title: "Sådan får du den bedste pris, når du sælger din bil",
    description: "Praktiske råd til dig, der vil sælge din bil: forbered den, saml papirerne, og vær ærlig om fejl.",
    lead: "Lidt forberedelse kan give en bedre pris og en hurtigere handel.",
    updated: "2026-10-27",
    sections: [
      {
        h: "Gør bilen klar",
        list: ["Vask og støvsug bilen, ude og inde", "Fjern private ting", "Udbedr små fejl, hvis det er billigt at gøre"],
      },
      {
        h: "Saml papirerne",
        p: ["Find servicebog, regninger og nøgler. En bil med dokumenteret service er mere værd for en køber."],
      },
      {
        h: "Vær ærlig om fejl",
        p: ["Fortæl om skader og fejl. Det giver færre uenigheder senere og en tryggere handel for begge parter."],
      },
      {
        h: "Kend værdien",
        p: ["Mærke, årgang, kilometer og stand afgør prisen. Få en vurdering, før du beslutter dig. Hos os får du en pris uden forpligtelser."],
      },
      {
        h: "Husk lån og forsikring",
        p: ["Har du et billån, skal det indfris i handlen. Afmeld først forsikringen, når bilen er afleveret og papirerne er i orden."],
      },
    ],
  },
  {
    slug: "benzin-diesel-hybrid-el",
    title: "Benzin, diesel, hybrid eller el – hvad passer til dig?",
    description: "Kort guide til at vælge drivmiddel: kørsel pr. år, mulighed for opladning og hvad bilen skal bruges til.",
    lead: "Det rigtige valg afhænger af, hvor meget og hvordan du kører.",
    updated: "2026-10-27",
    sections: [
      {
        h: "Benzin",
        p: ["Passer godt til korte ture og få kilometer om året. Bilerne er ofte billigere i indkøb."],
      },
      {
        h: "Diesel",
        p: ["Bruger ofte mindre brændstof på lange ture og motorvej, og er derfor populær hos dem, der kører meget."],
      },
      {
        h: "Hybrid",
        p: ["Kombinerer en forbrændingsmotor og en elmotor. En plug-in hybrid giver mest, hvis du kan lade den hjemme og kører korte ture til dagligt."],
      },
      {
        h: "El",
        p: ["Billig og stille i drift, hvis du kan lade hjemme eller på arbejdet. Tænk på rækkevidde og ladeadgang, før du vælger."],
      },
      {
        h: "Spørg dig selv",
        list: ["Hvor mange kilometer kører jeg om året?", "Kan jeg lade bilen derhjemme?", "Kører jeg mest i by eller på motorvej?", "Hvad er mit budget for indkøb og drift?"],
      },
    ],
  },
];

const en: Guide[] = [
  {
    slug: "tjekliste-brugt-bil",
    title: "Checklist: how to inspect a used car",
    description: "A simple checklist for buying a used car: what to look at, ask about and try before you say yes.",
    lead: "It takes half an hour to check a car properly. Here is what we would look at ourselves.",
    updated: "2026-10-27",
    sections: [
      {
        h: "Before you come",
        p: ["Read the advertisement carefully and write down the questions you want answered. Ask for the service history, the number of previous owners and whether the car has been damaged."],
        list: ["Look the car up in the Danish Motor Register using the registration number", "Ask to see the service book or workshop invoices", "Ask whether there is a warranty and what it covers"],
      },
      {
        h: "When you see the car",
        p: ["See the car in daylight and on a dry road so you can see paint and damage."],
        list: [
          "Walk around the car and look for differences in the paint and uneven gaps between panels",
          "Check the tyres for even wear, and look for rust in the wheel arches and underneath",
          "Open all doors, the tailgate and the bonnet",
          "Check that all lights, windows, mirrors and electronics work",
          "Smell the cabin for damp or smoke",
        ],
      },
      {
        h: "On the test drive",
        p: ["Drive both in town and on a motorway, and turn off the radio so you can hear the car."],
        list: [
          "Start the engine cold and listen for unusual sounds",
          "Try the brakes, gear changes and steering",
          "Check that the car drives straight and without vibrations",
          "Look for warning lights on the dashboard",
        ],
      },
      {
        h: "Papers and agreement",
        p: ["Read the sales agreement before you sign. Check that the chassis number and mileage match the papers, and that the warranty is in the agreement."],
      },
    ],
  },
  {
    slug: "finansiering-af-bil",
    title: "Car finance: what you need to know",
    description: "How down payment, term and interest fit together when you finance a car, and what to compare.",
    lead: "When you finance a car you often pay more in total than the car costs. Here is what decides the payment.",
    updated: "2026-10-27",
    sections: [
      {
        h: "Down payment",
        p: ["The more you pay upfront, the less you borrow and the lower the payment. A down payment also saves interest."],
      },
      {
        h: "Term",
        p: ["A long term gives a low monthly payment, but you pay more interest in total. A short term costs more per month but less overall."],
      },
      {
        h: "Interest and APR",
        p: ["Always compare the annual percentage rate (APR), not just the interest rate. APR shows the total cost of the loan, including fees."],
      },
      {
        h: "What to compare",
        list: ["Total repayment", "APR", "Fees and set-up costs", "Whether you can pay off the loan early, and what it costs"],
      },
      {
        h: "Try it yourself",
        p: ["Use our calculator on the Finance page to see what the payment will be. The calculation is a guide."],
      },
    ],
  },
  {
    slug: "saadan-saelger-du-din-bil",
    title: "How to get the best price when you sell your car",
    description: "Practical advice for selling your car: prepare it, gather the papers and be honest about faults.",
    lead: "A little preparation can give a better price and a faster deal.",
    updated: "2026-10-27",
    sections: [
      {
        h: "Get the car ready",
        list: ["Wash and vacuum the car, inside and out", "Remove personal items", "Fix small faults if it is cheap to do"],
      },
      {
        h: "Gather the papers",
        p: ["Find the service book, invoices and keys. A car with documented service is worth more to a buyer."],
      },
      {
        h: "Be honest about faults",
        p: ["Tell the buyer about damage and faults. It means fewer disagreements later and a safer deal for both sides."],
      },
      {
        h: "Know the value",
        p: ["Make, year, mileage and condition decide the price. Get a valuation before you decide. With us you get a price with no obligation."],
      },
      {
        h: "Remember loans and insurance",
        p: ["If you have a car loan it must be paid off in the deal. Cancel the insurance only when the car has been handed over and the papers are in order."],
      },
    ],
  },
  {
    slug: "benzin-diesel-hybrid-el",
    title: "Petrol, diesel, hybrid or electric – which suits you?",
    description: "A short guide to choosing a fuel type: yearly mileage, charging options and what the car will be used for.",
    lead: "The right choice depends on how much and how you drive.",
    updated: "2026-10-27",
    sections: [
      {
        h: "Petrol",
        p: ["Suits short trips and few kilometres per year. The cars are often cheaper to buy."],
      },
      {
        h: "Diesel",
        p: ["Often uses less fuel on long trips and motorways, which makes it popular with people who drive a lot."],
      },
      {
        h: "Hybrid",
        p: ["Combines a combustion engine and an electric motor. A plug-in hybrid gives the most if you can charge it at home and mostly drive short trips."],
      },
      {
        h: "Electric",
        p: ["Cheap and quiet to run if you can charge at home or at work. Think about range and access to charging before you choose."],
      },
      {
        h: "Ask yourself",
        list: ["How many kilometres do I drive per year?", "Can I charge the car at home?", "Do I mostly drive in town or on motorways?", "What is my budget for buying and running?"],
      },
    ],
  },
];

export const getGuides = (lang: Lang): Guide[] => (lang === "en" ? en : da);
export const getGuide = (lang: Lang, slug: string) => getGuides(lang).find((g) => g.slug === slug);
export const GUIDE_SLUGS = da.map((g) => g.slug);
