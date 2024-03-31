import { Store } from "@prisma/client";
import axios from "axios";

export interface CreateStoreInput {
  name: string;
}

export interface UpdateStoreInput {
  name: string;
}

export const list = async () => {
  return axios.get<Store[]>("/api/stores");
};

export const create = async (data: CreateStoreInput) => {
  return axios.post<Store>("/api/stores", data);
};

export const update = async (id: string, data: UpdateStoreInput) => {
  return axios.patch<Store>(`/api/stores/${id}`, data);
};

export const remove = async (id: string) => {
  return axios.delete(`/api/stores/${id}`);
};
