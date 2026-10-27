import { randomBytes } from "crypto";
import { readJson, withLock, writeJson } from "./store";
import { slugify } from "./format";
import { removeUpload } from "./uploads";
import {
  BODY_TYPES,
  FUELS,
  GEARBOXES,
  type BodyType,
  type CarStatus,
  type Fuel,
  type Gearbox,
  type Sort,
} from "./vehicle";

export type Car = {
  id: string;
  brand: string;
  model: string;
  year: number;
  km: number;
  fuel: Fuel;
  gearbox?: Gearbox;
  body?: BodyType;
  color?: string;
  hp?: number;
  price: number;
  /** First image is the cover. */
  images: string[];
  description: string;
  descriptionEn: string;
  status: CarStatus;
  published: boolean;
  createdAt: string;
  updatedAt?: string;
};

const FILE = "cars.json";

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
  images: [`/cars/${image}`],
  description: "",
  descriptionEn: "",
  status: "available",
  published: true,
  createdAt: new Date(Date.UTC(2025, 0, 1) - order * 1000).toISOString(),
  ...extra,
});

const SEED: Car[] = [
  seed("a6e0d1c2", "audi.jpg", "Audi", "A6 55 TFSI e QUATTRO", 2021, 13500, "Benzin", 27000, 0, { body: "Sedan", gearbox: "Automatisk" }),
  seed("b30e1f22", "bmw-1.jpg", "BMW", "330e", 2022, 14000, "Benzin", 25000, 1, { body: "Sedan", gearbox: "Automatisk" }),
  seed("b5201d33", "bmw-2.jpg", "BMW", "520d Steptronic", 2024, 32000, "Diesel", 42000, 2, { body: "Sedan", gearbox: "Automatisk" }),
  seed("b5202d44", "bmw-3.jpg", "BMW", "520d Steptronic", 2024, 38000, "Diesel", 44000, 3, { body: "Sedan", gearbox: "Automatisk" }),
  seed("b5203d55", "bmw-4.jpg", "BMW", "520d Steptronic", 2024, 50000, "Diesel", 42000, 4, { body: "Sedan", gearbox: "Automatisk" }),
  seed("1e805a66", "lexus.jpg", "Lexus", "Lexus", 2024, 23000, "Diesel", 42000, 5),
];

/** Fills in fields that listings saved by older versions of the admin do not have. */
function normalize(raw: Record<string, unknown>): Car {
  const r = raw as Partial<Car> & { image?: string };
  const images = Array.isArray(r.images) ? r.images : r.image ? [r.image] : [];
  return {
    id: String(r.id),
    brand: String(r.brand ?? ""),
    model: String(r.model ?? ""),
    year: Number(r.year) || 0,
    km: Number(r.km) || 0,
    fuel: FUELS.includes(r.fuel as Fuel) ? (r.fuel as Fuel) : "Benzin",
    gearbox: GEARBOXES.includes(r.gearbox as Gearbox) ? r.gearbox : undefined,
    body: BODY_TYPES.includes(r.body as BodyType) ? r.body : undefined,
    color: r.color || undefined,
    hp: r.hp ? Number(r.hp) : undefined,
    price: Number(r.price) || 0,
    images,
    description: r.description ?? "",
    descriptionEn: r.descriptionEn ?? "",
    status: r.status === "reserved" || r.status === "sold" ? r.status : "available",
    published: r.published !== false,
    createdAt: r.createdAt ?? new Date(0).toISOString(),
    updatedAt: r.updatedAt,
  };
}

async function readAll(): Promise<Car[]> {
  const stored = await readJson<Record<string, unknown>[]>(FILE);
  if (stored) return stored.map(normalize);
  // A read-only filesystem must not take the whole site down, so a failed seed write is ignored.
  await writeJson(FILE, SEED).catch(() => {});
  return SEED;
}

/** All listings, newest first. The file is created from the seed on first use. */
export async function listCars(): Promise<Car[]> {
  return (await readAll()).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

/** Listings visitors can see. Sold cars are kept off the lists but their pages still work. */
export async function listPublicCars() {
  return (await listCars()).filter((c) => c.published && c.status !== "sold");
}

export async function getCar(id: string) {
  return (await readAll()).find((c) => c.id === id);
}

export const newCarId = () => randomBytes(4).toString("hex");

export const carTitle = (c: Pick<Car, "brand" | "model">) => `${c.brand} ${c.model}`.trim();

/** URL segment: readable text plus the id, e.g. `bmw-520d-steptronic-2024-b5201d33`. */
export const carSlug = (c: Car) => `${slugify(`${carTitle(c)} ${c.year}`)}-${c.id}`;

export const carPath = (c: Car) => `/biler/${carSlug(c)}`;

/** Finds a car from its URL segment. The trailing id decides, so a changed title keeps old links working. */
export async function getCarBySlug(slug: string) {
  const cars = await readAll();
  return cars.find((c) => slug === c.id || slug.endsWith(`-${c.id}`));
}

export function saveCar(car: Car) {
  return withLock(FILE, async () => {
    const cars = await readAll();
    const i = cars.findIndex((c) => c.id === car.id);
    const next = { ...car, updatedAt: new Date().toISOString() };
    if (i === -1) cars.push(next);
    else cars[i] = next;
    await writeJson(FILE, cars);
  });
}

export function patchCar(id: string, patch: Partial<Car>) {
  return withLock(FILE, async () => {
    const cars = await readAll();
    const i = cars.findIndex((c) => c.id === id);
    if (i === -1) return;
    cars[i] = { ...cars[i], ...patch, updatedAt: new Date().toISOString() };
    await writeJson(FILE, cars);
  });
}

export function deleteCar(id: string) {
  return withLock(FILE, async () => {
    const cars = await readAll();
    const car = cars.find((c) => c.id === id);
    if (!car) return;
    await writeJson(FILE, cars.filter((c) => c.id !== id));
    await Promise.all(car.images.map(removeUpload));
  });
}

export type CarFilters = {
  q?: string;
  brand?: string;
  fuel?: string;
  body?: string;
  gearbox?: string;
  maxPrice?: number;
  minYear?: number;
  maxKm?: number;
  sort?: Sort;
};

export function filterCars(cars: Car[], f: CarFilters): Car[] {
  const q = f.q?.trim().toLowerCase();
  const out = cars.filter(
    (c) =>
      (!q || `${c.brand} ${c.model} ${c.year}`.toLowerCase().includes(q)) &&
      (!f.brand || c.brand === f.brand) &&
      (!f.fuel || c.fuel === f.fuel) &&
      (!f.body || c.body === f.body) &&
      (!f.gearbox || c.gearbox === f.gearbox) &&
      (!f.maxPrice || c.price <= f.maxPrice) &&
      (!f.minYear || c.year >= f.minYear) &&
      (!f.maxKm || c.km <= f.maxKm),
  );
  const by: Record<Sort, (a: Car, b: Car) => number> = {
    new: (a, b) => b.createdAt.localeCompare(a.createdAt),
    "price-asc": (a, b) => a.price - b.price,
    "price-desc": (a, b) => b.price - a.price,
    "year-desc": (a, b) => b.year - a.year,
    "km-asc": (a, b) => a.km - b.km,
  };
  return out.sort(by[f.sort ?? "new"]);
}

export const distinct = <T,>(values: (T | undefined)[]) => [...new Set(values.filter((v): v is T => v !== undefined))];
