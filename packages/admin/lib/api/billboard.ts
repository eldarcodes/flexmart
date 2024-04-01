import { Store } from "@prisma/client";
import axios from "axios";

export interface CreateBillboardInput {
  label: string;
}

export interface UpdateBillboardInput {
  label: string;
}

export const list = async () => {
  return axios.get<Store[]>("/api/billboards");
};

export const create = async (data: CreateBillboardInput) => {
  return axios.post<Store>("/api/billboards", data);
};

export const update = async (id: string, data: UpdateBillboardInput) => {
  return axios.patch<Store>(`/api/billboards/${id}`, data);
};

export const remove = async (id: string) => {
  return axios.delete(`/api/billboards/${id}`);
};
