"use client";

import { Category, Color, Product, Size } from "@prisma/client";
import dayjs from "dayjs";

import { DataTable } from "@/components/ui/data-table";

import { ProductColumn, columns } from "./columns";
import { formatter } from "@/lib/utils";

interface ProductsListProps {
  products: (Product & {
    category: Category;
    size: Size;
    color: Color;
  })[];
}

export function ProductsList({ products }: ProductsListProps) {
  const formattedData: ProductColumn[] = products.map((product) => ({
    id: product.id,
    name: product.name,
    isFeatured: product.isFeatured,
    isArchived: product.isArchived,
    price: formatter.format(+product.price),
    category: product.category.name,
    size: product.size.name,
    color: product.color.name,

    createdAt: dayjs(product.createdAt).format("DD.MM.YYYY HH:mm"),
  }));

  return (
    <>
      <DataTable searchKey="name" columns={columns} data={formattedData} />
    </>
  );
}
