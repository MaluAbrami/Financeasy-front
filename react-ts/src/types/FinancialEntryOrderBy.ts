export const FinancialEntryOrderBy = {
    Category: "Category",
    Amount: "Amount",
    Date: "Date",
    Type: "Type"
}

export type FinancialEntryOrderBy = typeof FinancialEntryOrderBy[keyof typeof FinancialEntryOrderBy];