// Longer page content (Danish). Kept apart from da.ts so both stay readable.
export const daPages = {
  info: {
    title: "Information",
    items: {
      howToBuy: "Sådan køber du",
      warranty: "Garanti og service",
      delivery: "Levering",
      faq: "Spørgsmål og svar",
      reviews: "Anmeldelser",
      local: "Bilforhandler i Horsens",
    },
  },

  trust: {
    title: "Et trygt bilkøb",
    items: [
      { title: "3 måneders garanti", text: "Vilkårene står i købsaftalen, så du ved, hvad der gælder.", path: "/garanti-og-service" },
      { title: "Finansiering", text: "Beregn ydelsen og få et konkret tilbud.", path: "/finansiering" },
      { title: "Levering", text: "Vi kan aftale levering, så du slipper for at hente bilen.", path: "/levering" },
    ],
  },

  areas: {
    title: "Vi sælger biler til hele Østjylland",
    text: "Vores showroom ligger i Horsens. Mange af vores kunder kommer fra Aarhus, Vejle, Silkeborg, Skanderborg og resten af Midtjylland, og vi kan aftale levering andre steder fra.",
    list: ["Horsens", "Aarhus", "Vejle", "Skanderborg", "Silkeborg", "Hedensted", "Odder", "Juelsminde"],
    link: "Læs mere om GD Biler i Horsens",
  },

  homeFaq: { title: "Ofte stillede spørgsmål", more: "Se alle spørgsmål" },

  faq: {
    metaTitle: "Spørgsmål og svar om bilkøb",
    metaDescription: "Svar på de mest stillede spørgsmål om at købe og sælge brugt bil hos GD Biler i Horsens: garanti, finansiering, levering, betaling og papirer.",
    title: "Spørgsmål og svar",
    lead: "Her finder du svar på det, vi oftest bliver spurgt om. Mangler du noget, så ring eller skriv til os.",
    groups: [
      {
        title: "Køb af bil",
        items: [
          {
            q: "Kan jeg prøvekøre bilen?",
            a: "Ja. Ring eller skriv til os, så aftaler vi et tidspunkt. Du kan også bare komme forbi showroomet i åbningstiden.",
          },
          {
            q: "Hvad skal jeg have med, når jeg køber bil?",
            a: "Medbring gyldigt kørekort eller andet billed-id. Du skal have tegnet en forsikring på bilen, før den kan registreres på dit navn. Vi hjælper dig med resten af papirerne.",
          },
          {
            q: "Hvordan kan jeg betale?",
            a: "Du kan betale kontant, med bankoverførsel eller via finansiering. Vi aftaler betalingen, før du får nøglerne.",
          },
          {
            q: "Er bilerne gennemgået?",
            a: "Ja. Vi gennemgår og klargør bilerne, så de er klar til kørsel, når du henter dem. Spørg os, hvis du vil vide mere om en bestemt bil.",
          },
          {
            q: "Kan jeg få bilen leveret?",
            a: "Ja, vi kan aftale levering. Skriv eller ring, så finder vi ud af, hvad det kræver, hvor du bor.",
          },
        ],
      },
      {
        title: "Garanti og reklamation",
        items: [
          {
            q: "Hvilken garanti følger med bilen?",
            a: "Vores biler har 3 måneders garanti. Vilkårene og omfanget står i købsaftalen. Garantien er ud over dine rettigheder efter loven.",
          },
          {
            q: "Hvad er reklamationsretten?",
            a: "Som forbruger har du ifølge købeloven som udgangspunkt 2 års reklamationsret. For brugte biler kan det aftales, at fristen er kortere, dog mindst 1 år. Det skal stå tydeligt i købsaftalen.",
          },
          {
            q: "Hvad gør jeg, hvis der er noget galt med bilen?",
            a: "Kontakt os hurtigst muligt, når du opdager fejlen. Beskriv, hvad der er galt, og send gerne billeder. Læs mere på siden om reklamation og fortrydelse.",
          },
        ],
      },
      {
        title: "Finansiering og bytte",
        items: [
          {
            q: "Kan jeg finansiere bilen?",
            a: "Ja. Brug beregneren på siden Finansiering og send os din beregning, så laver vi et konkret tilbud. Beregneren er vejledende.",
          },
          {
            q: "Kan jeg give min gamle bil i bytte?",
            a: "Ja. Udfyld formularen på siden Sælg din bil, så får du en pris. Vi kan trække beløbet fra prisen på den nye bil.",
          },
          {
            q: "Køber I også biler med fejl?",
            a: "Ja. Beskriv fejlene i formularen, så giver vi dig en pris ud fra bilens stand.",
          },
        ],
      },
      {
        title: "Om GD Biler",
        items: [
          {
            q: "Hvor ligger GD Biler?",
            a: "Vi ligger på {address}. Showroomet har åbent alle ugens dage. Se åbningstiderne på kontaktsiden.",
          },
          {
            q: "Hvordan kontakter jeg jer?",
            a: "Ring på {phone}, skriv til {email}, eller brug kontaktformularen. Vi svarer som regel samme dag.",
          },
        ],
      },
    ],
  },

  howToBuy: {
    metaTitle: "Sådan køber du brugt bil",
    metaDescription: "Se hvordan du køber brugt bil hos GD Biler i Horsens: fra valg af bil og prøvetur til betaling, papirer og aflevering.",
    title: "Sådan køber du bil hos os",
    lead: "Fra første kig til du kører væk. Sådan foregår det, og det skal du have med.",
    stepsTitle: "Fra bil til nøgler",
    steps: [
      { title: "Find en bil", text: "Gennemse vores biler på siden. Brug filtrene til at finde mærke, pris og årgang." },
      { title: "Kontakt os", text: "Skriv eller ring, hvis du har spørgsmål til bilen. Du får svar på udstyr, stand og historik." },
      { title: "Prøv bilen", text: "Kom forbi showroomet og prøvekør. Tag gerne en med, du stoler på." },
      { title: "Aftal prisen og betalingen", text: "Vi gennemgår bilen og købsaftalen sammen. Du vælger, om du betaler kontant eller finansierer." },
      { title: "Papirer og forsikring", text: "Vi hjælper med papirerne. Du skal have tegnet en forsikring, før bilen kan registreres." },
      { title: "Få nøglerne", text: "Bilen er klargjort, og du kører væk. Eller vi leverer den til dig." },
    ],
    bring: {
      title: "Det skal du have med",
      items: ["Gyldigt kørekort eller andet billed-id", "Oplysninger om din forsikring, eller kontakt dit forsikringsselskab, før du henter bilen", "Betalingsmiddel eller aftale om finansiering", "Din gamle bil og dens papirer, hvis du bytter"],
    },
    after: {
      title: "Efter købet",
      text: "Du har 3 måneders garanti og dine rettigheder efter loven. Kontakt os, hvis du får brug for hjælp.",
    },
  },

  warranty: {
    metaTitle: "Garanti og service",
    metaDescription: "Læs om garantien på brugte biler hos GD Biler i Horsens: 3 måneders garanti, reklamationsret og hvad du gør, hvis der er noget galt.",
    title: "Garanti og service",
    lead: "Du skal kunne stole på bilen. Her kan du læse, hvad der følger med.",
    sections: [
      {
        h: "3 måneders garanti",
        p: [
          "Bilerne hos GD Biler har 3 måneders garanti. Omfanget og vilkårene står i købsaftalen, så du kan læse dem, før du underskriver.",
          "Garantien er ud over dine rettigheder efter loven. Den fjerner dem ikke.",
        ],
      },
      {
        h: "Dine rettigheder efter loven",
        p: [
          "Som forbruger har du reklamationsret efter købeloven. Den er som udgangspunkt 2 år. For brugte biler kan det aftales, at fristen er kortere, dog mindst 1 år, hvis det står tydeligt i købsaftalen.",
          "Du skal reklamere inden for rimelig tid, efter du har opdaget fejlen. Det er som udgangspunkt rettidigt, hvis du gør det inden 2 måneder.",
        ],
      },
      {
        h: "Gennemgang før salg",
        p: ["Vi gennemgår og klargør bilerne, før de bliver annonceret. Har bilen kendte fejl eller skader, fortæller vi det, før du køber."],
      },
      {
        h: "Hvis der er noget galt",
        p: ["Kontakt os på telefon eller e-mail. Skriv, hvad der er galt, og send gerne billeder. Vi svarer hurtigst muligt og aftaler, hvordan vi ser på bilen."],
      },
    ],
    cta: "Læs mere om reklamation og fortrydelse",
  },

  delivery: {
    metaTitle: "Levering af bil",
    metaDescription: "GD Biler kan levere din bil i hele Østjylland og videre. Se hvordan levering foregår, og hvad du skal aftale med os.",
    title: "Levering af bil",
    lead: "Bor du langt fra Horsens? Vi kan aftale levering.",
    sections: [
      {
        h: "Sådan foregår det",
        p: [
          "Du aftaler bilen og prisen med os, som du plejer. Derefter aftaler vi tid og sted for leveringen. Papirerne ordner vi, så de er klar, når bilen kommer.",
          "Prisen på levering afhænger af, hvor langt bilen skal køre. Spørg os, så får du en pris, før du bestemmer dig.",
        ],
      },
      {
        h: "Betaling",
        p: ["Vi aftaler betalingen, før bilen sendes af sted."],
      },
      {
        h: "Du kan stadig komme forbi",
        p: ["Du er altid velkommen til at se og prøve bilen i vores showroom i Horsens, før du bestemmer dig."],
      },
    ],
  },

  reviews: {
    metaTitle: "Anmeldelser og kundeudtalelser",
    metaDescription: "Læs hvad kunder siger om at købe bil hos GD Biler i Horsens.",
    title: "Hvad vores kunder siger",
    lead: "Her er nogle af de ord, vi har fået fra kunder, der har købt bil hos os.",
  },

  local: {
    metaTitle: "Brugt bil i Horsens – bilforhandler GD Biler",
    metaDescription: "GD Biler er en lokal bilforhandler i Horsens med nøje udvalgte brugte biler. Se biler til salg, finansiering og åbningstider på Langmarksvej 36A.",
    title: "Bilforhandler i Horsens",
    lead: "GD Biler sælger nøje udvalgte brugte biler fra et showroom i Horsens.",
    sections: [
      {
        h: "Brugte biler i Horsens",
        p: [
          "Hos GD Biler finder du brugte biler fra kendte mærker som Audi, BMW og Lexus. Vi vælger bilerne med omhu, gennemgår dem og klargør dem, så de er klar til kørsel.",
          "Du kan se alle biler på vores hjemmeside og komme forbi showroomet for at prøve dem.",
        ],
      },
      {
        h: "Finansiering og bytte",
        p: ["Vi hjælper med finansiering, og du kan få en pris på din gamle bil. Brug beregneren eller formularen på siderne om finansiering og salg."],
      },
      {
        h: "Kom forbi",
        p: ["Showroomet ligger på {address}. Ring på {phone}, hvis du vil aftale en tid. Vi har åbent alle ugens dage; se tiderne nedenfor."],
      },
    ],
    cta: "Se alle biler",
  },

  brand: {
    metaTitle: (brand: string) => `Brugt ${brand} til salg i Horsens`,
    metaDescription: (brand: string, n: number) =>
      `Se ${n} brugte ${brand} til salg hos GD Biler i Horsens. Priser, årgang, kilometer og finansiering.`,
    title: (brand: string) => `Brugt ${brand} til salg`,
    lead: (brand: string) => `Her er alle ${brand}, vi har på lager lige nu. Listen opdateres, når vi får nye biler.`,
    otherBrands: "Andre mærker",
    intro: (brand: string) =>
      `Leder du efter en brugt ${brand}? GD Biler i Horsens gennemgår og klargør bilerne, så de er klar til kørsel. Du kan finansiere bilen, give din gamle bil i bytte og få den leveret.`,
  },

  crumbs: { cars: "Biler", brand: "Mærker" },

  carExtra: {
    features: "Udstyr",
    safe: "Trygt køb",
    next: "Sådan går du videre",
    nextSteps: ["Skriv eller ring, hvis du har spørgsmål", "Kom forbi og prøv bilen", "Aftal købet og betalingen", "Få nøglerne eller aftal levering"],
    share: "Del bilen",
    copied: "Linket er kopieret",
    copy: "Kopiér link",
  },

  mobileBar: { call: "Ring", write: "Skriv", cars: "Biler" },

  returns: {
    slug: "reklamation-og-fortrydelse",
    title: "Reklamation og fortrydelse",
    description: "Sådan reklamerer du, og hvornår du kan fortryde et køb hos GD Biler.",
    updated: "27. oktober 2026",
    sections: [
      {
        h: "1. Reklamation",
        p: [
          "Som forbruger har du reklamationsret efter købeloven. Fristen er som udgangspunkt 2 år fra du modtager bilen. For brugte biler kan en kortere frist på mindst 1 år aftales, hvis det står tydeligt i købsaftalen.",
          "Hvis bilen har en mangel, kan du som udgangspunkt kræve, at vi afhjælper den eller leverer en ny bil. Hvis det ikke kan lade sig gøre, kan du kræve forholdsmæssigt afslag i prisen eller i nogle tilfælde hæve købet.",
        ],
      },
      {
        h: "2. Sådan reklamerer du",
        p: [
          "Du skal give os besked inden for rimelig tid, efter du har opdaget fejlen. Det er rettidigt, hvis du gør det inden 2 måneder.",
          "Kontakt os på {phone} eller {email}. Beskriv fejlen, og send gerne billeder. Vi aftaler, hvordan vi undersøger bilen.",
        ],
      },
      {
        h: "3. Garanti",
        p: ["Vores garanti på 3 måneder gælder ud over dine lovbestemte rettigheder. Vilkårene står i købsaftalen."],
      },
      {
        h: "4. Fortrydelsesret ved køb på afstand",
        p: [
          "Hvis du køber bilen uden at være fysisk til stede, fx udelukkende via telefon eller e-mail, har du som forbruger som udgangspunkt 14 dages fortrydelsesret fra den dag, du modtager bilen. Du skal give os en klar besked om, at du fortryder.",
          "Hvis du køber bilen ved at underskrive i vores showroom, har du ikke automatisk fortrydelsesret. Det fortæller vi dig, før du køber.",
        ],
      },
      {
        h: "5. Klager",
        p: [
          "Kontakt os først, så prøver vi at løse det. Du kan også klage til Center for Klageløsning, Nævnenes Hus, Toldboden 2, 8800 Viborg, naevneneshus.dk.",
        ],
      },
    ],
  },

  company: {
    title: "Virksomhedsoplysninger",
    text: "{company}, CVR {cvr}, {address}. Telefon {phone}, e-mail {email}.",
  },

  contactExtra: {
    helpTitle: "Det kan vi hjælpe med",
    helpItems: [
      "Spørgsmål til en bil på lager",
      "Aftale om prøvetur eller fremvisning",
      "Finansiering og tilbud",
      "Pris på din gamle bil",
      "Reklamation og hjælp efter købet",
    ],
    replyTitle: "Svartid",
    replyText: "Vi svarer som regel samme dag. Haster det, så ring til os.",
  },

  sellExtra: {
    whyTitle: "Derfor sælge til GD Biler",
    why: [
      { title: "Pris uden forpligtelser", text: "Du får en pris og bestemmer selv, om du vil sælge." },
      { title: "Vi køber også biler med fejl", text: "Beskriv fejlene, så vurderer vi bilen ud fra dens stand." },
      { title: "Vi klarer papirerne", text: "Du slipper for at køre rundt med annoncer og fremvisninger." },
      { title: "Bytte i en ny bil", text: "Du kan trække værdien fra prisen på en af vores biler." },
    ],
    faqTitle: "Spørgsmål om salg",
    faq: [
      { q: "Hvad er min bil værd?", a: "Det afhænger af mærke, model, årgang, kilometer og stand. Send os oplysningerne, så giver vi dig en pris." },
      { q: "Skal jeg komme forbi med bilen?", a: "Ja, vi vil gerne se bilen, før vi giver en endelig pris. Vi aftaler et tidspunkt, der passer dig." },
      { q: "Hvad hvis jeg har et billån?", a: "Det kan vi som regel klare. Fortæl os det i formularen, så hjælper vi dig med at indfri lånet i handlen." },
    ],
  },

  financeExtra: {
    howTitle: "Sådan fungerer det",
    how: [
      { title: "Beregn", text: "Vælg pris, udbetaling og løbetid, og se ydelsen." },
      { title: "Send", text: "Send din beregning og dine kontaktoplysninger til os." },
      { title: "Få et tilbud", text: "Vi vender tilbage med et konkret tilbud, som du kan sige ja eller nej til." },
    ],
  },

  aboutExtra: {
    principlesTitle: "Vores principper",
    principles: [
      { title: "Ærlighed", text: "Vi fortæller, hvad vi ved om bilen, også det der ikke er perfekt." },
      { title: "Gennemgang", text: "Vi gennemgår og klargør bilerne, før de bliver annonceret." },
      { title: "Enkelhed", text: "Du får en klar pris og en købsaftale, du kan forstå." },
      { title: "Service", text: "Du kan ringe til os, også efter købet." },
    ],
    factsTitle: "Fakta om GD Biler",
    facts: { name: "Navn", cvr: "CVR", address: "Adresse", hours: "Åbent" },
    openEveryDay: "Hver dag",
  },
};
