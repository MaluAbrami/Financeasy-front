import { http } from "./httpClient";
import type { GetAllCategorys } from "../types/GetAllCategorys.ts";
import type { CreateCategoryRequest } from "../types/CreateCategoryRequest.ts";
import type { SortDirection } from "../types/SortDirection.ts";
import type { FinancialEntryOrderBy } from "../types/FinancialEntryOrderBy.ts";

export const categoryApi = {
  list: (page: number, pageSize: number, orderBy: FinancialEntryOrderBy, direction: SortDirection) => http.get<GetAllCategorys>(`/categorys/all/${page}/${pageSize}/${orderBy}/${direction}`),
  create: (data: CreateCategoryRequest) => http.post("/categorys", data),
  delete: (id: string) => http.delete(`/categorys/${id}`) 
};