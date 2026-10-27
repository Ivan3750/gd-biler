// Client-safe constants. The stored values are Danish and double as keys for the translated labels.
export const FUELS = ["Benzin", "Diesel", "Hybrid", "El"] as const;
export const GEARBOXES = ["Manuel", "Automatisk"] as const;
export const BODY_TYPES = ["Sedan", "SUV", "Stationcar", "Coupe", "Hatchback", "Cabriolet", "Van"] as const;
export const STATUSES = ["available", "reserved", "sold"] as const;

export type Fuel = (typeof FUELS)[number];
export type Gearbox = (typeof GEARBOXES)[number];
export type BodyType = (typeof BODY_TYPES)[number];
export type CarStatus = (typeof STATUSES)[number];

export const SORTS = ["new", "price-asc", "price-desc", "year-desc", "km-asc"] as const;
export type Sort = (typeof SORTS)[number];

export const MAX_IMAGES = 15;
