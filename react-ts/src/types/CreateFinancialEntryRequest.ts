import type { EntryType } from "./EntryType";

export type CreateFinancialEntryRequest = {
    amount: number;
    category: string;
    description: string;
    date: string; //yyyy-MM-dd
    type : EntryType;
    isFixed: boolean;
};