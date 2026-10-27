import { notFound } from "next/navigation";
import { requireAdmin } from "@/app/lib/auth";
import { getCar } from "@/app/lib/cars";
import { CarForm } from "../../CarForm";

export default async function EditCarPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const car = await getCar(id);
  if (!car) notFound();

  return (
    <>
      <h1 className="mb-6 text-2xl font-semibold">Rediger annonce</h1>
      <CarForm car={car} />
    </>
  );
}
