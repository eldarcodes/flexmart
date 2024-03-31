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
    <div className="p-4">
      <h3>Dashboard page</h3>
      <div>
        Active store: <b>{store.name}</b>
      </div>
    </div>
  );
}
