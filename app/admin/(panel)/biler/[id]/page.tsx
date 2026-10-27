import { notFound } from "next/navigation";
import { requireAdmin } from "@/app/lib/auth";
import { getCar } from "@/app/lib/cars";
import { CarForm } from "../CarForm";

export const metadata = { title: "Rediger annonce" };

export default async function EditCarPage({ params }: PageProps<"/admin/biler/[id]">) {
  await requireAdmin();
  const { id } = await params;
  const car = await getCar(id);
  if (!car) notFound();

  return (
    <>
      <h1 className="mb-6 text-2xl font-bold">Rediger annonce</h1>
      <CarForm car={car} />
    </>
  );
}
