import Image from "next/image";
import Link from "next/link";
import { requireAdmin } from "@/app/lib/auth";
import { carPath, carTitle, listCars } from "@/app/lib/cars";
import { formatNumber, formatPrice } from "@/app/lib/format";
import { getSettings } from "@/app/lib/settings";
import { deleteCarAction, setStatusAction, togglePublishedAction } from "../../actions";
import { ConfirmButton } from "../../ConfirmButton";
import { badge, btnGhost, btnPrimary, card, field } from "../../ui";

export const metadata = { title: "Biler" };

const STATUS_LABEL = { available: "Til salg", reserved: "Reserveret", sold: "Solgt" } as const;
const FILTERS = [
  ["", "Alle"],
  ["available", "Til salg"],
  ["reserved", "Reserveret"],
  ["sold", "Solgt"],
  ["hidden", "Skjulte"],
] as const;
const SORTS = [
  ["new", "Nyeste først"],
  ["price-desc", "Pris: høj til lav"],
  ["price-asc", "Pris: lav til høj"],
  ["year-desc", "Årgang"],
] as const;

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

export default async function AdminCarsPage({ searchParams }: PageProps<"/admin/biler">) {
  await requireAdmin();
  const sp = await searchParams;
  const q = one(sp.q).trim().toLowerCase();
  const status = one(sp.status);
  const sort = one(sp.sort) || "new";

  const [all, settings] = await Promise.all([listCars(), getSettings()]);
  const cars = all
    .filter((c) => !q || `${c.brand} ${c.model} ${c.year}`.toLowerCase().includes(q))
    .filter((c) => (status === "hidden" ? !c.published : !status || c.status === status))
    .sort((a, b) =>
      sort === "price-desc" ? b.price - a.price : sort === "price-asc" ? a.price - b.price : sort === "year-desc" ? b.year - a.year : 0,
    );

  return (
    <>
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Biler ({all.length})</h1>
        <Link href="/admin/biler/new" className={btnPrimary}>
          + Ny annonce
        </Link>
      </div>

      <form className={`${card} mb-5 flex flex-wrap items-end gap-3 p-4`}>
        <label className="min-w-48 flex-1 text-sm font-medium">
          Søg
          <input name="q" defaultValue={one(sp.q)} placeholder="Mærke, model eller årgang" className={field} />
        </label>
        <label className="text-sm font-medium">
          Status
          <select name="status" defaultValue={status} className={field}>
            {FILTERS.map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium">
          Sortér
          <select name="sort" defaultValue={sort} className={field}>
            {SORTS.map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </select>
        </label>
        <button className={btnGhost}>Vis</button>
        {(q || status || sort !== "new") && (
          <Link href="/admin/biler" className="py-2.5 text-sm text-muted-foreground hover:text-foreground">
            Nulstil
          </Link>
        )}
      </form>

      {cars.length === 0 ? (
        <p className={`${card} p-10 text-center text-muted-foreground`}>
          {all.length === 0 ? "Der er ingen annoncer endnu." : "Ingen annoncer matcher din søgning."}
        </p>
      ) : (
        <ul className="space-y-3">
          {cars.map((car) => (
            <li key={car.id} className={`${card} flex flex-col gap-4 p-4 lg:flex-row lg:items-center`}>
              <div className="relative h-24 w-full shrink-0 overflow-hidden rounded-lg bg-secondary lg:w-36">
                {car.images[0] && <Image src={car.images[0]} alt="" fill sizes="144px" className="object-cover" />}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="truncate font-bold">{carTitle(car)}</h2>
                  <span className={`${badge} ${car.published ? "bg-green-100 text-green-800" : "bg-secondary text-muted-foreground"}`}>
                    {car.published ? "Vises" : "Skjult"}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {car.year} · {formatNumber(car.km)} km · {car.fuel} · {formatPrice(car.price, settings.currency)} · {car.images.length}{" "}
                  {car.images.length === 1 ? "billede" : "billeder"}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-3 text-sm">
                <form action={setStatusAction} className="inline-flex overflow-hidden rounded-lg border border-border">
                  <input type="hidden" name="id" value={car.id} />
                  {(Object.keys(STATUS_LABEL) as (keyof typeof STATUS_LABEL)[]).map((s) => (
                    <button
                      key={s}
                      name="status"
                      value={s}
                      disabled={car.status === s}
                      className={`px-3 py-1.5 font-medium ${
                        car.status === s ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                      }`}
                    >
                      {STATUS_LABEL[s]}
                    </button>
                  ))}
                </form>
                <Link href={`/admin/biler/${car.id}`} className="font-medium hover:underline">
                  Rediger
                </Link>
                {car.published && (
                  <Link href={carPath(car)} target="_blank" className="text-muted-foreground hover:text-foreground">
                    Se
                  </Link>
                )}
                <form action={togglePublishedAction}>
                  <input type="hidden" name="id" value={car.id} />
                  <button className="text-muted-foreground hover:text-foreground">{car.published ? "Skjul" : "Vis"}</button>
                </form>
                <form action={deleteCarAction}>
                  <input type="hidden" name="id" value={car.id} />
                  <ConfirmButton message={`Slet ${carTitle(car)}? Det kan ikke fortrydes.`} className="text-destructive hover:underline">
                    Slet
                  </ConfirmButton>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
