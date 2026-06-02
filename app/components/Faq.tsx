import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Tilbyder I finansiering på brugte biler?",
    a: "Ja. Vi samarbejder med flere af Danmarks førende banker og finansieringsselskaber og finder den løsning, der passer bedst til din økonomi.",
  },
  {
    q: "Giver I garanti på bilerne?",
    a: "Alle vores biler leveres med minimum 12 måneders garanti. Du kan altid tilkøbe udvidet garanti for ekstra tryghed.",
  },
  {
    q: "Tager I min nuværende bil i bytte?",
    a: "Ja, vi giver dig en fair og gennemsigtig byttepris med samme dag. Send os gerne oplysninger på forhånd via kontaktformularen.",
  },
  {
    q: "Leverer I biler i hele Danmark?",
    a: "Vi leverer gerne din nye bil direkte til døren – uanset om du bor i Aarhus, København eller andre steder i landet.",
  },
  {
    q: "Er bilerne synet og klargjort?",
    a: "Alle biler bliver synet, serviceret og grundigt klargjort, inden de overdrages til dig. Du modtager naturligvis fuld servicehistorik.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="bg-secondary py-24 lg:py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <div className="text-center mb-14">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
            Ofte stillede spørgsmål
          </span>
          <h2 className="mt-4 text-balance text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.02]">
            Det vil du gerne
            <br /> vide.
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="rounded-2xl border border-border bg-background px-6 lg:px-8 [&[data-state=open]]:shadow-soft"
            >
              <AccordionTrigger className="text-left text-base sm:text-lg font-semibold py-6 hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed text-base pb-6">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
