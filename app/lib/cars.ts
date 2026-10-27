import { promises as fs } from "fs";
import path from "path";

import type { Fuel } from "./fuels";

export { FUELS, type Fuel } from "./fuels";

export type Car = {
  id: string;
  brand: string;
  model: string;
  year: number;
  km: number;
  fuel: Fuel;
  price: number;
  image: string;
  description: string;
  published: boolean;
  createdAt: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "cars.json");
export const UPLOAD_DIR = path.join(DATA_DIR, "uploads");

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
});

const SEED: Car[] = [
  seed("seed-audi", "audi.jpg", "Audi", "A6 55 TFSI e QUATTRO", 2021, 13500, "Benzin", 27000, 0),
  seed("seed-bmw-1", "bmw-1.jpg", "BMW", "330e", 2022, 14000, "Benzin", 25000, 1),
  seed("seed-bmw-2", "bmw-2.jpg", "BMW", "520d Steptronic", 2024, 32000, "Diesel", 42000, 2),
  seed("seed-bmw-3", "bmw-3.jpg", "BMW", "520d Steptronic", 2024, 38000, "Diesel", 44000, 3),
  seed("seed-bmw-4", "bmw-4.jpg", "BMW", "520d Steptronic", 2024, 50000, "Diesel", 42000, 4),
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
  await removeUpload(car.image);
}

/** Deletes an uploaded image; bundled images under /cars are left alone. */
export async function removeUpload(image: string) {
  const m = /^\/uploads\/([a-f0-9-]{36}\.(?:jpg|png|webp))$/.exec(image);
  if (!m) return;
  await fs.rm(path.join(UPLOAD_DIR, m[1]), { force: true });
}

export const formatNumber = (n: number) => n.toLocaleString("da-DK");
