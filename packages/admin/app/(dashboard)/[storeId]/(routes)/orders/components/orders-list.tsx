"use client";

import { Order, OrderItem, Product } from "@prisma/client";
import dayjs from "dayjs";

import { DataTable } from "@/components/ui/data-table";

import { OrderColumn, columns } from "./columns";
import { formatter } from "@/lib/utils";

type OrderItemWithProduct = OrderItem & { product: Product };

interface OrdersListProps {
  orders: (Order & { orderItems: OrderItemWithProduct[] })[];
}

export function OrdersList({ orders }: OrdersListProps) {
  const formattedData: OrderColumn[] = orders.map((order) => ({
    id: order.id,
    phone: order.phone,
    address: order.address,
    isPaid: order.isPaid,
    products: order.orderItems
      .map((orderItem) => orderItem.product.name)
      .join(", "),
    totalPrice: formatter.format(
      order.orderItems.reduce((acc, item) => acc + +item.product.price, 0)
    ),
    createdAt: dayjs(order.createdAt).format("DD.MM.YYYY HH:mm"),
  }));

  return (
    <>
      <DataTable searchKey="phone" columns={columns} data={formattedData} />
    </>
  );
}
