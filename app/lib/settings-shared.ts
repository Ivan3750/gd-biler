// Types and helpers that are safe to import from client components.
export type Bilingual = { da: string; en: string };
export type Hours = { closed: boolean; open: string; close: string };

export type Settings = {
  company: string;
  cvr: string;
  phone: string;
  email: string;
  street: string;
  zip: string;
  city: string;
  /** Monday first. */
  hours: Hours[];
  heroTitle: Bilingual;
  heroSubtitle: Bilingual;
  about: Bilingual;
  /** Shown as a bar above the header when not empty. */
  notice: Bilingual;
  facebook: string;
  instagram: string;
  /** Optional map position, used for search engines only. Leave empty if unsure. */
  lat: string;
  lng: string;
  currency: string;
  /** Default interest rate in the finance calculator, percent per year. */
  financeRate: number;
};

export const telHref = (phone: string) => `tel:${phone.replace(/[^+\d]/g, "")}`;
export const addressLine = (s: Pick<Settings, "street" | "zip" | "city">) => `${s.street}, ${s.zip} ${s.city}`;
