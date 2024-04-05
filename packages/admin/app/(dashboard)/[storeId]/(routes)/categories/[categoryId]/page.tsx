import { db } from "@/lib/db";
import { Separator } from "@/components/ui/separator";

import { CategoryHeading } from "./components/category-heading";
import { CategoryForm } from "@/components/forms/category-form";

export default async function CategoryPage({
  params,
}: {
  params: { storeId: string; categoryId: string };
}) {
  const category = await db.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });

  const billboards = await db.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryHeading category={category} />

        <Separator />

        <CategoryForm billboards={billboards} category={category} />
      </div>
    </div>
  );
}
