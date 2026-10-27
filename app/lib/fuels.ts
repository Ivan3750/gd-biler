export const FUELS = ["Benzin", "Diesel", "Hybrid", "El"] as const;
export type Fuel = (typeof FUELS)[number];

export const BODY_TYPES = ["Sedan", "SUV", "Stationcar", "Hatchback", "Coupe", "Cabriolet", "Minivan"] as const;
export type BodyType = (typeof BODY_TYPES)[number];

export const GEARBOXES = ["Automatisk", "Manuel"] as const;
export type Gearbox = (typeof GEARBOXES)[number];

export const DRIVES = ["Forhjulstræk", "Baghjulstræk", "Firhjulstræk"] as const;
export type Drive = (typeof DRIVES)[number];
