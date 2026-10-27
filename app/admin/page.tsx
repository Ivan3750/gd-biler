import { Car, Eye, EyeOff, Mail, Plus, Type } from "lucide-react";
import { requireAdmin } from "@/app/lib/auth";
import { listCars } from "@/app/lib/cars";
import { listMessages } from "@/app/lib/messages";
import { PageHeader } from "./PageHeader";

export default async function DashboardPage() {
  await requireAdmin();
  const [cars, messages] = await Promise.all([listCars(), listMessages()]);
  const shown = cars.filter((c) => c.published).length;
  const unread = messages.filter((m) => !m.read);

  const stats = [
    { label: "Annoncer på siden", value: shown, icon: Eye, href: "/admin/cars" },
    { label: "Skjulte annoncer", value: cars.length - shown, icon: EyeOff, href: "/admin/cars" },
    { label: "Nye beskeder", value: unread.length, icon: Mail, href: "/admin/messages" },
    { label: "Beskeder i alt", value: messages.length, icon: Car, href: "/admin/messages" },
  ];

  return (
    <>
      <PageHeader title="Overblik" subtitle="Her styrer du hele hjemmesiden.">
        <a
          href="/admin/cars/new"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          <Plus size={16} /> Ny annonce
        </a>
      </PageHeader>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, href }) => (
          <a key={label} href={href} className="rounded-xl border border-border bg-background p-5 transition-shadow hover:shadow-soft">
            <Icon size={18} className="text-muted-foreground" />
            <p className="mt-4 text-3xl font-semibold tracking-tight">{value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{label}</p>
          </a>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-5">
        <section className="rounded-xl border border-border bg-background p-6 lg:col-span-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Seneste beskeder</h2>
            <a href="/admin/messages" className="text-sm font-medium hover:underline">Se alle</a>
          </div>
          {messages.length === 0 ? (
            <p className="mt-4 text-muted-foreground">Der er ingen beskeder endnu.</p>
          ) : (
            <ul className="mt-4 divide-y divide-border">
              {messages.slice(0, 5).map((m) => (
                <li key={m.id} className="py-3">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{m.name}</span>
                    {!m.read && <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">Ny</span>}
                    <span className="ml-auto text-xs text-muted-foreground">
                      {new Date(m.createdAt).toLocaleDateString("da-DK")}
                    </span>
                  </div>
                  <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                    {m.message || `Salg af bil ${m.regNo ?? ""}`}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-xl border border-border bg-background p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold">Hurtige genveje</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              ["/admin/tekster", "Ret tekster på siden", Type],
              ["/admin/billeder", "Skift billeder", Car],
              ["/admin/indstillinger", "Telefon, adresse og e-mail", Mail],
            ].map(([href, label, Icon]) => {
              const I = Icon as typeof Type;
              return (
                <li key={href as string}>
                  <a href={href as string} className="flex items-center gap-3 rounded-lg border border-border px-4 py-3 font-medium hover:bg-secondary">
                    <I size={16} /> {label as string}
                  </a>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </>
  );
}
