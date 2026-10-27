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
`/admin` bruger de samme tokens, men er bevidst enkel: grå baggrund, hvide kort, `rounded-xl`, sidemenu.
Adgangskoden står i `ADMIN_PASSWORD` i `.env.local` (se `.env.example`).
Data gemmes i `data/` (`cars.json`, `leads.json`, `settings.json`, `uploads/`), uden for git.
