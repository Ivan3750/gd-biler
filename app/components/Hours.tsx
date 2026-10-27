import type { Dict } from "@/app/lib/i18n";
import type { Settings } from "@/app/lib/settings-shared";

/** Opening hours as a list, with today's row in bold. */
export function Hours({ settings, dict, tone = "light" }: { settings: Settings; dict: Dict; tone?: "light" | "dark" }) {
  // 0 = Sunday in JS, our list starts on Monday.
  const today = (new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Copenhagen" })).getDay() + 6) % 7;
  return (
    <ul className="space-y-2">
      {settings.hours.map((h, i) => (
        <li
          key={i}
          className={`flex justify-between gap-6 ${i === today ? "font-bold" : tone === "dark" ? "text-white/80" : "text-muted-foreground"}`}
        >
          <span>{dict.days[i]}</span>
          <span>{h.closed ? dict.common.closed : `${h.open} – ${h.close}`}</span>
        </li>
      ))}
    </ul>
  );
}
