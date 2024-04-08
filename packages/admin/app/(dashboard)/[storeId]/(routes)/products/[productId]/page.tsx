import { db } from "@/lib/db";
import { ProductForm } from "@/components/forms/product-form";
import { Separator } from "@/components/ui/separator";
import { ProductHeading } from "./components/product-heading";

export default async function ProductPage({
  params,
}: {
  params: { productId: string };
}) {
  const product = await db.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductHeading product={product} />

        <Separator />

        <ProductForm product={product} />
      </div>
    </div>
  );
}
