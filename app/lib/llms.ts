import { carPath, carTitle, listPublicCars } from "./cars";
import { formatNumber } from "./format";
import { getDict, href, LANGS } from "./i18n";
import { infoLinks, legalPaths, mainLinks, afterLinks } from "./nav";
import { addressLine, getSettings } from "./settings";
import { getGuides } from "./guides";
import { SITE_URL } from "./site";
import { fillTokens } from "./text";

const abs = (path: string, lang: "da" | "en" = "da") => `${SITE_URL}${href(lang, path)}`;

/** Plain-text summary for AI assistants (llms.txt convention). `full` adds FAQ and policy text. */
export async function buildLlmsTxt(full: boolean): Promise<string> {
  const [settings, cars] = await Promise.all([getSettings(), listPublicCars()]);
  const da = getDict("da");
  const en = getDict("en");
  const fill = fillTokens(settings);
  const hours = settings.hours
    .map((h, i) => `${en.days[i]}: ${h.closed ? "closed" : `${h.open}-${h.close}`}`)
    .join("; ");

  const out: string[] = [];
  out.push(`# GD Biler`);
  out.push(``);
  out.push(
    `> GD Biler is a used car dealer in ${settings.city}, Denmark (Region Midtjylland). It sells carefully selected used cars, offers finance, buys cars from private sellers and can arrange delivery. The site is in Danish (default) and English.`,
  );
  out.push(
    `> GD Biler er en bilforhandler i ${settings.city}, der sælger nøje udvalgte brugte biler, tilbyder finansiering, køber biler og kan aftale levering.`,
  );
  out.push(``);
  out.push(`## Facts`);
  out.push(`- Company: ${settings.company}, CVR ${settings.cvr}`);
  out.push(`- Address: ${addressLine(settings)}, Denmark`);
  out.push(`- Phone: ${settings.phone}`);
  out.push(`- Email: ${settings.email}`);
  out.push(`- Opening hours: ${hours}`);
  out.push(`- Warranty: 3 months on cars; statutory consumer rights apply in addition`);
  out.push(`- Languages: Danish, English`);
  out.push(`- Service area: East Jutland (Horsens, Aarhus, Vejle, Skanderborg, Silkeborg); delivery can be arranged`);
  out.push(``);
  out.push(`## Cars in stock (${cars.length})`);
  if (cars.length === 0) out.push(`- No cars listed right now.`);
  for (const c of cars) {
    const bits = [
      `${c.year}`,
      `${formatNumber(c.km, "en")} km`,
      en.fuel[c.fuel],
      c.gearbox && en.gearbox[c.gearbox],
      c.body && en.body[c.body],
      `${formatNumber(c.price, "en")} ${settings.currency}`,
      c.status === "reserved" ? "reserved" : "available",
    ].filter(Boolean);
    out.push(`- [${carTitle(c)}](${abs(carPath(c))}): ${bits.join(", ")}`);
  }
  out.push(``);
  out.push(`## Pages`);
  for (const l of [...mainLinks, ...afterLinks]) {
    out.push(`- [${en.nav[l.key]} / ${da.nav[l.key]}](${abs(l.path)}) · [EN](${abs(l.path, "en")})`);
  }
  for (const l of infoLinks) {
    out.push(`- [${en.info.items[l.key]} / ${da.info.items[l.key]}](${abs(l.path)}) · [EN](${abs(l.path, "en")})`);
  }
  out.push(``);
  out.push(`## Guides`);
  for (const g of getGuides("en")) out.push(`- [${g.title}](${abs(`/guides/${g.slug}`, "en")}): ${g.description}`);
  out.push(``);
  out.push(`## Policies`);
  for (const p of legalPaths) out.push(`- ${abs(p)} · ${abs(p, "en")}`);

  if (full) {
    for (const lang of LANGS) {
      const d = getDict(lang);
      out.push(``);
      out.push(`## ${lang === "da" ? "Spørgsmål og svar" : "Questions and answers"} (${lang})`);
      for (const g of d.faq.groups) {
        for (const i of g.items) out.push(`### ${i.q}`, fill(i.a), ``);
      }
      for (const doc of [d.warranty, d.delivery]) {
        out.push(`## ${doc.title} (${lang})`);
        for (const s of doc.sections) out.push(`### ${s.h}`, ...s.p.map(fill), ``);
      }
    }
  }
  out.push(``);
  return out.join("\n");
}
