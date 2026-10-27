import { requireAdmin } from "@/app/lib/auth";
import { IMAGE_SLOTS, getImages } from "@/app/lib/images";
import { getSettings } from "@/app/lib/settings";
import { AdminForm } from "../AdminForm";
import { PageHeader } from "../PageHeader";
import { resetImageAction, saveImageAction } from "../site-actions";

export default async function ImagesPage() {
  await requireAdmin();
  const [images, settings] = await Promise.all([getImages(), getSettings()]);

  return (
    <>
      <PageHeader title="Billeder" subtitle="Skift de store billeder på hjemmesiden. Billeder af biler rettes under Annoncer." />

      <div className="grid gap-5 sm:grid-cols-2">
        {IMAGE_SLOTS.map((slot) => {
          const custom = Boolean(settings.images[slot.key]);
          return (
            <section key={slot.key} className="rounded-xl border border-border bg-background p-5">
              <img src={images[slot.key]} alt="" className="h-40 w-full rounded-lg border border-border bg-secondary object-cover" />
              <h2 className="mt-4 font-semibold">{slot.label}</h2>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {slot.hint} {custom ? "Egen upload i brug." : "Standardbillede i brug."}
              </p>
              <AdminForm
                action={saveImageAction}
                submitLabel="Upload"
                className="mt-4"
                footer={
                  custom ? (
                    <button
                      formAction={resetImageAction}
                      className="text-sm font-medium text-muted-foreground hover:text-foreground"
                    >
                      Gendan standard
                    </button>
                  ) : null
                }
              >
                <input type="hidden" name="key" value={slot.key} />
                <input
                  type="file"
                  name="file"
                  accept="image/jpeg,image/png,image/webp"
                  required
                  className="block w-full text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-secondary file:px-4 file:py-2 file:text-sm file:font-medium"
                />
              </AdminForm>
            </section>
          );
        })}
      </div>
    </>
  );
}
