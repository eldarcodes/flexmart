"use client";

import { Color } from "@prisma/client";
import dayjs from "dayjs";

import { DataTable } from "@/components/ui/data-table";

import { ColorColumn, columns } from "./columns";

interface ColorsListProps {
  colors: Color[];
}

export function ColorsList({ colors }: ColorsListProps) {
  const formattedData: ColorColumn[] = colors.map((color) => ({
    id: color.id,
    name: color.name,
    value: color.value,
    createdAt: dayjs(color.createdAt).format("DD.MM.YYYY HH:mm"),
  }));

  return (
    <>
      <DataTable searchKey="name" columns={columns} data={formattedData} />
    </>
  );
}
