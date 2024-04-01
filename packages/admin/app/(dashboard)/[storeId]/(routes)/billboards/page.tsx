import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { Separator } from "@/components/ui/separator";

import { BillboardsHeading } from "./components/billboards-heading";

interface BillboardsPageProps {
  params: {
    storeId: string;
  };
}

export default async function BillboardsPage({ params }: BillboardsPageProps) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await db.store.findFirst({
    where: {
      id: params.storeId,
    },
  });

  if (!store) {
    return redirect("/");
  }

  const billboards = await db.billboard.findMany({
    where: {
      storeId: store.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardsHeading />

        <Separator />

        <ul>
          {billboards.map((billboard) => (
            <li key={billboard.id}>
              <a
                className="hover:underline text-blue-600"
                href={`/${store.id}/billboards/${billboard.id}`}
              >
                {billboard.id}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
