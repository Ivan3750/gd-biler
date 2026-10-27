import { promises as fs } from "fs";
import path from "path";

export type Message = {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  email: string;
  topic: string;
  /** Id and label of the car the enquiry is about, if any. */
  carId?: string;
  carName?: string;
  message: string;
  /** Only for enquiries about selling a car. */
  regNo?: string;
  km?: string;
  lang: string;
  read: boolean;
};

const DATA_DIR = path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "messages.json");

async function write(messages: Message[]) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const tmp = `${FILE}.${process.pid}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(messages, null, 2), "utf8");
  await fs.rename(tmp, FILE);
}

/** Newest first. */
export async function listMessages(): Promise<Message[]> {
  try {
    const all: Message[] = JSON.parse(await fs.readFile(FILE, "utf8"));
    return all.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw e;
  }
}

export async function addMessage(m: Message) {
  await write([...(await listMessages()), m]);
}

export async function setMessageRead(id: string, read: boolean) {
  const all = await listMessages();
  await write(all.map((m) => (m.id === id ? { ...m, read } : m)));
}

export async function deleteMessage(id: string) {
  await write((await listMessages()).filter((m) => m.id !== id));
}
