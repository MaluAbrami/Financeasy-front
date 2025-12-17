export type CreateCategoryRequest = {
    name: string;
    type: number;
    isFixed: boolean;
    recurrence?: {
        frequency: number;
        dayOfMonth: number;
        dayOfWeek: number;
        adjustmentRule: number;
        startDate: string | null;
        endDate: string | null;
        amount: number;
    };
}