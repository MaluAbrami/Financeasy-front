import { http } from "./httpClient";
import type { FinancialEntry } from "../types/FinancialEntry.ts";
import type { GetAllFinancialEntrysByUser } from "../types/GetAllFinancialEntrysByUser.ts";
import type { CreateFinancialEntryRequest } from "../types/CreateFinancialEntryRequest.ts";
import type { FinancialEntryOrderBy } from "../types/FinancialEntryOrderBy.ts";
import type { SortDirection } from "../types/SortDirection.ts";

export const financialEntryApi = {
  list: (page: number, pageSize: number, orderBy: FinancialEntryOrderBy, direction: SortDirection) => http.get<GetAllFinancialEntrysByUser>(`/financial-entry/all-by-user/${page}/${pageSize}/${orderBy}/${direction}`),

  getById: (id: string) =>
    http.get<FinancialEntry>(`/financial-entry`, {
      params: { id: id }
    }),

  create: (data: CreateFinancialEntryRequest) =>
    http.post("/financial-entry", data),

  update: (id: string, data: Partial<FinancialEntry>) =>
    http.patch(`/financial-entry/${id}`, data),

  delete: (id: string) =>
    http.delete(`/financial-entry`, {
      params: { id: id }
    })
};