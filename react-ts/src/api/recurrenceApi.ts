import type { CreateRecurrenceRequest } from "../types/CreateRecurrenceRequest";
import { http } from "./httpClient";

const baseurl = "/recurrences";

export const recurrenceApi = {
  create: (data: CreateRecurrenceRequest) =>
    http.post(`${baseurl}`, data),

  getAllByCategory: (categoryId: string) =>
    http.get(`${baseurl}/all-by-category-id/${categoryId}`),

  delete: (id: string) =>
    http.delete(`${baseurl}/${id}`),
};