import { Store } from "@prisma/client";
import axios from "axios";

export interface CreateSizeInput {
  name: string;
  value: string;
}

export interface UpdateSizeInput {
  name: string;
  value: string;
}

export const list = async (storeId: string) => {
  return axios.get<Store[]>(`/api/stores/${storeId}/sizes`);
};

export const create = async (storeId: string, data: CreateSizeInput) => {
  return axios.post<Store>(`/api/stores/${storeId}/sizes`, data);
};

export const update = async (
  storeId: string,
  sizeId: string,
  data: UpdateSizeInput
) => {
  return axios.patch<Store>(`/api/stores/${storeId}/sizes/${sizeId}`, data);
};

export const remove = async (storeId: string, sizeId: string) => {
  return axios.delete(`/api/stores/${storeId}/sizes/${sizeId}`);
};
