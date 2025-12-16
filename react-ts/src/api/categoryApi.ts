import { http } from "./httpClient";
import type { GetAllCategorys } from "../types/GetAllCategorys.ts";

export const categoryApi = {
  list: () => http.get<GetAllCategorys>("/categorys/all")
};