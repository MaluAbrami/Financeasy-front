import type { EntryType } from "./EntryType"

export type CategoryResponse = {
    id: string,
    name: string,
    type: EntryType,
    isFixed: boolean
}