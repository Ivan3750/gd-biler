import { listPublishedCars } from "@/app/lib/cars";
import { formatPrice } from "@/app/lib/i18n";
import { getSettings } from "@/app/lib/settings";
import { absoluteUrl, SITE_NAME } from "@/app/lib/seo";

export const dynamic = "force-dynamic";

/** Plain-text summary of the site for AI assistants (see llmstxt.org). */
export async function GET() {
  const [cars, s] = await Promise.all([listPublishedCars(), getSettings()]);
  const lines = [
    `# ${SITE_NAME}`,
    "",
    `> ${SITE_NAME} (${s.legalName}, CVR ${s.cvr}) is a used car dealer and workshop in ${s.city}, Denmark. Inspected used cars, honest advice, 3-month warranty, financing and car buy-back. Danish and English.`,
    "",
    `Address: ${s.street}, ${s.zip} ${s.city}, Denmark`,
    `Phone: ${s.phone}`,
    `Email: ${s.email}`,
    "Opening hours: Monday–Sunday 09:00–17:00",
    "",
    "## Pages",
    `- [Used cars for sale](${absoluteUrl("/biler")}): full stock with filters`,
    `- [Workshop](${absoluteUrl("/vaerksted")}): service and repairs`,
    `- [Sell your car](${absoluteUrl("/saelg-din-bil")}): we buy used cars`,
    `- [About us](${absoluteUrl("/om-os")})`,
    `- [Contact](${absoluteUrl("/kontakt")})`,
    `- [English version](${absoluteUrl("/en")}): same pages under /en`,
    "",
    "## Cars in stock",
    ...cars.map((c) => `- [${c.brand} ${c.model} ${c.year}](${absoluteUrl(`/biler/${c.id}`)}): ${c.km} km, ${c.fuel}, ${formatPrice(c.price, "en")}`),
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "content-type": "text/plain; charset=utf-8" } });
}
