"use client";

import { Billboard, Category } from "@prisma/client";
import dayjs from "dayjs";

import { DataTable } from "@/components/ui/data-table";

import { CategoryColumn, columns } from "./columns";

type CategoryWithBillboard = Category & { billboard: Billboard };

interface CategoriesListProps {
  categories: CategoryWithBillboard[];
}

export function CategoriesList({ categories }: CategoriesListProps) {
  const formattedData: CategoryColumn[] = categories.map((category) => ({
    id: category.id,
    name: category.name,
    billboardLabel: category.billboard.label,
    createdAt: dayjs(category.createdAt).format("DD.MM.YYYY HH:mm"),
  }));

  return (
    <>
      <DataTable searchKey="name" columns={columns} data={formattedData} />
    </>
  );
}
