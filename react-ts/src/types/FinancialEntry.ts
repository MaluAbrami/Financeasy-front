export type FinancialEntry = {
    id?: string;
    amount: number;
    category: string;
    description: string;
    date: string; //yyyy-MM-dd
    type : "Income" | "Expense";
    isFixed: boolean;
};