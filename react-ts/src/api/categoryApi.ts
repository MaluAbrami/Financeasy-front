import { http } from "./httpClient";
import type { GetAllCategorys } from "../types/GetAllCategorys.ts";
import type { CreateCategoryRequest } from "../types/CreateCategoryRequest.ts";

export const categoryApi = {
  list: () => http.get<GetAllCategorys>("/categorys/all"),
  create: (data: CreateCategoryRequest) => http.post("/categorys", data),
  delete: (id: string) => http.delete(`/categorys/${id}`) 
};