"use client";
import { useActionState, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ImagePlus, X } from "lucide-react";
import type { Car } from "@/app/lib/cars";
import { BODY_TYPES, FUELS, GEARBOXES, MAX_IMAGES, STATUSES } from "@/app/lib/vehicle";
import { saveCarAction } from "../../actions";
import { btnGhost, btnPrimary, field } from "../../ui";

type Item = { key: string; src: string; url?: string; file?: File };

const STATUS_LABEL = { available: "Til salg", reserved: "Reserveret", sold: "Solgt" } as const;
const MAX_FILE = 10 * 1024 * 1024;

/** Photos from a phone are often 5-10 MB. Shrinking them in the browser keeps uploads fast and well below the limits. */
async function shrink(file: File): Promise<File> {
  if (!/^image\/(jpeg|png|webp)$/.test(file.type)) return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, 2000 / Math.max(bitmap.width, bitmap.height));
    if (scale === 1 && file.size < 1_500_000) return file;
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/jpeg", 0.85));
    if (!blob || blob.size >= file.size) return file;
    return new File([blob], file.name.replace(/\.\w+$/, "") + ".jpg", { type: "image/jpeg" });
  } catch {
    return file;
  }
}

export function CarForm({ car }: { car?: Car }) {
  const [state, formAction, pending] = useActionState(saveCarAction, null);
  const [items, setItems] = useState<Item[]>(() => (car?.images ?? []).map((url) => ({ key: url, src: url, url })));
  const [busy, setBusy] = useState(false);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const previews = useRef<string[]>([]);
  const v = (k: string, fallback: string | number | undefined = "") => state?.values?.[k] ?? fallback;

  useEffect(() => () => previews.current.forEach(URL.revokeObjectURL), []);

  async function addFiles(list: FileList | null) {
    if (!list?.length) return;
    setPhotoError(null);
    setBusy(true);
    const added: Item[] = [];
    for (const original of Array.from(list)) {
      if (items.length + added.length >= MAX_IMAGES) {
        setPhotoError(`Du kan højst have ${MAX_IMAGES} billeder.`);
        break;
      }
      if (!/^image\/(jpeg|png|webp)$/.test(original.type)) {
        setPhotoError(`${original.name} er ikke JPG, PNG eller WebP.`);
        continue;
      }
      const file = await shrink(original);
      if (file.size > MAX_FILE) {
        setPhotoError(`${original.name} er for stort (maks. 10 MB).`);
        continue;
      }
      const src = URL.createObjectURL(file);
      previews.current.push(src);
      added.push({ key: src, src, file });
    }
    setItems((cur) => [...cur, ...added]);
    setBusy(false);
  }

  const move = (i: number, d: number) =>
    setItems((cur) => {
      const next = [...cur];
      [next[i], next[i + d]] = [next[i + d], next[i]];
      return next;
    });

  // The photo order and new files are added here, because the file list lives in state rather than in a file input.
  const submit = (formData: FormData) => {
    formData.delete("order");
    formData.delete("images");
    let n = 0;
    for (const it of items) {
      if (it.file) {
        formData.append("order", `n:${n++}`);
        formData.append("images", it.file);
      } else if (it.url) {
        formData.append("order", `u:${it.url}`);
      }
    }
    return formAction(formData);
  };

  return (
    <form action={submit} className="space-y-8">
      {car && <input type="hidden" name="id" value={car.id} />}

      <Card title="Grunddata">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="text-sm font-medium">
            Mærke *
            <input name="brand" required maxLength={40} defaultValue={v("brand", car?.brand)} placeholder="BMW" className={field} />
          </label>
          <label className="text-sm font-medium">
            Model *
            <input name="model" required maxLength={80} defaultValue={v("model", car?.model)} placeholder="520d Steptronic" className={field} />
          </label>
          <label className="text-sm font-medium">
            Årgang *
            <input
              name="year"
              type="number"
              required
              min={1980}
              max={new Date().getFullYear() + 1}
              defaultValue={v("year", car?.year)}
              placeholder="2022"
              className={field}
            />
          </label>
          <label className="text-sm font-medium">
            Kilometer *
            <input name="km" type="number" required min={0} defaultValue={v("km", car?.km)} placeholder="32000" className={field} />
          </label>
          <label className="text-sm font-medium">
            Pris *
            <input name="price" type="number" required min={1} defaultValue={v("price", car?.price)} placeholder="42000" className={field} />
          </label>
          <label className="text-sm font-medium">
            Brændstof *
            <select name="fuel" required defaultValue={v("fuel", car?.fuel ?? "Diesel")} className={field}>
              {FUELS.map((f) => (
                <option key={f}>{f}</option>
              ))}
            </select>
          </label>
          <label className="text-sm font-medium">
            Gearkasse
            <select name="gearbox" defaultValue={v("gearbox", car?.gearbox ?? "")} className={field}>
              <option value="">Ikke angivet</option>
              {GEARBOXES.map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>
          </label>
          <label className="text-sm font-medium">
            Type
            <select name="body" defaultValue={v("body", car?.body ?? "")} className={field}>
              <option value="">Ikke angivet</option>
              {BODY_TYPES.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </label>
          <label className="text-sm font-medium">
            Farve
            <input name="color" maxLength={30} defaultValue={v("color", car?.color)} placeholder="Sort" className={field} />
          </label>
          <label className="text-sm font-medium">
            Hestekræfter
            <input name="hp" type="number" min={1} max={2000} defaultValue={v("hp", car?.hp)} placeholder="190" className={field} />
          </label>
        </div>
      </Card>

      <Card title="Billeder">
        <p className="text-sm text-muted-foreground">
          Det første billede er forsidebilledet. Brug pilene til at ændre rækkefølgen. JPG, PNG eller WebP, op til {MAX_IMAGES} billeder.
        </p>

        {items.length > 0 && (
          <ul className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {items.map((it, i) => (
              <li key={it.key} className="overflow-hidden rounded-lg border border-border">
                <div className="relative aspect-[4/3] bg-secondary">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={it.src} alt="" className="h-full w-full object-cover" />
                  {i === 0 && (
                    <span className="absolute left-2 top-2 rounded-md bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground">
                      Forside
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between bg-background p-1.5">
                  <div className="flex">
                    <button
                      type="button"
                      onClick={() => move(i, -1)}
                      disabled={i === 0}
                      aria-label="Flyt til venstre"
                      className="rounded-md p-1.5 hover:bg-secondary disabled:opacity-30"
                    >
                      <ArrowLeft size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => move(i, 1)}
                      disabled={i === items.length - 1}
                      aria-label="Flyt til højre"
                      className="rounded-md p-1.5 hover:bg-secondary disabled:opacity-30"
                    >
                      <ArrowRight size={16} />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => setItems((cur) => cur.filter((x) => x.key !== it.key))}
                    aria-label="Fjern billede"
                    className="rounded-md p-1.5 text-destructive hover:bg-destructive/10"
                  >
                    <X size={16} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4">
          <label className={`${btnGhost} cursor-pointer`}>
            <ImagePlus size={16} aria-hidden />
            {busy ? "Forbereder billeder…" : "Tilføj billeder"}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              className="sr-only"
              onChange={(e) => {
                addFiles(e.target.files);
                e.target.value = "";
              }}
            />
          </label>
          {photoError && (
            <p role="alert" className="mt-3 text-sm text-destructive">
              {photoError}
            </p>
          )}
        </div>
      </Card>

      <Card title="Beskrivelse">
        <div className="grid gap-5 lg:grid-cols-2">
          <label className="block text-sm font-medium">
            Dansk
            <textarea name="description" rows={6} maxLength={3000} defaultValue={v("description", car?.description)} className={field} />
          </label>
          <label className="block text-sm font-medium">
            Engelsk <span className="font-normal text-muted-foreground">(tom = viser den danske tekst)</span>
            <textarea name="descriptionEn" rows={6} maxLength={3000} defaultValue={v("descriptionEn", car?.descriptionEn)} className={field} />
          </label>
        </div>
      </Card>

      <Card title="Visning">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="text-sm font-medium">
            Status
            <select name="status" defaultValue={v("status", car?.status ?? "available")} className={field}>
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {STATUS_LABEL[s]}
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-3 self-end pb-3 text-sm font-medium">
            <input
              type="checkbox"
              name="published"
              defaultChecked={state?.values ? state.values.published === "on" : car ? car.published : true}
              className="h-4 w-4 accent-[var(--navy)]"
            />
            Vis annoncen på hjemmesiden
          </label>
        </div>
      </Card>

      {state?.error && (
        <p role="alert" className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {state.error}
        </p>
      )}

      <div className="flex items-center gap-4">
        <button disabled={pending || busy} className={btnPrimary}>
          {pending ? "Gemmer…" : car ? "Gem ændringer" : "Opret annonce"}
        </button>
        <Link href="/admin/biler" className="text-sm text-muted-foreground hover:text-foreground">
          Annuller
        </Link>
      </div>
    </form>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-border bg-background p-6 sm:p-7">
      <h2 className="mb-5 text-lg font-bold">{title}</h2>
      {children}
    </section>
  );
}
