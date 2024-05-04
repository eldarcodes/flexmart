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

export const getStockCount = async (storeId: string) => {
  const stockCount = await db.product.count({
    where: {
      storeId,
      isArchived: false,
    },
  });

  return stockCount;
};
