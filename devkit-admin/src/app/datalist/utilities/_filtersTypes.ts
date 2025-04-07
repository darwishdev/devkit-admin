
import type { DataTableFilterMetaData } from 'primevue'
import type { FormKitSchemaNode } from '@formkit/core'
export type FilterMatchModeValues = 'startsWith' | 'contains' | 'notContains' | 'endsWith' | 'equals' | 'notEquals' | 'in' | 'lt' | 'lte' | 'gt' | 'gte' | 'between' | 'dateIs' | 'dateIsNot' | 'dateBefore' | 'dateAfter'
export type DatalistFilterInput<TReq> = FormKitSchemaNode & { name: keyof TReq | string, value?: unknown }
export type DatalistFilter<TFiltersReq> = {
  isGlobal?: boolean
  input: DatalistFilterInput<TFiltersReq>
  matchMode: FilterMatchModeValues,
}
export type DatalistFiltersModel = Record<string, DataTableFilterMetaData>
