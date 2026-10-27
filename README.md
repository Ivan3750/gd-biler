# GD Biler

Hjemmeside og admin for GD Biler (Next.js 16, Tailwind 4). Stilguide: `STYLE.md`.

## Kør lokalt
```bash
npm install
cp .env.example .env.local   # sæt ADMIN_PASSWORD
npm run dev
```

## Sider
Dansk ligger i roden, engelsk under `/en` (`proxy.ts` omskriver begge til `app/[lang]`).
`/`, `/biler`, `/biler/[bil]`, `/finansiering`, `/saelg-din-bil`, `/om-os`, `/kontakt`,
`/book-proevetur`, `/guides`, `/faq`, `/biler/maerke|type|braendstof/...`, juridiske sider, `sitemap.xml`, `robots.txt`, `llms.txt`.
Tekster: `app/lib/i18n/da.ts` og `en.ts`.

## Admin (`/admin`)
Overblik, biler (flere billeder, status til salg/reserveret/solgt, søg og filtrer),
henvendelser fra formularerne, indstillinger (kontakt, åbningstider, tekster, meddelelse).

## Data
Alt gemmes som filer i `data/` (eller `DATA_DIR`): `cars.json`, `leads.json`, `settings.json`, `uploads/`.
Læg mappen på et vedvarende drev og tag backup af den. Sæt `ADMIN_PASSWORD` og `NEXT_PUBLIC_SITE_URL` på serveren.
