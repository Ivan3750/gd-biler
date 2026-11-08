# GD Biler – stilguide

Kort beskrivelse af sidens visuelle sprog. Alle værdier ligger som tokens i `app/globals.css`
og bruges via Tailwind-klasser (`bg-navy`, `text-muted-foreground`, `bg-brand` osv.).

## Stemning
Lokal, jordnær bilforhandler. Enkelt og læsbart: hvid og lysegrå flader, marineblå i top og bund,
en enkelt varm accent. Ingen glas-effekter, ingen gradienter, ingen svævende kort.

## Farver
| Token | Brug |
|---|---|
| `background` / `foreground` | Hvid side, næsten sort tekst |
| `primary` | Sort – primære knapper, footer |
| `secondary` / `muted` | Lysegrå flader (`bg-secondary`) |
| `muted-foreground` | Brødtekst i andenrang, labels |
| `navy` | Mørk marineblå – hero, proces, kontakt |
| `brand` | Varm kobber/rav – KUN små detaljer (prikker, streger, markeringer) |
| `border` | Tynde grå kanter |

Regel: `brand` må ikke bruges til store flader eller brødtekst.

## Typografi
- Skrift: Geist (`--font-geist-sans`), indlæst i `app/layout.tsx`.
- Overskrifter: `font-bold`, normal linjehøjde. Ingen små versal-labels over overskrifter.
- Brødtekst: `text-lg leading-relaxed` i `muted-foreground`.

## Form
- Radius: lille (`rounded-md`) på kort, billeder og knapper. Ingen pille-knapper.
- Kanter (`border-border`) frem for skygger. Ingen hover-løft eller zoom.
- Accent (`brand`): kun en tynd streg over/ved siden af tekstblokke og tal.

## Layout
- Container: `mx-auto max-w-6xl px-6 lg:px-10`.
- Sektioner: `py-16 lg:py-20`, skiftevis hvid / `bg-secondary`.
- Gitter: 1 kolonne mobil, 2 på `md`, 3 på `lg`.

## Komponenter
- Primær knap: `rounded-md bg-primary text-primary-foreground px-6 py-3 text-[15px] font-semibold`.
- Sekundær knap: samme størrelse med `border border-border`.
- Sektionsoverskrift: `text-2xl font-bold sm:text-3xl`, uden lille label over.
- Header: hvid, `sticky`, med smal navy-stribe med adresse og telefon. Footer: navy, fire kolonner.

## Tekst og sprog
Dansk, direkte og som man siger det i samtale. Korte sætninger. Ingen salgsfraser.

## Admin
`/admin` bruger de samme tokens, men er bevidst enkel: grå baggrund, hvide kort, `rounded-xl`.
Adgangskoden står i `ADMIN_PASSWORD` i `.env.local` (se `.env.example`).
Annoncer gemmes i `data/cars.json`, uploadede billeder i `data/uploads/` (begge uden for git).

## Opdatering: premium / Shopify-look
Siden er løftet til et mere moderne udtryk (afløser reglerne "ingen glas, ingen hover-løft, ingen pille-knapper" ovenfor):
- Store runde kort (`rounded-3xl`), pille-knapper, `glass` på mørke flader, `mesh`-gradient på lyse sektioner.
- Bevægelse: `.reveal` (scroll-indtoning), `.shop-card` (hover-løft), `.btn-sheen` (glans), `.animate-kenburns`, mærkestrimmel. Alt slås fra ved `prefers-reduced-motion`.
- Fælles byggeklodser ligger i `app/components/shop.tsx` (SectionHead, Figures, ServiceBento, Areas, ChatDemo, Steps, FeatureGrid, CtaBand, FormSection). Nummerplade: `Plate.tsx`.
- Tekster til finansiering, garanti, levering og juridiske sider: `app/lib/pages.ts` (dansk + engelsk).
- Tone som webhjerte.dk: direkte, personlig, faste løfter og tal i stedet for salgsfraser.

## Opdatering: katalog og bevægelse
- Søgning på `/biler`: hvid pille-søgebar (`.search-input`) og sorteringsvalg (`.search-select`) på navy, med hurtigvalg (`.quick-chip`) for mærker og drivmidler. Et hurtigvalg slår kun det ene valg til/fra og beholder resten.
- Fritekst ignorerer store/små bogstaver, accenter og tegnsætning ("citroen" finder Citroën, "i10" finder "i10 1.0") og søger i mærke, model, årgang, farve, drivmiddel, biltype, gear, nummerplade og udstyr.
- Bilkort: små piller for årgang, km og drivmiddel; billedet zoomer let ved hover; kortene toner ind efter hinanden (`animate-fade-up` med forsinkelse). Første billede i hver annonce er bilen set forfra.
- Biler uden billede viser `/cars/no-photo.svg`; biler uden pris viser "Ring for pris".
- Ny bevægelse: `.quick-chip` (hover/tryk), `.animate-pop`, glidende scroll. Alt slås fra ved `prefers-reduced-motion`.
- Annoncerne ligger som startdata i `app/lib/seed-cars.json` (billeder i `public/cars/`), så de også virker på Vercel.

## Opdatering: priser, billeder og nummerplader
- Priser vises i kr. (DKK) overalt (`formatPrice` i `app/lib/i18n.ts`). Klik på en pris kopierer den (`Price.tsx`), med en kort "Kopieret"-bekræftelse.
- Billeder vises helt: `object-contain` oven på en sløret kopi af samme billede (`.photo-blur`), så hele bilen ses uanset format. Kortbilleder er 4:5, galleriet er kvadratisk.
- Nummerplade (`Plate.tsx`): blå EU-stribe med stjerner, hævede tegn og et lysglimt ved hover. Vises på alle bilkort.
- `.aurora`: langsomt bevægende farveglød bag den mørke banner på kataloget.

## Opdatering: bilkort og nummerplader
- Bilkort: hvidt kort med lille indre ramme, foto i 4:5 uden sløring (fotos er stående, så næsten hele bilen ses), mærke og antal billeder som mørke glas-piller, spec-linje "år · km · brændstof", stor pris og en rund pil-knap.
- Nummerplade (`Plate.tsx`): ren hvid plade med blå EU-stribe, 12 gule stjerner og monospace-tegn. Klik kopierer nummeret uden mellemrum og viser "Kopieret" (`useCopy.ts`). Nummerpladen kan også søges i kataloget.
- Annoncedata (effekt, første indregistrering, farve, træk, døre, sæder, seneste syn) er hentet fra de offentlige køretøjsdata for hver nummerplade og stemt af mod billeder og mails. Renault Clio: registret siger sort, billederne viser rød, så farve er udeladt.
