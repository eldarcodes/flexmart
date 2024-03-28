import axios from "axios";

interface CreateStoreInput {
  name: string;
}

export const create = async (data: CreateStoreInput) => {
  return axios.post("/api/stores", data);
};
