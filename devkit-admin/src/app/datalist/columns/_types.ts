
import type { FormKitSchemaNode } from '@formkit/core'
import { type VNode } from "vue"
import type { DatalistRouter } from '../types'
import { type ColumnProps } from 'primevue/column';
import type { DatalistFilter } from '../utilities/_filtersTypes';

export type DatalistColumns<TRecord extends Record<string, unknown>> = Partial<Record<keyof TRecord, DatalistColumn<TRecord>>>

export interface DatalistColumnProps<TRecord extends Record<string, unknown>> {
  isSortable: boolean,
  editInput?: FormKitSchemaNode
  isGlobalFilter?: boolean
  filters?: DatalistFilter<TRecord>[]
  router?: DatalistRouter<TRecord>
}

export interface DatalistColumn<TRecord extends Record<string, unknown>> {
  columnProps?: ColumnProps
  filters?: DatalistFilter<TRecord>[]
  tableRouter?: DatalistRouter<TRecord>
  editInput?: FormKitSchemaNode
  isGlobalFilter?: boolean
  isSortable?: boolean
  renderHtml?: (value: TRecord) => VNode
}
