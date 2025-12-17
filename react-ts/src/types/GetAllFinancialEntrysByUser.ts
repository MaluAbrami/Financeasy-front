import type { FinancialEntry } from "./FinancialEntry"
import type { PaginationDTO } from "./PaginationDTO";

export type GetAllFinancialEntrysByUser = {
    financialsByUser: FinancialEntry[];
    pagination: PaginationDTO;
};