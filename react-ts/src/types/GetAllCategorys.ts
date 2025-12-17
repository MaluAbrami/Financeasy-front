import type { CategoryResponse } from "./CategoryResponse"
import type { PaginationDTO } from "./PaginationDTO"

export type GetAllCategorys = {
    categorys: CategoryResponse[],
    pagination: PaginationDTO
} 