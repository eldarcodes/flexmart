import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { Separator } from "@/components/ui/separator";

import { SizesHeading } from "./components/sizes-heading";
import { SizesList } from "./components/sizes-list";
import { Heading } from "@/components/ui/heading";
import { ApiList } from "@/components/api-list";

interface SizesPageProps {
  params: {
    storeId: string;
  };
}

export default async function SizesPage({ params }: SizesPageProps) {
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

  const sizes = await db.size.findMany({
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
        <SizesHeading />
        <Separator />
        <SizesList sizes={sizes} />

        <Heading title="API" description="API calls for sizes" />
        <Separator />
        <ApiList entityName="sizes" entityIdName="sizeId" />
      </div>
    </div>
  );
}
