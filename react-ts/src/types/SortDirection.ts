export const SortDirection = {
    Asc: "Asc",
    Desc: "Desc"
}

export type SortDirection = typeof SortDirection[keyof typeof SortDirection];