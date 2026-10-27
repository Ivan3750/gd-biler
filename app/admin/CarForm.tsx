"use client";
import { useActionState, useState } from "react";
import { BODY_TYPES, DRIVES, FUELS, GEARBOXES } from "@/app/lib/fuels";
import type { Car } from "@/app/lib/cars";
import { saveCarAction } from "./actions";

const field =
  "mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-base outline-none focus:border-foreground";

export function CarForm({ car }: { car?: Car }) {
  const [state, action, pending] = useActionState(saveCarAction, null);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const shown = preview ?? car?.image;
  const v = (k: string, fallback: string | number | undefined) => state?.values?.[k] ?? fallback;

  return (
    <form action={action} className="space-y-6 rounded-xl border border-border bg-background p-6 sm:p-8">
      {car && <input type="hidden" name="id" value={car.id} />}

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-medium">
          Mærke
          <input name="brand" required maxLength={40} defaultValue={v("brand", car?.brand)} placeholder="BMW" className={field} />
        </label>
        <label className="text-sm font-medium">
          Model
          <input name="model" required maxLength={80} defaultValue={v("model", car?.model)} placeholder="520d Steptronic" className={field} />
        </label>
        <label className="text-sm font-medium">
          Årgang
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
          Kilometer
          <input name="km" type="number" required min={0} defaultValue={v("km", car?.km)} placeholder="32000" className={field} />
        </label>
        <label className="text-sm font-medium">
          Brændstof
          <select name="fuel" required defaultValue={v("fuel", car?.fuel ?? "Diesel")} className={`plain-select !rounded-lg !px-3 !py-2.5 !text-base ${field}`}>
            {FUELS.map((f) => (
              <option key={f}>{f}</option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium">
          Pris (€)
          <input name="price" type="number" required min={1} defaultValue={v("price", car?.price)} placeholder="42000" className={field} />
        </label>
      </div>

      <fieldset className="space-y-5 border-t border-border pt-6">
        <legend className="text-sm font-semibold">Flere oplysninger <span className="font-normal text-muted-foreground">(valgfri)</span></legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="text-sm font-medium">
            Biltype
            <select name="bodyType" defaultValue={v("bodyType", car?.bodyType ?? "")} className={`plain-select !rounded-lg !px-3 !py-2.5 !text-base ${field}`}>
              <option value="">–</option>
              {BODY_TYPES.map((x) => (<option key={x}>{x}</option>))}
            </select>
          </label>
          <label className="text-sm font-medium">
            Gearkasse
            <select name="gearbox" defaultValue={v("gearbox", car?.gearbox ?? "")} className={`plain-select !rounded-lg !px-3 !py-2.5 !text-base ${field}`}>
              <option value="">–</option>
              {GEARBOXES.map((x) => (<option key={x}>{x}</option>))}
            </select>
          </label>
          <label className="text-sm font-medium">
            Træk
            <select name="drive" defaultValue={v("drive", car?.drive ?? "")} className={`plain-select !rounded-lg !px-3 !py-2.5 !text-base ${field}`}>
              <option value="">–</option>
              {DRIVES.map((x) => (<option key={x}>{x}</option>))}
            </select>
          </label>
          <label className="text-sm font-medium">
            Effekt (hk)
            <input name="powerHp" type="number" min={0} defaultValue={v("powerHp", car?.powerHp)} placeholder="190" className={field} />
          </label>
          <label className="text-sm font-medium">
            Forbrug (km/l)
            <input name="kmPerL" type="number" step="0.1" min={0} defaultValue={v("kmPerL", car?.kmPerL)} placeholder="18.5" className={field} />
          </label>
          <label className="text-sm font-medium">
            Farve
            <input name="color" maxLength={40} defaultValue={v("color", car?.color)} placeholder="Sort" className={field} />
          </label>
          <label className="text-sm font-medium">
            Døre
            <input name="doors" type="number" min={1} max={7} defaultValue={v("doors", car?.doors)} placeholder="5" className={field} />
          </label>
          <label className="text-sm font-medium">
            Siddepladser
            <input name="seats" type="number" min={1} max={9} defaultValue={v("seats", car?.seats)} placeholder="5" className={field} />
          </label>
          <label className="text-sm font-medium">
            Tidligere ejere
            <input name="owners" type="number" min={0} defaultValue={v("owners", car?.owners)} placeholder="1" className={field} />
          </label>
          <label className="text-sm font-medium">
            Første registrering
            <input name="firstRegistration" maxLength={20} defaultValue={v("firstRegistration", car?.firstRegistration)} placeholder="03/2021" className={field} />
          </label>
        </div>
        <label className="block text-sm font-medium">
          Udstyr <span className="font-normal text-muted-foreground">(ét punkt pr. linje)</span>
          <textarea name="equipment" rows={6} defaultValue={v("equipment", car?.equipment?.join("\n"))} placeholder={"Læderindtræk\nNavigation\nBakkamera"} className={field} />
        </label>
        <label className="block text-sm font-medium">
          Udstyr på engelsk <span className="font-normal text-muted-foreground">(ét punkt pr. linje – ellers vises den danske liste)</span>
          <textarea name="equipmentEn" rows={6} defaultValue={v("equipmentEn", car?.equipmentEn?.join("\n"))} className={field} />
        </label>
      </fieldset>

      <label className="block text-sm font-medium">
        Beskrivelse <span className="font-normal text-muted-foreground">(valgfri)</span>
        <textarea name="description" rows={8} maxLength={3000} defaultValue={v("description", car?.description)} className={field} />
      </label>

      <label className="block text-sm font-medium">
        Beskrivelse på engelsk <span className="font-normal text-muted-foreground">(valgfri – ellers vises den danske)</span>
        <textarea name="descriptionEn" rows={8} maxLength={3000} defaultValue={v("descriptionEn", car?.descriptionEn)} className={field} />
      </label>

      <div>
        <label className="block text-sm font-medium" htmlFor="image">
          Billede {car && <span className="font-normal text-muted-foreground">(vælg kun for at skifte)</span>}
        </label>
        <div className="mt-1.5 flex items-start gap-4">
          {shown && (
            <img src={shown} alt="" className="h-24 w-32 shrink-0 rounded-lg border border-border object-cover" />
          )}
          <div>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              required={!car}
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f && f.size > 10 * 1024 * 1024) {
                  e.target.value = "";
                  setPreview(null);
                  setFileError("Billedet er for stort (maks. 10 MB).");
                  return;
                }
                setFileError(null);
                setPreview(f ? URL.createObjectURL(f) : null);
              }}
              className="block text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-secondary file:px-4 file:py-2 file:text-sm file:font-medium"
            />
            {fileError && <p className="mt-2 text-sm text-destructive">{fileError}</p>}
            <p className="mt-2 text-xs text-muted-foreground">JPG, PNG eller WebP, maks. 10 MB. Gerne liggende format.</p>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium" htmlFor="images">
          Flere billeder <span className="font-normal text-muted-foreground">(vælg flere ad gangen – de tilføjes til galleriet)</span>
        </label>
        {car?.images && car.images.length > 0 && (
          <ul className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-5">
            {car.images.map((src) => (
              <li key={src} className="text-xs">
                <img src={src} alt="" className="h-20 w-full rounded-lg border border-border object-cover" />
                <label className="mt-1 flex items-center gap-1.5 text-muted-foreground">
                  <input type="checkbox" name="removeImage" value={src} /> Fjern
                </label>
              </li>
            ))}
          </ul>
        )}
        <input
          id="images"
          name="images"
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp"
          className="mt-3 block text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-secondary file:px-4 file:py-2 file:text-sm file:font-medium"
        />
        <p className="mt-2 text-xs text-muted-foreground">Maks. 15 ekstra billeder, 10 MB hver.</p>
      </div>

      <label className="flex items-center gap-3 text-sm font-medium">
        <input
          type="checkbox"
          name="published"
          defaultChecked={state?.values ? state.values.published === "on" : car ? car.published : true}
          className="h-4 w-4 accent-[var(--navy)]"
        />
        Vis annoncen på hjemmesiden
      </label>

      {state?.error && (
        <p role="alert" className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {state.error}
        </p>
      )}

      <div className="flex items-center gap-4">
        <button
          disabled={pending}
          className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-60"
        >
          {pending ? "Gemmer…" : car ? "Gem ændringer" : "Opret annonce"}
        </button>
        <a href="/admin/cars" className="text-sm text-muted-foreground hover:text-foreground">
          Annuller
        </a>
      </div>
    </form>
  );
}
