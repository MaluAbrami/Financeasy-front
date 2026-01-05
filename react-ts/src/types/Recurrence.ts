import type { AdjustmentRule } from "./AdjustmentRule";

export type Recurrence = {
    id: string;
    frequency: string;
    dayOfMonth?: number;
    dayOfWeek?: number;
    adjustmentRule?: AdjustmentRule;
    startDate: string | null;
    endDate?: string | null;
    amount: number;
    isActive: boolean;
}