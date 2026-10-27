import type { LeadType } from "@/app/lib/leads";

export const LEAD_LABEL: Record<LeadType, string> = {
  contact: "Kontakt",
  car: "Bil",
  sell: "Salg af bil",
  finance: "Finansiering",
  testdrive: "Prøvetur",
};
