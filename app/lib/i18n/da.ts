import { daPages } from "./da-pages";

export const da = {
  ...daPages,
  siteName: "GD Biler",
  htmlLang: "da",
  skipToContent: "Gå til indhold",

  nav: {
    cars: "Biler",
    finance: "Finansiering",
    sell: "Sælg din bil",
    about: "Om os",
    contact: "Kontakt",
    menu: "Menu",
    close: "Luk",
    language: "English",
  },

  common: {
    call: "Ring til os",
    seeCars: "Se biler",
    seeAllCars: "Se alle biler",
    seeCar: "Se bilen",
    contactUs: "Kontakt os",
    home: "Forside",
    price: "Pris",
    km: "km",
    hp: "hk",
    closed: "Lukket",
    optional: "valgfri",
    required: "skal udfyldes",
    openHours: "Åbningstider",
    address: "Adresse",
    phone: "Telefon",
    email: "E-mail",
    page: "Side",
    previous: "Forrige",
    next: "Næste",
  },

  days: ["Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag", "Søndag"],

  fuel: { Benzin: "Benzin", Diesel: "Diesel", Hybrid: "Hybrid", El: "El" } as Record<string, string>,
  gearbox: { Manuel: "Manuel", Automatisk: "Automatisk" } as Record<string, string>,
  body: {
    Sedan: "Sedan",
    SUV: "SUV",
    Stationcar: "Stationcar",
    Coupe: "Coupé",
    Hatchback: "Hatchback",
    Cabriolet: "Cabriolet",
    Van: "Van",
  } as Record<string, string>,
  status: { available: "Til salg", reserved: "Reserveret", sold: "Solgt" } as Record<string, string>,

  home: {
    metaTitle: "Brugte biler i Horsens",
    search: {
      brand: "Mærke",
      body: "Type",
      price: "Maks. pris",
      allBrands: "Alle mærker",
      allTypes: "Alle typer",
      anyPrice: "Alle priser",
      button: "Søg biler",
    },
    book: "Book en tid",
    featured: { title: "Et udvalg fra vores showroom", empty: "Der er ingen biler på lager lige nu. Ring til os, så hjælper vi dig." },
    why: {
      title: "Tryghed, kvalitet og service",
      items: [
        {
          title: "Gennemgåede brugte biler",
          text: "Alle biler er grundigt tjekket, så du får en pålidelig bil uden ubehagelige overraskelser.",
        },
        {
          title: "Ærlige priser",
          text: "Vi sælger til fair og gennemsigtige priser – uden skjulte gebyrer eller ekstra omkostninger.",
        },
        {
          title: "Klar til kørsel",
          text: "Bilerne er klargjort og serviceret, så du kan sætte dig ind og køre med det samme.",
        },
      ],
    },
    about: { title: "Kvalitetsbiler i Horsens", more: "Læs mere om os" },
    stats: [
      { value: "100+", label: "Solgte biler" },
      { value: "98%", label: "Tilfredse kunder" },
      { value: "3 mdr.", label: "Garanti" },
      { value: "3+ år", label: "i branchen" },
    ],
    process: {
      title: "Sådan køber du",
      steps: [
        { title: "Find din bil", text: "Gennemse vores udvalg af nøje udvalgte brugte biler." },
        { title: "Book prøvetur", text: "Kom forbi vores showroom i Horsens og prøv bilen på vejen." },
        { title: "Aftal købet", text: "Vi gennemgår bilen sammen og gør handlen klar på en enkel og tryg måde." },
        { title: "Få nøglerne", text: "Vi klargør og leverer bilen, så du hurtigt kan køre afsted." },
      ],
    },
    services: {
      title: "Mere end biler",
      items: [
        { title: "Finansiering", text: "Beregn din månedlige ydelse og få et tilbud fra os.", cta: "Beregn ydelse", path: "/finansiering" },
        { title: "Sælg din bil", text: "Få en pris på din bil uden forpligtelser. Vi køber også biler med fejl.", cta: "Få en pris", path: "/saelg-din-bil" },
      ],
    },
    reviews: { title: "Hvad vores kunder siger", rating: "4,9 / 5", count: "50+ anmeldelser" },
    contact: { title: "Kom forbi showroomet", text: "Vi har åbent hver dag. Du er også velkommen til at ringe først." },
  },

  cars: {
    metaTitle: "Brugte biler til salg",
    metaDescription: "Se alle brugte biler til salg hos GD Biler i Horsens. Søg på mærke, brændstof, pris og årgang.",
    title: "Biler til salg",
    intro: "Brugte biler fra GD Biler i Horsens. Alle biler er gennemgået og klargjort, og du kan finansiere dem, få dem leveret eller give din gamle bil i bytte.",
    count: (n: number) => (n === 1 ? "1 bil" : `${n} biler`),
    filters: {
      search: "Søg",
      searchPlaceholder: "Mærke eller model",
      brand: "Mærke",
      fuel: "Brændstof",
      body: "Type",
      gearbox: "Gearkasse",
      maxPrice: "Maks. pris",
      minYear: "Fra årgang",
      maxKm: "Maks. km",
      sort: "Sortér",
      all: "Alle",
      any: "Alle",
      apply: "Vis biler",
      reset: "Nulstil",
      show: "Filtre",
    },
    sorts: {
      new: "Nyeste først",
      "price-asc": "Pris: lav til høj",
      "price-desc": "Pris: høj til lav",
      "year-desc": "Årgang: nyeste først",
      "km-asc": "Kilometer: færrest først",
    } as Record<string, string>,
    empty: "Ingen biler matcher din søgning.",
    emptyHint: "Prøv at fjerne et filter, eller ring til os – vi kan ofte finde en bil til dig.",
    noStock: "Der er ingen biler på lager lige nu. Ring til os, så hjælper vi dig.",
  },

  car: {
    back: "Alle biler",
    specs: "Specifikationer",
    year: "Årgang",
    km: "Kilometer",
    fuel: "Brændstof",
    gearbox: "Gearkasse",
    body: "Type",
    color: "Farve",
    hp: "Effekt",
    description: "Beskrivelse",
    noDescription: "Ring eller skriv til os, hvis du vil vide mere om bilen.",
    interested: "Interesseret i bilen?",
    interestedText: "Skriv til os, så vender vi tilbage hurtigst muligt. Du kan også ringe eller komme forbi og prøve bilen.",
    messagePlaceholder: (title: string) => `Hej, jeg er interesseret i ${title}. Kan I kontakte mig?`,
    financing: "Beregn finansiering",
    soldTitle: "Denne bil er solgt",
    soldText: "Se vores andre biler, eller skriv til os, hvis du søger en lignende.",
    reservedTitle: "Denne bil er reserveret",
    reservedText: "Skriv til os, hvis du vil stå først på ventelisten.",
    similar: "Lignende biler",
    gallery: { image: "Billede", of: "af", prev: "Forrige billede", next: "Næste billede" },
  },

  contact: {
    metaTitle: "Kontakt",
    metaDescription: "Kontakt GD Biler i Horsens. Ring, skriv eller kom forbi showroomet på Langmarksvej 36A.",
    title: "Kontakt os",
    lead: "Ring, skriv eller kom forbi. Vi svarer som regel samme dag.",
    form: "Send os en besked",
    findUs: "Find os",
  },

  map: {
    title: "Kort over GD Biler",
    consent: "Kortet er fra Google Maps. Når du viser det, sender din browser data til Google.",
    show: "Vis kort",
    open: "Åbn i Google Maps",
  },

  sell: {
    metaTitle: "Sælg din bil",
    metaDescription: "Sælg din bil til GD Biler i Horsens. Få en pris uden forpligtelser – vi køber også biler med fejl.",
    title: "Sælg din bil til os",
    lead: "Fortæl os om din bil, så vender vi tilbage med en pris. Det er gratis og uden forpligtelser.",
    steps: {
      title: "Sådan foregår det",
      items: [
        { title: "Send oplysninger", text: "Udfyld formularen med mærke, model, årgang og kilometer." },
        { title: "Få en pris", text: "Vi ringer eller skriver til dig, normalt inden for en hverdag." },
        { title: "Kom forbi", text: "Vi ser bilen sammen, og du får svar på stedet." },
        { title: "Få pengene", text: "Papirerne klarer vi. Pengene kommer, når handlen er på plads." },
      ],
    },
    form: "Oplysninger om din bil",
    fields: {
      brand: "Mærke",
      model: "Model",
      year: "Årgang",
      km: "Kilometer",
      price: "Dit prisønske",
      pricePlaceholder: "Valgfrit",
    },
    messageLabel: "Noget vi skal vide om bilen?",
    messagePlaceholder: "Fx stand, service, skader eller udstyr",
  },

  finance: {
    metaTitle: "Finansiering",
    metaDescription: "Beregn din månedlige ydelse på bilen og få et finansieringstilbud fra GD Biler i Horsens.",
    title: "Finansiering",
    lead: "Beregn, hvad bilen koster om måneden. Beregningen er vejledende – vi laver et konkret tilbud, når du har valgt bil.",
    calc: {
      title: "Beregn din ydelse",
      price: "Bilens pris",
      down: "Udbetaling",
      months: "Løbetid",
      monthsUnit: "mdr.",
      rate: "Rente pr. år",
      monthly: "Månedlig ydelse",
      financed: "Lånebeløb",
      interest: "Renter i alt",
      total: "Samlet tilbagebetaling",
      disclaimer:
        "Beregningen er et eksempel med fast rente og ingen gebyrer. Den faktiske rente og ydelse afhænger af din situation og bliver fastsat i det endelige tilbud.",
    },
    form: "Få et tilbud",
    formText: "Send os din beregning, så vender vi tilbage med et konkret tilbud.",
    messagePlaceholder: "Fortæl os gerne, hvilken bil du er interesseret i.",
    faq: {
      title: "Spørgsmål og svar",
      items: [
        {
          q: "Hvad skal jeg bruge for at få et tilbud?",
          a: "Send os dine kontaktoplysninger og en idé om bil, udbetaling og løbetid. Så vender vi tilbage med næste skridt.",
        },
        {
          q: "Kan jeg betale af på bilen før tid?",
          a: "Det afhænger af aftalen. Vi gennemgår vilkårene med dig, før du skriver under.",
        },
        {
          q: "Kan I overtage min nuværende bil?",
          a: "Ja, du kan give os din gamle bil i bytte. Brug siden Sælg din bil, så får du en pris.",
        },
      ],
    },
  },

  about: {
    metaTitle: "Om os",
    metaDescription: "GD Biler er en lokal bilforhandler i Horsens med nøje udvalgte brugte biler, ærlig rådgivning og en enkel købsproces.",
    title: "Om GD Biler",
    lead: "Lokal bilforhandler i Horsens, med fokus på tryghed.",
    values: { title: "Det går vi op i" },
    cta: { title: "Vil du se bilerne?", text: "Kom forbi showroomet eller se udvalget her på siden." },
  },

  form: {
    name: "Navn",
    email: "E-mail",
    phone: "Telefon",
    message: "Besked",
    consent: "Jeg accepterer, at GD Biler gemmer mine oplysninger for at kunne svare mig.",
    consentLink: "Læs privatlivspolitikken",
    submit: "Send",
    sending: "Sender…",
    successTitle: "Tak for din henvendelse",
    successText: "Vi har modtaget din besked og vender tilbage hurtigst muligt.",
    sendAnother: "Send en ny besked",
    errors: {
      name: "Skriv dit navn.",
      email: "Skriv en gyldig e-mailadresse.",
      phone: "Telefonnummeret ser ikke rigtigt ud.",
      message: "Skriv en besked på mindst 10 tegn.",
      consent: "Du skal acceptere, at vi gemmer dine oplysninger.",
      date: "Vælg en dato i dag eller senere (inden for de næste 4 måneder).",
      tooMany: "Du har sendt mange beskeder. Vent lidt og prøv igen.",
      generic: "Noget gik galt. Prøv igen, eller ring til os.",
      fields: "Udfyld felterne markeret med *.",
    },
  },

  footer: {
    about: "Bilforhandler i Horsens med fokus på kvalitet, finansiering og service.",
    menu: "Menu",
    contact: "Kontakt",
    hours: "Åbningstider",
    rights: "Alle rettigheder forbeholdes.",
    cvr: "CVR",
    legal: { returns: "Reklamation", terms: "Handelsbetingelser", privacy: "Privatlivspolitik", cookies: "Cookies" },
  },


  legal: {
    updated: "Sidst opdateret",
    terms: {
      slug: "handelsbetingelser",
      title: "Handelsbetingelser",
      description: "Handelsbetingelser for køb af brugte biler hos GD Biler.",
      updated: "27. oktober 2026",
      sections: [
        {
          h: "1. Generelt",
          p: [
            "Disse betingelser gælder for køb af biler hos {company}, CVR {cvr}, {address}.",
            "Bilerne på hjemmesiden er annoncerede med forbehold for fejl og for, at bilen kan være solgt. En annonce er ikke et bindende tilbud.",
          ],
        },
        {
          h: "2. Pris og betaling",
          p: [
            "Prisen er den pris, der står i købsaftalen. Priser, udstyr og kilometertal på hjemmesiden er vejledende, indtil købsaftalen er underskrevet.",
            "Betaling sker efter aftale, kontant, ved bankoverførsel eller via finansiering.",
          ],
        },
        {
          h: "3. Aflevering",
          p: ["Bilen afleveres klargjort på den aftalte dato. Ejerskifte og registrering aftales i købsaftalen."],
        },
        {
          h: "4. Reklamation og mangler",
          p: [
            "Handler du som forbruger, gælder købelovens regler om mangler og reklamation. Du skal give os besked inden for rimelig tid, efter du har opdaget en mangel.",
            "Eventuel garanti og dens omfang står i købsaftalen. Garantien begrænser ikke dine rettigheder som forbruger efter loven.",
          ],
        },
        {
          h: "5. Fortrydelsesret",
          p: [
            "Hvis du køber en bil ved at underskrive i vores showroom, er der ikke automatisk fortrydelsesret. Hvis aftalen indgås fjernt, får du besked om dine rettigheder, før du køber.",
          ],
        },
        {
          h: "6. Klager",
          p: [
            "Kontakt os først, hvis du er utilfreds, så prøver vi at løse det. Du kan også klage til Center for Klageløsning, Nævnenes Hus, Toldboden 2, 8800 Viborg, eller via naevneneshus.dk.",
          ],
        },
        {
          h: "7. Reservation og byttebil",
          p: [
            "Du kan aftale at reservere en bil. Vilkårene for reservationen, fx frist og eventuelt depositum, aftales skriftligt.",
            "Hvis du giver en bil i bytte, værdisætter vi den ud fra dens stand. Den endelige pris aftales, når vi har set bilen, og den skrives ind i købsaftalen.",
          ],
        },
        {
          h: "8. Virksomhedsoplysninger",
          p: ["{company}, CVR {cvr}, {address}. Telefon {phone}, e-mail {email}."],
        },
        {
          h: "9. Lovvalg",
          p: ["Danske regler gælder for aftalen."],
        },
      ],
    },
    privacy: {
      slug: "privatlivspolitik",
      title: "Privatlivspolitik",
      description: "Sådan behandler GD Biler dine personoplysninger.",
      updated: "27. oktober 2026",
      sections: [
        {
          h: "1. Dataansvarlig",
          p: ["{company}, CVR {cvr}, {address}. Du kan kontakte os på {email} eller {phone}."],
        },
        {
          h: "2. Hvilke oplysninger vi behandler",
          p: [
            "Når du bruger en formular på hjemmesiden, gemmer vi de oplysninger, du selv skriver: navn, e-mail, telefonnummer og din besked. Hvis du bruger formularen om salg af bil eller finansiering, gemmer vi også de oplysninger om bilen eller beregningen, du angiver.",
          ],
        },
        {
          h: "3. Formål og grundlag",
          p: [
            "Vi bruger oplysningerne til at besvare din henvendelse og følge op på den. Grundlaget er dit samtykke (GDPR art. 6, stk. 1, litra a) og, hvis henvendelsen handler om et køb eller salg, vores behov for at forberede en aftale med dig (art. 6, stk. 1, litra b).",
          ],
        },
        {
          h: "4. Hvor længe vi gemmer oplysningerne",
          p: ["Vi sletter din henvendelse, når den er afsluttet, og senest 12 måneder efter, vi har modtaget den. Oplysninger i en købsaftale gemmer vi, så længe loven kræver det."],
        },
        {
          h: "5. Hvem vi deler oplysningerne med",
          p: [
            "Vi sælger ikke dine oplysninger. Vi bruger en leverandør til at drive og hoste hjemmesiden. Leverandøren behandler kun oplysningerne efter vores instruks.",
            "Hvis du viser kortet på kontaktsiden, loader din browser indhold fra Google Maps. Så modtager Google oplysninger om dit besøg. Kortet vises kun, når du selv klikker på det.",
          ],
        },
        {
          h: "6. Serverlogs og sikkerhed",
          p: [
            "Vores hostingleverandør kan midlertidigt gemme tekniske oplysninger som IP-adresse og tidspunkt i serverlogs, så vi kan sikre og fejlsøge hjemmesiden. Vi bruger dem ikke til at følge dig på tværs af sider.",
            "Vi beskytter oplysningerne med adgangskontrol, og kun de medarbejdere, der behandler henvendelser, har adgang. Hjemmesiden bruger krypteret forbindelse (HTTPS).",
          ],
        },
        {
          h: "7. Dine rettigheder",
          p: [
            "Du kan bede om indsigt i, rettelse eller sletning af dine oplysninger, og du kan trække dit samtykke tilbage når som helst. Du kan også gøre indsigelse og bede om at få dine oplysninger udleveret. Kontakt os på {email}.",
            "Hvis du er utilfreds med, hvordan vi behandler dine oplysninger, kan du klage til Datatilsynet, Carl Jacobsens Vej 35, 2500 Valby, datatilsynet.dk.",
          ],
        },
      ],
    },
    cookies: {
      slug: "cookies",
      title: "Cookies",
      description: "Hvilke cookies GD Biler bruger.",
      updated: "27. oktober 2026",
      sections: [
        {
          h: "Vi bruger ikke sporing",
          p: [
            "Hjemmesiden sætter ingen cookies til statistik, markedsføring eller sporing af besøgende. Derfor har vi ikke et cookie-banner.",
          ],
        },
        {
          h: "Nødvendige cookies",
          p: ["Når personalet logger ind i administrationen, sætter vi en cookie, så systemet husker, at de er logget ind. Den bruges kun til login og slettes, når de logger ud."],
        },
        {
          h: "Google Maps",
          p: [
            "Kortet på kontaktsiden er fra Google. Det bliver kun indlæst, når du klikker på Vis kort. Google kan sætte egne cookies, når kortet er vist. Læs mere i Googles privatlivspolitik.",
          ],
        },
      ],
    },
  },
};
