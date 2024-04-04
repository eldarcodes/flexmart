"use client";

import { Billboard } from "@prisma/client";
import dayjs from "dayjs";

import { DataTable } from "@/components/ui/data-table";

import { BillboardColumn, columns } from "./columns";

interface BillboardsListProps {
  billboards: Billboard[];
}

export function BillboardsList({ billboards }: BillboardsListProps) {
  const formattedData: BillboardColumn[] = billboards.map((billboard) => ({
    id: billboard.id,
    label: billboard.label,
    createdAt: dayjs(billboard.createdAt).format("DD.MM.YYYY HH:mm"),
  }));

  return (
    <>
      <DataTable searchKey="label" columns={columns} data={formattedData} />
    </>
  );
}
