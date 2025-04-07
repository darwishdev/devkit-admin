
import { h } from "vue"
import type { DatalistColumn } from './_types';
import { DatalistColumnBase } from "./ColumnBase";

export class ColumnText<TRecord extends Record<string, unknown>> extends DatalistColumnBase<TRecord> implements DatalistColumn<TRecord> {
  renderHtml = (value: TRecord) => {

    console.log('typeos', typeof value[this.columnName])
    try {
      console.log('typeos', typeof value[this.columnName])
      if (this.columnName in value) {
        if (typeof value[this.columnName] == 'string') {
          return h('span', value[this.columnName] as string)
        }
        if (typeof value[this.columnName] == 'number') {
          return h('span', value[this.columnName] as string)
        }
      }
    } catch (e) {
      return h('span', 'error_parsing_column')
    }

    return h('span', 'unable_to_parse')
  }
}

