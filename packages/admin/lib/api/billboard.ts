import { Store } from "@prisma/client";
import axios from "axios";

export interface CreateBillboardInput {
  label: string;
}

export interface UpdateBillboardInput {
  label: string;
}

export const list = async (storeId: string) => {
  return axios.get<Store[]>(`/api/stores/${storeId}/billboards`);
};

export const create = async (storeId: string, data: CreateBillboardInput) => {
  return axios.post<Store>(`/api/stores/${storeId}/billboards`, data);
};

export const update = async (
  storeId: string,
  billboardId: string,
  data: UpdateBillboardInput
) => {
  return axios.patch<Store>(
    `/api/stores/${storeId}/billboards/${billboardId}`,
    data
  );
};

export const remove = async (storeId: string, billboardId: string) => {
  return axios.delete(`/api/stores/${storeId}/billboards/${billboardId}`);
};
