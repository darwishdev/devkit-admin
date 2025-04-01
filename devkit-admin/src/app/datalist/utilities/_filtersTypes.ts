
import type { DataTableFilterMetaData } from 'primevue'
import type { FormKitSchemaNode } from '@formkit/core'
export type FilterMatchModeValues = 'startsWith' | 'contains' | 'notContains' | 'endsWith' | 'equals' | 'notEquals' | 'in' | 'lt' | 'lte' | 'gt' | 'gte' | 'between' | 'dateIs' | 'dateIsNot' | 'dateBefore' | 'dateAfter'
export type DatalistFilter<TRecord> = {
  isServerSide?: boolean
  matchMode: FilterMatchModeValues,
  input: FormKitSchemaNode & { name: keyof TRecord }
}

export type DatalistFiltersModel = Record<string, DataTableFilterMetaData>
