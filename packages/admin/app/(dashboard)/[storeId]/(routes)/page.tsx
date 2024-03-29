import { db } from "@/lib/db";
import { notFound } from "next/navigation";

interface DashboardPageProps {
  params: { storeId: string };
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const store = await db.store.findFirst({
    where: {
      id: params.storeId,
    },
  });

  if (!store) {
    return notFound();
  }

  return (
    <>
      <h3>Dashboard page</h3>
      <div>Active store: {store.name}</div>
    </>
  );
}
