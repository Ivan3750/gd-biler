import { requireAdmin } from "@/app/lib/auth";
import { listMessages } from "@/app/lib/messages";
import { deleteMessageAction, toggleReadAction } from "@/app/admin/actions";
import { ConfirmButton } from "@/app/admin/ConfirmButton";

const TOPICS: Record<string, string> = { buy: "Køb af bil", service: "Værksted", sell: "Salg af bil", other: "Andet" };

export default async function MessagesPage() {
  await requireAdmin();
  const messages = await listMessages();

  return (
    <>
      <h1 className="mb-6 text-2xl font-semibold">Beskeder ({messages.length})</h1>
      {messages.length === 0 ? (
        <p className="rounded-xl border border-border bg-background p-10 text-center text-muted-foreground">
          Der er ingen beskeder endnu.
        </p>
      ) : (
        <ul className="space-y-3">
          {messages.map((m) => (
            <li key={m.id} className={`rounded-xl border border-border bg-background p-5 ${m.read ? "opacity-70" : ""}`}>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <h2 className="font-semibold">{m.name}</h2>
                <span className="rounded-full bg-secondary px-2 py-0.5 text-xs">{TOPICS[m.topic] ?? m.topic}</span>
                {!m.read && <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">Ny</span>}
                <span className="ml-auto text-xs text-muted-foreground">
                  {new Date(m.createdAt).toLocaleString("da-DK")} · {m.lang.toUpperCase()}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {m.phone && <a href={`tel:${m.phone}`} className="hover:underline">{m.phone}</a>}
                {m.phone && m.email && " · "}
                {m.email && <a href={`mailto:${m.email}`} className="hover:underline">{m.email}</a>}
              </p>
              {m.carName && (
                <p className="mt-2 text-sm">
                  Bil: <a href={`/biler/${m.carId}`} className="font-medium underline">{m.carName}</a>
                </p>
              )}
              {(m.regNo || m.km) && (
                <p className="mt-2 text-sm">
                  {m.regNo && <>Nummerplade: <span className="font-medium">{m.regNo}</span></>}
                  {m.regNo && m.km && " · "}
                  {m.km && <>Kilometer: <span className="font-medium">{m.km}</span></>}
                </p>
              )}
              {m.message && <p className="mt-3 whitespace-pre-line">{m.message}</p>}
              <div className="mt-4 flex gap-4 text-sm">
                <form action={toggleReadAction}>
                  <input type="hidden" name="id" value={m.id} />
                  <button className="font-medium hover:underline">{m.read ? "Marker som ny" : "Marker som læst"}</button>
                </form>
                <form action={deleteMessageAction}>
                  <input type="hidden" name="id" value={m.id} />
                  <ConfirmButton message="Slet denne besked?" className="font-medium text-destructive hover:underline">
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
