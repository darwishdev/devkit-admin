
import { h } from "vue"

import { ColumnBase } from "./ColumnBase"
import { DatalistColumnBase } from "../types"
import { AppImage } from 'devkit-base-components'
export class ColumnImage<TRecord extends Record<string, unknown>> extends ColumnBase<TRecord> implements DatalistColumnBase<TRecord> {
  renderHtml = (value: TRecord) => {
    if (this.columnName in value) {
      if (typeof value[this.columnName] == 'string') {
        return h(AppImage, { src: value[this.columnName] as string, size: 150 })
      }
    }
    return h('span', 'unable_to_parse')
  }
}

