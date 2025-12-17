import { http } from "./httpClient";
import type { GetAllCategorys } from "../types/GetAllCategorys.ts";

export interface CreateCategoryRequest {
  name: string;
  type: number;
  isFixed: boolean;
  recurrence?: {
    frequency: number;
    dayOfMonth: number;
    dayOfWeek: number;
    adjustmentRule: number;
    startDate: string | null;
    endDate: string | null;
    amount: number;
  };
}

export const categoryApi = {
  list: () => http.get<GetAllCategorys>("/categorys/all"),
  create: (data: CreateCategoryRequest) => http.post("/categorys", data)
};