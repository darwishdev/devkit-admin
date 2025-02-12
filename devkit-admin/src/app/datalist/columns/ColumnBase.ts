
import type { FormKitSchemaNode } from '@formkit/core'
import { h } from "vue"
import { type ColumnProps } from 'primevue/column';
import type { DatalistFilter } from '../utilities/_filtersTypes';
import type { DatalistColumnProps, DatalistColumn } from './_types';
import { DatalistRouter } from '../types';


export class DatalistColumnBase<TRecord extends Record<string, unknown>> {
  columnProps: ColumnProps = {}
  columnName: keyof TRecord
  router?: DatalistRouter<TRecord>
  editInput?: FormKitSchemaNode
  isGlobalFilter: boolean
  isSortable?: boolean
  filters?: DatalistFilter<TRecord>[]
  constructor(name: keyof TRecord, params: DatalistColumnProps<TRecord>) {
    this.columnName = name
    this.filters = params.filters
    this.editInput = params.editInput
    this.isSortable = params.isSortable
    this.columnProps.sortable = params.isSortable
    this.isGlobalFilter = params.isGlobalFilter ?? false
    this.filters = params.filters
    this.router = params.router
  }
}

export class ColumnText<TRecord extends Record<string, unknown>> extends DatalistColumnBase<TRecord> implements DatalistColumn<TRecord> {
  renderHtml = (value: TRecord) => {
    return h('span', value[this.columnName] as string)
  }
}

