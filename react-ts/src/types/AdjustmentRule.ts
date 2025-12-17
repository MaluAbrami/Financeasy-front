export const AdjustmentRule = {
    FifthBusinessDay: "FifthBusinessDay",
    LastDayOfMonth: "LastDayOfMonth",
    LastBusinessDay: "LastBusinessDay",
    Exact: "Exact"
}

export type AdjustmentRule = typeof AdjustmentRule[keyof typeof AdjustmentRule];