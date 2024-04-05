import { Store } from "@prisma/client";
import axios from "axios";

export interface CreateCategoryInput {
  name: string;
  billboardId: string;
}

export interface UpdateCategoryInput {
  name: string;
  billboardId: string;
}

export const list = async (storeId: string) => {
  return axios.get<Store[]>(`/api/stores/${storeId}/categories`);
};

export const create = async (storeId: string, data: CreateCategoryInput) => {
  return axios.post<Store>(`/api/stores/${storeId}/categories`, data);
};

export const update = async (
  storeId: string,
  categoryId: string,
  data: UpdateCategoryInput
) => {
  return axios.patch<Store>(
    `/api/stores/${storeId}/categories/${categoryId}`,
    data
  );
};

export const remove = async (storeId: string, categoryId: string) => {
  return axios.delete(`/api/stores/${storeId}/categories/${categoryId}`);
};
