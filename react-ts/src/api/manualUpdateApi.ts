import type { UpdateResponse } from "../types/UpdateResponse";
import { http } from "./httpClient";

export const manualUpdateApi = {
  getLastUpdate: () =>
    http.get<UpdateResponse>("/manual-update/last"),

  create: () =>
    http.post("/manual-update"),
};