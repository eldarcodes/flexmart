import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { Separator } from "@/components/ui/separator";

import { OrdersHeading } from "./components/orders-heading";
import { OrdersList } from "./components/orders-list";

interface OrdersPageProps {
  params: {
    storeId: string;
  };
}

export default async function OrdersPage({ params }: OrdersPageProps) {
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

  const orders = await db.order.findMany({
    where: {
      storeId: store.id,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrdersHeading />
        <Separator />
        <OrdersList orders={orders} />
      </div>
    </div>
  );
}
