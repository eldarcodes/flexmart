import { Star } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";
import { cn } from "@/lib/utils";

export type ProductColumn = {
  id: string;
  name: string;
  isFeatured: boolean;
  isArchived: boolean;
  price: string;
  createdAt: string;
  category: string;
  size: string;
  color: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "isFeatured",
    header: () => <div className="text-center">Featured</div>,

    cell: ({ row }) => (
      <Star
        className={cn(
          "h-6 text-center w-full border-none hover:cursor-pointer hover:fill-yellow-400",
          row.original.isFeatured ? "text-yellow-400 fill-yellow-400" : ""
        )}
        onClick={() => {
          // @TODO: Implement feature toggle
          console.log("Feature toggle");
        }}
      />
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-1">
        <div
          className="w-3 h-3 rounded-full border"
          style={{ backgroundColor: row.original.color }}
        />

        {row.original.color}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "action",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
