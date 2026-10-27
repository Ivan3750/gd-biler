import { requireAdmin } from "@/app/lib/auth";
import { formatNumber, listCars } from "@/app/lib/cars";
import { deleteCarAction, togglePublishedAction } from "../actions";
import { ConfirmButton } from "../ConfirmButton";

export default async function AdminPage() {
  await requireAdmin();
  const cars = await listCars();

  return (
    <>
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Annoncer ({cars.length})</h1>
        <a href="/admin/cars/new" className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
          + Ny annonce
        </a>
      </div>

      {cars.length === 0 ? (
        <p className="rounded-xl border border-border bg-background p-10 text-center text-muted-foreground">
          Der er ingen annoncer endnu.
        </p>
      ) : (
        <ul className="space-y-3">
          {cars.map((car) => (
            <li
              key={car.id}
              className="flex flex-col gap-4 rounded-xl border border-border bg-background p-4 sm:flex-row sm:items-center"
            >
              <img src={car.image} alt="" className="h-24 w-full rounded-lg object-cover sm:w-36" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="truncate font-semibold">
                    {car.brand} {car.model}
                  </h2>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
                      car.published ? "bg-green-100 text-green-800" : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {car.published ? "Vises" : "Skjult"}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {car.year} · {formatNumber(car.km)} km · {car.fuel} · {formatNumber(car.price)} €
                </p>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <a href={`/admin/cars/${car.id}`} className="font-medium hover:underline">
                  Rediger
                </a>
                <form action={togglePublishedAction}>
                  <input type="hidden" name="id" value={car.id} />
                  <button className="text-muted-foreground hover:text-foreground">
                    {car.published ? "Skjul" : "Vis"}
                  </button>
                </form>
                <form action={deleteCarAction}>
                  <input type="hidden" name="id" value={car.id} />
                  <ConfirmButton
                    message={`Slet ${car.brand} ${car.model}? Det kan ikke fortrydes.`}
                    className="text-destructive hover:underline"
                  >
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
