import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { ApiList } from "@/components/api-list";

import { ColorsHeading } from "./components/colors-heading";
import { ColorsList } from "./components/colors-list";

interface ColorsPageProps {
  params: {
    storeId: string;
  };
}

export default async function ColorsPage({ params }: ColorsPageProps) {
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

  const colors = await db.color.findMany({
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
        <ColorsHeading />
        <Separator />
        <ColorsList colors={colors} />

        <Heading title="API" description="API calls for colors" />
        <Separator />
        <ApiList entityName="colors" entityIdName="colorId" />
      </div>
    </div>
  );
}
