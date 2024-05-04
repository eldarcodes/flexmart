import { Store } from "@prisma/client";
import axios from "axios";

import { db } from "@/lib/db";

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

export const getTotalRevenue = async (storeId: string) => {
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

  const totalRevenue = paidOrders.reduce((total, order) => {
    const orderTotal = order.orderItems.reduce((acc, orderItem) => {
      return acc + +orderItem.product.price;
    }, 0);

    return total + orderTotal;
  }, 0);

  return totalRevenue;
};

export const getSalesCount = async (storeId: string) => {
  const salesCount = await db.order.count({
    where: {
      storeId,
      isPaid: true,
    },
  });

  return salesCount;
};
