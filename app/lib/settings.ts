import { readJson, withLock, writeJson } from "./store";
import type { Hours, Settings } from "./settings-shared";

export { addressLine, telHref, type Bilingual, type Hours, type Settings } from "./settings-shared";

const FILE = "settings.json";

const day: Hours = { closed: false, open: "09:00", close: "17:00" };

export const DEFAULT_SETTINGS: Settings = {
  company: "GD Biler I/S",
  cvr: "44366452",
  phone: "+45 50 23 71 15",
  email: "kontakt@gdbiler.dk",
  street: "Langmarksvej 36A",
  zip: "8700",
  city: "Horsens",
  hours: Array.from({ length: 7 }, () => ({ ...day })),
  heroTitle: { da: "Find din næste bil hos GD Biler", en: "Find your next car at GD Biler" },
  heroSubtitle: {
    da: "Brugte kvalitetsbiler med fokus på tryghed og god service.",
    en: "Quality used cars with a focus on peace of mind and good service.",
  },
  about: {
    da: "GD Biler er en lokal bilforhandler i Horsens, der arbejder med nøje udvalgte brugte biler. Vi fokuserer på ærlig rådgivning, gennemsigtige handler og en enkel købsproces, så du kan føle dig tryg gennem hele forløbet – fra første kig til aflevering af nøgler.",
    en: "GD Biler is a local car dealer in Horsens that works with carefully selected used cars. We focus on honest advice, transparent deals and a simple buying process, so you feel safe all the way – from the first look to handing over the keys.",
  },
  notice: { da: "", en: "" },
  facebook: "",
  instagram: "",
  currency: "€",
  financeRate: 6.5,
};

export async function getSettings(): Promise<Settings> {
  const stored = await readJson<Partial<Settings>>(FILE);
  return {
    ...DEFAULT_SETTINGS,
    ...stored,
    hours: DEFAULT_SETTINGS.hours.map((d, i) => ({ ...d, ...stored?.hours?.[i] })),
  };
}

export function saveSettings(settings: Settings) {
  return withLock(FILE, () => writeJson(FILE, settings));
}
