import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { requireAdmin, usingDefaultPassword } from "@/app/lib/auth";
import { carTitle, listCars } from "@/app/lib/cars";
import { formatDate, formatPrice } from "@/app/lib/format";
import { listLeads } from "@/app/lib/leads";
import { getSettings } from "@/app/lib/settings";
import { badge, card } from "../ui";
import { LEAD_LABEL } from "./henvendelser/labels";

export const metadata = { title: "Overblik" };

export default async function DashboardPage() {
  await requireAdmin();
  const [cars, leads, settings] = await Promise.all([listCars(), listLeads(), getSettings()]);

  const forSale = cars.filter((c) => c.published && c.status === "available").length;
  const reserved = cars.filter((c) => c.status === "reserved").length;
  const sold = cars.filter((c) => c.status === "sold").length;
  const hidden = cars.filter((c) => !c.published).length;
  const newLeads = leads.filter((l) => l.status === "new");
  const stockValue = cars.filter((c) => c.published && c.status !== "sold").reduce((sum, c) => sum + c.price, 0);

  const stats = [
    { label: "Til salg", value: forSale, href: "/admin/biler?status=available" },
    { label: "Reserveret", value: reserved, href: "/admin/biler?status=reserved" },
    { label: "Solgt", value: sold, href: "/admin/biler?status=sold" },
    { label: "Skjulte", value: hidden, href: "/admin/biler?status=hidden" },
    { label: "Nye henvendelser", value: newLeads.length, href: "/admin/henvendelser?status=new" },
  ];

  return (
    <>
      <h1 className="text-2xl font-bold">Overblik</h1>

      {usingDefaultPassword() && (
        <div role="alert" className="mt-6 flex gap-3 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm">
          <AlertTriangle size={18} className="mt-0.5 shrink-0 text-destructive" aria-hidden />
          <p>
            <strong>Adgangskoden er standardkoden.</strong> Sæt <code className="rounded bg-background px-1">ADMIN_PASSWORD</code> på serveren
            til en lang, hemmelig kode og genstart, så andre ikke kan logge ind.
          </p>
        </div>
      )}

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-5">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className={`${card} p-5 hover:border-foreground/40`}>
            <p className="text-sm text-muted-foreground">{s.label}</p>
            <p className="mt-2 text-3xl font-bold">{s.value}</p>
          </Link>
        ))}
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        Samlet værdi af biler på lager: <strong className="text-foreground">{formatPrice(stockValue, settings.currency)}</strong>
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className={`${card} p-5`}>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-bold">Seneste henvendelser</h2>
            <Link href="/admin/henvendelser" className="text-sm text-muted-foreground hover:text-foreground">
              Se alle
            </Link>
          </div>
          {leads.length === 0 ? (
            <p className="text-sm text-muted-foreground">Ingen henvendelser endnu.</p>
          ) : (
            <ul className="divide-y divide-border">
              {leads.slice(0, 6).map((l) => (
                <li key={l.id} className="py-3">
                  <Link href={`/admin/henvendelser?status=all#${l.id}`} className="block">
                    <div className="flex items-center justify-between gap-3">
                      <span className="truncate font-medium">{l.name}</span>
                      <span className={`${badge} ${l.status === "new" ? "bg-brand/25 text-foreground" : "bg-secondary text-muted-foreground"}`}>
                        {l.status === "new" ? "Ny" : "Behandlet"}
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-sm text-muted-foreground">
                      {LEAD_LABEL[l.type]}
                      {l.carTitle ? ` · ${l.carTitle}` : ""} · {formatDate(l.createdAt)}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className={`${card} p-5`}>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-bold">Seneste biler</h2>
            <Link href="/admin/biler/new" className="text-sm text-muted-foreground hover:text-foreground">
              + Ny annonce
            </Link>
          </div>
          {cars.length === 0 ? (
            <p className="text-sm text-muted-foreground">Der er ingen annoncer endnu.</p>
          ) : (
            <ul className="divide-y divide-border">
              {cars.slice(0, 6).map((c) => (
                <li key={c.id} className="flex items-center justify-between gap-3 py-3">
                  <Link href={`/admin/biler/${c.id}`} className="min-w-0 hover:underline">
                    <span className="block truncate font-medium">{carTitle(c)}</span>
                    <span className="text-sm text-muted-foreground">
                      {c.year} · {formatPrice(c.price, settings.currency)}
                    </span>
                  </Link>
                  <span className={`${badge} ${c.published ? "bg-green-100 text-green-800" : "bg-secondary text-muted-foreground"}`}>
                    {c.published ? "Vises" : "Skjult"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
}
