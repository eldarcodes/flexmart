import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { Separator } from "@/components/ui/separator";

import { ProductsHeading } from "./components/products-heading";
import { ProductsList } from "./components/products-list";
import { Heading } from "@/components/ui/heading";
import { ApiList } from "@/components/api-list";

interface ProductsPageProps {
  params: {
    storeId: string;
  };
}

export default async function ProductsPage({ params }: ProductsPageProps) {
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

  const products = await db.product.findMany({
    where: {
      storeId: store.id,
    },
    include: {
      category: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductsHeading />
        <Separator />
        <ProductsList products={products} />

        <Heading title="API" description="API calls for products" />
        <Separator />
        <ApiList entityName="products" entityIdName="productId" />
      </div>
    </div>
  );
}
