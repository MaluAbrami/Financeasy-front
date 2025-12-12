import type { GetFinancialSummaryResponse } from "../types/GetFinancialSummaryResponse";
import { http } from "./httpClient"

const baseUrl = "/dashboards";

export const dashboardApi = {
    getFinancialSummary: () => http.get<GetFinancialSummaryResponse>(`${baseUrl}/financial-summary`),
    getBalanceEvolution: (initialYear: number, initialMonth: number, endYear: number, endMonth: number) =>  http.get(`${baseUrl}/balance-evolution/${initialYear}/${initialMonth}/${endYear}/${endMonth}`),
    getSpendingByCategory: (category: string) => http.get(`${baseUrl}/spending-by-category`, {
        params: { category: category }
    }),
    getSpendingByMonth: (year: number, month: number) => http.get(`${baseUrl}/spending-by-month`, {
        params: { year: year, month: month }
    })
}