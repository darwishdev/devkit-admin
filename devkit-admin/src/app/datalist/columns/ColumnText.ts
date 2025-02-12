
import { h } from "vue"
import type { DatalistColumn } from './_types';
import { DatalistColumnBase } from "./ColumnBase";

export class ColumnText<TRecord extends Record<string, unknown>> extends DatalistColumnBase<TRecord> implements DatalistColumn<TRecord> {
  renderHtml = (value: TRecord) => {
    return h('span', value[this.columnName] as string)
  }
}

