import { readJson, writeJson } from "./store";

export type Subscriber = {
  id: string;
  createdAt: string;
  email: string;
  lang: string;
  /** Query string of the car search the person wanted news about, if any (e.g. "brand=BMW&maxPrice=40000"). */
  search?: string;
};

const FILE = "subscribers.json";

/** Newest first. */
export async function listSubscribers(): Promise<Subscriber[]> {
  const all = await readJson<Subscriber[]>(FILE, []);
  return [...all].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

/** Adds the address, or updates the saved search when it is already on the list. */
export async function addSubscriber(s: Subscriber) {
  const all = await readJson<Subscriber[]>(FILE, []);
  const i = all.findIndex((x) => x.email.toLowerCase() === s.email.toLowerCase());
  if (i === -1) all.push(s);
  else if (s.search) all[i] = { ...all[i], search: s.search };
  await writeJson(FILE, all);
}

export async function deleteSubscriber(id: string) {
  await writeJson(FILE, (await readJson<Subscriber[]>(FILE, [])).filter((x) => x.id !== id));
}
