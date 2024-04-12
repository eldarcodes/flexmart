import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { ApiList } from "@/components/api-list";

import { CategoriesHeading } from "./components/categories-heading";
import { CategoriesList } from "./components/categories-list";

interface CategoriesPageProps {
  params: {
    storeId: string;
  };
}

export default async function CategoriesPage({ params }: CategoriesPageProps) {
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

  const categories = await db.category.findMany({
    where: {
      storeId: store.id,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoriesHeading />
        <Separator />
        <CategoriesList categories={categories} />

        <Heading title="API" description="API calls for categories" />
        <Separator />
        <ApiList entityName="categories" entityIdName="categoryId" />
      </div>
    </div>
  );
}
