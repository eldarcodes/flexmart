import { CircleCheck, CircleX } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

export type OrderColumn = {
  id: string;
  phone: string;
  address: string;
  totalPrice: string;
  products: string;
  isPaid: boolean;
  createdAt: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "totalPrice",
    header: "Total price",
  },
  {
    accessorKey: "isPaid",
    header: () => <div className="text-center">Paid</div>,
    cell: ({ row }) => (
      <div className="w-full flex items-center justify-center">
        {row.original.isPaid ? (
          <CircleCheck className="text-green-700" />
        ) : (
          <CircleX className="text-red-700" />
        )}
      </div>
    ),
  },
];
