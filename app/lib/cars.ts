import { promises as fs } from "fs";
import path from "path";

import extras from "./sample-extras.json";
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

const seed = (
  id: string,
  image: string,
  brand: string,
  model: string,
  year: number,
  km: number,
  fuel: Fuel,
  price: number,
  order: number,
  extra: Partial<Car> = {},
): Car => ({
  id,
  brand,
  model,
  year,
  km,
  fuel,
  price,
  image: `/cars/${image}`,
  description: "",
  published: true,
  createdAt: new Date(Date.UTC(2025, 0, 1) - order * 1000).toISOString(),
  ...extra,
  ...(sample[id] && { ...sample[id], sampleData: true }),
});

const SEED: Car[] = [
  seed("seed-audi", "audi.jpg", "Audi", "A6 55 TFSI e QUATTRO", 2021, 13500, "Benzin", 27000, 0),
  seed("seed-bmw-1", "bmw-1.jpg", "BMW", "330e", 2022, 14000, "Benzin", 25000, 1),
  seed("seed-bmw-2", "bmw-2.jpg", "BMW", "520d Steptronic", 2024, 32000, "Diesel", 42000, 2, { gearbox: "Automatisk" }),
  seed("seed-bmw-3", "bmw-3.jpg", "BMW", "520d Steptronic", 2024, 38000, "Diesel", 44000, 3, { gearbox: "Automatisk" }),
  seed("seed-bmw-4", "bmw-4.jpg", "BMW", "520d Steptronic", 2024, 50000, "Diesel", 42000, 4, { gearbox: "Automatisk" }),
  seed("seed-lexus", "lexus.jpg", "Lexus", "Lexus", 2024, 23000, "Diesel", 42000, 5),
];

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
  return [...cars].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
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

export const galleryOf = (car: Car) => [car.image, ...(car.images ?? [])];

export type CarFilters = {
  /** Free text: every word must appear in make, model, year or colour. */
  q?: string;
  brand?: string;
  fuel?: string;
  body?: string;
  gearbox?: string;
  maxPrice?: number;
  minYear?: number;
  maxKm?: number;
  sort?: string;
};

export function filterCars(cars: Car[], f: CarFilters): Car[] {
  const words = (f.q ?? "").toLowerCase().split(/\s+/).filter(Boolean);
  const haystack = (c: Car) => `${c.brand} ${c.model} ${c.year} ${c.color ?? ""}`.toLowerCase();
  const out = cars.filter(
    (c) =>
      words.every((w) => haystack(c).includes(w)) &&
      (!f.brand || c.brand === f.brand) &&
      (!f.fuel || c.fuel === f.fuel) &&
      (!f.body || c.bodyType === f.body) &&
      (!f.gearbox || c.gearbox === f.gearbox) &&
      (!f.maxPrice || c.price <= f.maxPrice) &&
      (!f.minYear || c.year >= f.minYear) &&
      (!f.maxKm || c.km <= f.maxKm),
  );
  const by: Record<string, (a: Car, b: Car) => number> = {
    priceAsc: (a, b) => a.price - b.price,
    priceDesc: (a, b) => b.price - a.price,
    yearDesc: (a, b) => b.year - a.year || a.km - b.km,
    kmAsc: (a, b) => a.km - b.km,
  };
  return f.sort && by[f.sort] ? out.sort(by[f.sort]) : out;
}

/** Deletes an uploaded image; bundled images under /cars are left alone. */
export async function removeUpload(image: string) {
  const m = /^\/uploads\/([a-f0-9-]{36}\.(?:jpg|png|webp))$/.exec(image);
  if (!m) return;
  await fs.rm(path.join(UPLOAD_DIR, m[1]), { force: true });
}

export const formatNumber = (n: number) => n.toLocaleString("da-DK");
