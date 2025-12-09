import { http } from "./httpClient";
import type { FinancialEntry } from "../types/FinancialEntry.ts";
import type { GetAllFinancialEntrysByUser } from "../types/GetAllFinancialEntrysByUser.ts";
import type { CreateFinancialEntryRequest } from "../types/CreateFinancialEntryRequest.ts";

export const financialEntryApi = {
    list: () => http.get<GetAllFinancialEntrysByUser>("/financial-entry/all-by-user"),
    getById: (id: string) => http.get<FinancialEntry>(`/financial-entry/${id}`),
    create: (data: CreateFinancialEntryRequest) => http.post("/financial-entry", data),
    update: (id: string, data: Partial<FinancialEntry>) =>
        http.patch(`/financial-entry/${id}`, data),
    delete: (id: string) => http.delete(`/financial-entry/${id}`)
}