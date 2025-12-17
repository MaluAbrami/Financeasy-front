export const CategoryOrderBy = {
    Name: "Name",
    Type: "Type"
}

export type CategoryOrderBy = typeof CategoryOrderBy[keyof typeof CategoryOrderBy];