import { requireAdmin } from "@/app/lib/auth";
import { getSettings } from "@/app/lib/settings";
import { SettingsForm } from "./SettingsForm";

export const metadata = { title: "Indstillinger" };

export default async function SettingsPage() {
  await requireAdmin();
  const settings = await getSettings();
  return (
    <>
      <h1 className="mb-2 text-2xl font-bold">Indstillinger</h1>
      <p className="mb-6 text-muted-foreground">Kontaktoplysninger, åbningstider og tekster, som vises på hjemmesiden.</p>
      <SettingsForm settings={settings} />
    </>
  );
}
