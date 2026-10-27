"use server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/app/lib/auth";
import { removeUpload } from "@/app/lib/cars";
import { dict, flatten, loadOverrides, saveOverrides, type Overrides } from "@/app/lib/content";
import { IMAGE_SLOTS } from "@/app/lib/images";
import { DEFAULT_SETTINGS, getSettings, saveSettings } from "@/app/lib/settings";
import { storeImage } from "@/app/lib/uploads";

export type SaveState = { ok?: boolean; error?: string } | null;

const text = (f: FormData, k: string, max = 200) => String(f.get(k) ?? "").trim().slice(0, max);

/** Everything on the public site may have changed, so refresh every page. */
const refreshSite = () => revalidatePath("/", "layout");

// ---------- Texts

export async function saveContentAction(_: SaveState, formData: FormData): Promise<SaveState> {
  await requireAdmin();
  const section = text(formData, "section", 40);
  if (!(section in dict.da)) return { error: "Ukendt afsnit." };

  const overrides = await loadOverrides();
  const next: Overrides = { da: { ...overrides.da }, en: { ...overrides.en } };

  for (const lang of ["da", "en"] as const) {
    const defaults = new Map(flatten(dict[lang][section as keyof typeof dict.da], section));
    for (const [path, original] of defaults) {
      const raw = formData.get(`${lang}|${path}`);
      if (typeof raw !== "string") continue;
      const value = raw.replace(/\r\n/g, "\n").trim();
      if (value.length > 3000) return { error: "En tekst er for lang (maks. 3000 tegn)." };
      if (value === original || value === "") delete next[lang][path];
      else next[lang][path] = value;
    }
  }

  await saveOverrides(next);
  refreshSite();
  return { ok: true };
}

export async function resetContentAction(formData: FormData) {
  await requireAdmin();
  const section = text(formData, "section", 40);
  const overrides = await loadOverrides();
  const keep = (o: Record<string, string>) =>
    Object.fromEntries(Object.entries(o).filter(([path]) => !path.startsWith(`${section}.`)));
  await saveOverrides({ da: keep(overrides.da), en: keep(overrides.en) });
  refreshSite();
}

// ---------- Contact details

export async function saveSettingsAction(_: SaveState, formData: FormData): Promise<SaveState> {
  await requireAdmin();
  const current = await getSettings();

  const phone = text(formData, "phone", 30);
  const email = text(formData, "email", 120);
  if (!/^\+?[\d\s()-]{6,}$/.test(phone)) return { error: "Telefonnummeret ser ikke gyldigt ud." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return { error: "E-mailadressen ser ikke gyldig ud." };

  const pick = (k: keyof typeof DEFAULT_SETTINGS & string, max = 80) => text(formData, k, max) || String(DEFAULT_SETTINGS[k as keyof typeof DEFAULT_SETTINGS]);
  await saveSettings({
    ...current,
    phone,
    email,
    street: pick("street"),
    zip: pick("zip", 10),
    city: pick("city"),
    cvr: pick("cvr", 12),
    legalName: pick("legalName"),
  });
  refreshSite();
  return { ok: true };
}

// ---------- Pictures

export async function saveImageAction(_: SaveState, formData: FormData): Promise<SaveState> {
  await requireAdmin();
  const key = text(formData, "key", 40);
  if (!IMAGE_SLOTS.some((s) => s.key === key)) return { error: "Ukendt billede." };

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) return { error: "Vælg et billede først." };

  const stored = await storeImage(file);
  if ("error" in stored) return { error: stored.error };

  const settings = await getSettings();
  const old = settings.images[key];
  await saveSettings({ ...settings, images: { ...settings.images, [key]: stored.path } });
  if (old) await removeUpload(old);
  refreshSite();
  return { ok: true };
}

export async function resetImageAction(formData: FormData) {
  await requireAdmin();
  const key = text(formData, "key", 40);
  const settings = await getSettings();
  const old = settings.images[key];
  const { [key]: _removed, ...rest } = settings.images;
  await saveSettings({ ...settings, images: rest });
  if (old) await removeUpload(old);
  refreshSite();
}
