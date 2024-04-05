"use client";

import { Size } from "@prisma/client";
import dayjs from "dayjs";

import { DataTable } from "@/components/ui/data-table";

import { SizeColumn, columns } from "./columns";

interface SizesListProps {
  sizes: Size[];
}

export function SizesList({ sizes }: SizesListProps) {
  const formattedData: SizeColumn[] = sizes.map((size) => ({
    id: size.id,
    name: size.name,
    value: size.value,
    createdAt: dayjs(size.createdAt).format("DD.MM.YYYY HH:mm"),
  }));

  return (
    <>
      <DataTable searchKey="name" columns={columns} data={formattedData} />
    </>
  );
}
