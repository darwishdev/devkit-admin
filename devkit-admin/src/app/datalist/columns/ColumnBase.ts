
import type { FormKitSchemaNode } from '@formkit/core'
import { ColumnSlots, type ColumnProps } from 'primevue/column';
import type { DatalistFilter } from '../utilities/_filtersTypes';
import type { DatalistColumn} from './_types';
import { DatalistRouter } from '../types';


export class DatalistColumnBase<TRecord extends Record<string, unknown>> {
  columnProps: ColumnProps = {}
  columnName: keyof TRecord
  router?: DatalistRouter<TRecord>
  editInput?: FormKitSchemaNode
  slots?: ColumnSlots
  isGlobalFilter: boolean
  isSortable?: boolean
  filters?: DatalistFilter<TRecord>[]
  constructor(name: keyof TRecord, params: DatalistColumn<TRecord>) {
    this.columnName = name
    this.filters = params.filters
    this.slots = params.slots
    this.editInput = params.editInput
    this.isSortable = params.isSortable
    this.columnProps.sortable = params.isSortable
    this.isGlobalFilter = params.isGlobalFilter ?? false
    this.filters = params.filters
    this.router = params.router
  }
}

