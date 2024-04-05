import { Store } from "@prisma/client";
import axios from "axios";

export interface CreateColorInput {
  name: string;
  value: string;
}

export interface UpdateColorInput {
  name: string;
  value: string;
}

export const list = async (storeId: string) => {
  return axios.get<Store[]>(`/api/stores/${storeId}/colors`);
};

export const create = async (storeId: string, data: CreateColorInput) => {
  return axios.post<Store>(`/api/stores/${storeId}/colors`, data);
};

export const update = async (
  storeId: string,
  colorId: string,
  data: UpdateColorInput
) => {
  return axios.patch<Store>(`/api/stores/${storeId}/colors/${colorId}`, data);
};

export const remove = async (storeId: string, colorId: string) => {
  return axios.delete(`/api/stores/${storeId}/colors/${colorId}`);
};
