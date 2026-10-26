export const FUELS = ["Benzin", "Diesel", "Hybrid", "El"] as const;
export type Fuel = (typeof FUELS)[number];
