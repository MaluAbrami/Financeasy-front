import type { CreateRecurrenceRequest } from "../types/CreateRecurrenceRequest";
import { http } from "./httpClient";

export const recurrenceApi = {
  create: (data: CreateRecurrenceRequest) =>
    http.post("/recurrences", data),
};