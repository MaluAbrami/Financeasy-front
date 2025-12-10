export const EntryType = {
    Income: "Income",
    Expense: "Expense"
} as const;

export type EntryType = typeof EntryType[keyof typeof EntryType];