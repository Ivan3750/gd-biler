import { promises as fs } from "fs";
import path from "path";

import extras from "./sample-extras.json";
import seedCars from "./seed-cars.json";
import type { BodyType, Drive, Fuel, Gearbox } from "./fuels";

export { FUELS, BODY_TYPES, GEARBOXES, DRIVES, type Fuel, type BodyType, type Gearbox, type Drive } from "./fuels";

export type Car = {
  id: string;
  brand: string;
  model: string;
  year: number;
  km: number;
  fuel: Fuel;
  price: number;
  image: string;
  /** Extra gallery photos shown after `image`. */
  images?: string[];
  bodyType?: BodyType;
  gearbox?: Gearbox;
  drive?: Drive;
  powerHp?: number;
  /** Fuel consumption in km per litre. */
  kmPerL?: number;
  color?: string;
  /** Registration plate, e.g. "AB 12 345". */
  plate?: string;
  doors?: number;
  seats?: number;
  owners?: number;
  /** Free text, e.g. "03/2021". */
  firstRegistration?: string;
  /** One item per entry. */
  equipment?: string[];
  equipmentEn?: string[];
  /** True when the extra details are invented examples; the site marks them with an asterisk. */
  sampleData?: boolean;
  description: string;
  /** Optional English text; the Danish description is shown when empty. */
  descriptionEn?: string;
  published: boolean;
  createdAt: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "cars.json");
export const UPLOAD_DIR = path.join(DATA_DIR, "uploads");

const sample = extras as Record<string, Partial<Car>>;

/** The listings the site starts with (photos are in public/cars), so they also work on a read-only host such as Vercel. */
const SEED = seedCars as Car[];

async function write(cars: Car[]) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const tmp = `${FILE}.${process.pid}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(cars, null, 2), "utf8");
  await fs.rename(tmp, FILE);
}

/** All listings, newest first. The file is created from the seed on first use. */
export async function listCars(): Promise<Car[]> {
  let cars: Car[];
  try {
    cars = JSON.parse(await fs.readFile(FILE, "utf8"));
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code !== "ENOENT") throw e;
    cars = SEED;
    // A read-only filesystem must not take the whole site down.
    await write(cars).catch(() => {});
  }
  // Listings saved before plates existed get the example plate of their seed car.
  const withPlate = cars.map((c) => (c.plate || !sample[c.id]?.plate ? c : { ...c, plate: sample[c.id].plate, sampleData: true }));
  return withPlate.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function listPublishedCars() {
  return (await listCars()).filter((c) => c.published);
}

export async function getCar(id: string) {
  return (await listCars()).find((c) => c.id === id);
}

export async function saveCar(car: Car) {
  const cars = await listCars();
  const i = cars.findIndex((c) => c.id === car.id);
  if (i === -1) cars.push(car);
  else cars[i] = car;
  await write(cars);
}

export async function deleteCar(id: string) {
  const cars = await listCars();
  const car = cars.find((c) => c.id === id);
  if (!car) return;
  await write(cars.filter((c) => c.id !== id));
  await Promise.all(galleryOf(car).map(removeUpload));
}

export const PRICE_STEPS = [20000, 30000, 40000, 50000, 75000, 100000];
export const KM_STEPS = [25000, 50000, 100000, 150000];

export const galleryOf = (car: Car) => [car.image || "/cars/no-photo.svg", ...(car.images ?? [])];

/** Filters that take several values (checkboxes); a car matches when it has any of the chosen ones. */
export const LIST_FILTERS = ["brand", "fuel", "body", "gearbox", "drive", "color", "equipment"] as const;
export type ListFilter = (typeof LIST_FILTERS)[number];

/** Number filters (from/to fields). */
export const RANGE_FILTERS = [
  "minPrice", "maxPrice", "minYear", "maxYear", "minKm", "maxKm", "minHp", "maxHp", "minKmPerL", "minSeats", "maxOwners",
] as const;
export type RangeFilter = (typeof RANGE_FILTERS)[number];

export type CarFilters = {
  /** Free text: every word must appear in make, model, year, fuel, body type, colour, plate or equipment. */
  q?: string;
  sort?: string;
} & { [K in ListFilter]?: string[] } & { [K in RangeFilter]?: number };

/** The values a car has for a checkbox filter. */
export const valuesOf = (c: Car, key: ListFilter): string[] => {
  const v = key === "body" ? c.bodyType : key === "equipment" ? c.equipment : key === "brand" ? c.brand : c[key];
  return Array.isArray(v) ? v : v ? [v] : [];
};

const inRange = (v: number | undefined, min?: number, max?: number) =>
  (min === undefined && max === undefined) || (v !== undefined && (min === undefined || v >= min) && (max === undefined || v <= max));

/** Lower-case, without accents or punctuation, so "citroen", "i 10" and "Fiesta-1.0" all find what the visitor means. */
const fold = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();

export function filterCars(cars: Car[], f: CarFilters): Car[] {
  const words = fold(f.q ?? "").split(" ").filter(Boolean);
  const haystack = (c: Car) => {
    const text = fold(
      [c.brand, c.model, c.year, c.color, c.fuel, c.bodyType, c.gearbox, c.drive, c.plate, c.equipment?.join(" ")].filter(Boolean).join(" "),
    );
    return `${text} ${text.replace(/ /g, "")}`;
  };
  const out = cars.filter(
    (c) =>
      words.every((w) => haystack(c).includes(w)) &&
      LIST_FILTERS.every((k) => !f[k]?.length || f[k]!.some((x) => valuesOf(c, k).includes(x))) &&
      inRange(c.price, f.minPrice, f.maxPrice) &&
      inRange(c.year, f.minYear, f.maxYear) &&
      inRange(c.km, f.minKm, f.maxKm) &&
      inRange(c.powerHp, f.minHp, f.maxHp) &&
      inRange(c.kmPerL, f.minKmPerL) &&
      inRange(c.seats, f.minSeats) &&
      inRange(c.owners, undefined, f.maxOwners),
  );
  const by: Record<string, (a: Car, b: Car) => number> = {
    priceAsc: (a, b) => a.price - b.price,
    priceDesc: (a, b) => b.price - a.price,
    yearDesc: (a, b) => b.year - a.year || a.km - b.km,
    kmAsc: (a, b) => a.km - b.km,
    hpDesc: (a, b) => (b.powerHp ?? 0) - (a.powerHp ?? 0),
  };
  return f.sort && by[f.sort] ? out.sort(by[f.sort]) : out;
}

/** How many cars a checkbox would give: the other filters stay, this filter's own choice is ignored. */
export function facetCount(cars: Car[], f: CarFilters, key: ListFilter, value: string) {
  return filterCars(cars, { ...f, [key]: undefined }).filter((c) => valuesOf(c, key).includes(value)).length;
}

/** Deletes an uploaded image; bundled images under /cars are left alone. */
export async function removeUpload(image: string) {
  const m = /^\/uploads\/([a-f0-9-]{36}\.(?:jpg|png|webp))$/.exec(image);
  if (!m) return;
  await fs.rm(path.join(UPLOAD_DIR, m[1]), { force: true });
}

export const formatNumber = (n: number) => n.toLocaleString("da-DK");
