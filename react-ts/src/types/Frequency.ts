export const Frequency = {
    Weekly: "Weekly",
    Monthly: "Monthly",
    Yearly: "Yearly"
} as const;

export type Frequency = typeof Frequency[keyof typeof Frequency];