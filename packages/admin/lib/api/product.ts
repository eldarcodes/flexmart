import { Store } from "@prisma/client";
import axios from "axios";

import { db } from "@/lib/db";
import { OverviewGraphData } from "@/components/overview";

export interface CreateProductInput {
  name: string;
}

export interface UpdateProductInput {
  name: string;
}

export const list = async (storeId: string) => {
  return axios.get<Store[]>(`/api/stores/${storeId}/products`);
};

export const create = async (storeId: string, data: CreateProductInput) => {
  return axios.post<Store>(`/api/stores/${storeId}/products`, data);
};

export const update = async (
  storeId: string,
  productId: string,
  data: UpdateProductInput
) => {
  return axios.patch<Store>(
    `/api/stores/${storeId}/products/${productId}`,
    data
  );
};

export const remove = async (storeId: string, productId: string) => {
  return axios.delete(`/api/stores/${storeId}/products/${productId}`);
};

export const getStockCount = async (storeId: string) => {
  const stockCount = await db.product.count({
    where: {
      storeId,
      isArchived: false,
    },
  });

  return stockCount;
};

export const getOverviewGraphData = async (storeId: string) => {
  const paidOrders = await db.order.findMany({
    where: {
      storeId,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  const monthlyRevenue: { [key: number]: number } = {};

  for (const order of paidOrders) {
    const month = order.createdAt.getMonth();

    let revenueForOrder = 0;

    for (const orderItem of order.orderItems) {
      revenueForOrder += +orderItem.product.price;
    }

    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder;
  }

  const graphData: OverviewGraphData[] = [
    { name: "Jan", total: 0 },
    { name: "Feb", total: 0 },
    { name: "Mar", total: 0 },
    { name: "Apr", total: 0 },
    { name: "May", total: 0 },
    { name: "Jun", total: 0 },
    { name: "Jul", total: 0 },
    { name: "Aug", total: 0 },
    { name: "Sep", total: 0 },
    { name: "Oct", total: 0 },
    { name: "Nov", total: 0 },
    { name: "Dec", total: 0 },
  ];

  for (const month in monthlyRevenue) {
    graphData[+month].total = monthlyRevenue[+month];
  }

  return graphData;
};
