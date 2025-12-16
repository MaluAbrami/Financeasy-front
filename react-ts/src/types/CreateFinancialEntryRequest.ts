export type CreateFinancialEntryRequest = {
    amount: number;
    description: string;
    date: string; //yyyy-MM-dd
    categoryId: string;
};