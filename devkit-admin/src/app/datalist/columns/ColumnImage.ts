
import { h } from "vue"
import type { DatalistColumn } from './_types';
import { AppImage } from 'devkit-base-components'
import { DatalistColumnBase } from "./ColumnBase";
export class ColumnImage<TRecord extends Record<string, unknown>> extends DatalistColumnBase<TRecord> implements DatalistColumn<TRecord> {
  renderHtml = (value: TRecord) => {
    if (this.columnName in value) {
      if (typeof value[this.columnName] == 'string') {
        return h(AppImage, { src: value[this.columnName] as string, size: 150 })
      }
    }
    return h('span', 'unable_to_parse')
  }
}

