import { requireAdmin } from "@/app/lib/auth";
import { CarForm } from "../../CarForm";

export default async function NewCarPage() {
  await requireAdmin();
  return (
    <>
      <h1 className="mb-6 text-2xl font-semibold">Ny annonce</h1>
      <CarForm />
    </>
  );
}
