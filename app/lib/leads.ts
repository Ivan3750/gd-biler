import { randomBytes } from "crypto";
import { readJson, withLock, writeJson } from "./store";
import type { Lang } from "./i18n";

export const LEAD_TYPES = ["contact", "car", "sell", "finance", "testdrive"] as const;
export type LeadType = (typeof LEAD_TYPES)[number];
export type LeadStatus = "new" | "handled";

export type Lead = {
  id: string;
  type: LeadType;
  status: LeadStatus;
  createdAt: string;
  lang: Lang;
  name: string;
  email: string;
  phone: string;
  message: string;
  /** Set for questions about a specific car. */
  carId?: string;
  carTitle?: string;
  /** Extra answers from the sell and finance forms, shown as label/value pairs in the admin. */
  details?: Record<string, string>;
};

const FILE = "leads.json";

export async function listLeads(): Promise<Lead[]> {
  const leads = (await readJson<Lead[]>(FILE)) ?? [];
  return leads.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function addLead(lead: Omit<Lead, "id" | "status" | "createdAt">) {
  return withLock(FILE, async () => {
    const leads = (await readJson<Lead[]>(FILE)) ?? [];
    leads.push({ ...lead, id: randomBytes(6).toString("hex"), status: "new", createdAt: new Date().toISOString() });
    await writeJson(FILE, leads);
  });
}

export function setLeadStatus(id: string, status: LeadStatus) {
  return withLock(FILE, async () => {
    const leads = (await readJson<Lead[]>(FILE)) ?? [];
    const lead = leads.find((l) => l.id === id);
    if (!lead) return;
    lead.status = status;
    await writeJson(FILE, leads);
  });
}

export function deleteLead(id: string) {
  return withLock(FILE, async () => {
    const leads = (await readJson<Lead[]>(FILE)) ?? [];
    await writeJson(FILE, leads.filter((l) => l.id !== id));
  });
}
