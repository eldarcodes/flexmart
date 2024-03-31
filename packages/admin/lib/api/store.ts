import { Store } from "@prisma/client";
import axios from "axios";

interface CreateStoreInput {
  name: string;
}

export const list = async () => {
  return axios.get<Store[]>("/api/stores");
};

export const create = async (data: CreateStoreInput) => {
  return axios.post<Store>("/api/stores", data);
};
