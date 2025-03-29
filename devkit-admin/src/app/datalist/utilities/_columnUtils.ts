
import type { FormKitSchemaNode } from '@formkit/core'
import { type ColumnNode, type ColumnProps, type ColumnSlots } from 'primevue';
import type { CardSlots, DatalistSlots, } from '../types'
import { h, type VNode } from 'vue';
import { ColumnText } from '../columns/ColumnText';
import type { DatalistColumn, DatalistColumns } from '../columns/_types';
import type { DatalistFiltersModel } from './_filtersTypes';
import { ObjectKeys, StringUnkownRecord } from 'devkit-apiclient';
import { DatalistColumnBase } from '../columns/ColumnBase';
import { ColumnImage } from '../columns/ColumnImage';
const _getBodySlot = <TReq extends StringUnkownRecord, TRecord extends StringUnkownRecord>
  (dataHeaderKey: keyof TRecord, currentDataHeader: DatalistColumns<TRecord>[keyof TRecord], slots: DatalistSlots<TReq, TRecord>) => {
  const isSlotPassed = `column.${dataHeaderKey as string}` in slots
  let columnSlots: Partial<ColumnSlots> | null = null
  if (typeof currentDataHeader.renderHtml == 'function') {
    const renderFunc = currentDataHeader.renderHtml
    columnSlots = {
      body: ({ data }) => [renderFunc(data)],
    }
  }

  const bodySlot = isSlotPassed
    ? (slots[`column.${dataHeaderKey as string}`])
    : columnSlots
      ? columnSlots.body
      : undefined;

  return bodySlot

}

export const _constructColumns = <TReq extends StringUnkownRecord, TRecord extends StringUnkownRecord>
  (record: TRecord,
    execludedKeys: (keyof TRecord)[] = [],
    slots: DatalistSlots<TReq, TRecord>): Partial<DatalistColumns<TRecord>> => {
  const datalistColumns: Partial<DatalistColumns<TRecord>> = {}
  for (const dataHeaderKey of ObjectKeys(record)) {
    const currentDataHeader = record[dataHeaderKey]
    if (!currentDataHeader || execludedKeys.includes(dataHeaderKey)) {
      continue
    }
    let currentColumn: DatalistColumn<TRecord> = new ColumnText(dataHeaderKey, {})
    if (typeof currentDataHeader == 'string') {
      if (currentDataHeader.includes(".webp")) {
        currentColumn = new ColumnImage(dataHeaderKey, {})
      }
    }
    const currentColumnProps = {
      field: dataHeaderKey as string,
      header: dataHeaderKey as string,
      sortable: record.isSortable,

    }
    const bodySlot = _getBodySlot(dataHeaderKey, currentColumn, slots)
    datalistColumns[dataHeaderKey] = {
      slots: {
        body: bodySlot as ((scope: { data: TRecord; node: unknown; column: ColumnNode; field: string; index: number; frozenRow: boolean; editorInitCallback: (event: Event) => void; rowTogglerCallback: (event: Event) => void }) => VNode[]),
      },
      props: currentColumnProps
    } as DatalistColumn<TRecord>


    // ObjectKeys(record).forEach((key) => {
    //   if (execludedKeys.includes(key)) {
    //     continue
    //   }

    // })
  }

  return datalistColumns;
}
export const _extractDatalistColumns = <TReq extends StringUnkownRecord, TRecord extends StringUnkownRecord>(columns: DatalistColumns<TRecord>, slots: DatalistSlots<TReq, TRecord>): Partial<DatalistColumns<TRecord>> => {
  const datalistColumns: Partial<DatalistColumns<TRecord>> = {}
  for (const dataHeaderKey of ObjectKeys(columns)) {
    const currentDataHeader = columns[dataHeaderKey]
    if (!currentDataHeader) {
      continue
    }
    const currentColumnProps = {
      field: dataHeaderKey as string,
      header: dataHeaderKey as string,
      sortable: currentDataHeader.isSortable,

    }
    const bodySlot = _getBodySlot(dataHeaderKey, datalistColumns, slots)
    datalistColumns[dataHeaderKey] = {
      slots: {
        body: bodySlot as ((scope: { data: TRecord; node: unknown; column: ColumnNode; field: string; index: number; frozenRow: boolean; editorInitCallback: (event: Event) => void; rowTogglerCallback: (event: Event) => void }) => VNode[]),
      },
      props: currentColumnProps
    } as DatalistColumn<TRecord>
  }
  return datalistColumns
}
//export const _extractColumns = <TReq extends StringUnkownRecord, TRecord extends StringUnkownRecord>(columns: DatalistColumns<TRecord>, slots: DatalistSlots<TReq, TRecord>) => {
//  const filtersFormSchema: FormKitSchemaNode[] = []
//  const datalistColumns: DatalistPrimevueColumn[] = []
//  const modelFilters: DatalistFiltersModel = {}
//  let index = 0
//  for (const dataHeaderKey of ObjectKeys(columns)) {
//    const currentDataHeader = columns[dataHeaderKey]
//    if (!currentDataHeader) {
//      continue
//    }
//    const isSlotPassed = `column.${dataHeaderKey as string}` in slots
//    let columnSlots: Partial<ColumnSlots> | null = null
//    if (typeof currentDataHeader.renderHtml == 'function') {
//      const renderFunc = currentDataHeader.renderHtml
//      columnSlots = {
//        body: ({ data }) => [renderFunc(data)],
//      }
//    }

//    const bodySlot = isSlotPassed
//      ? (slots[`column.${dataHeaderKey as string}`])
//      : columnSlots
//        ? columnSlots.body
//        : undefined;

//    const currentColumnProps = {
//      field: dataHeaderKey as string,
//      header: dataHeaderKey as string,
//      sortable: currentDataHeader.isSortable,

//    }
//    datalistColumns[index] = {
//      slots: {
//        body: bodySlot as ((scope: { data: TRecord; node: unknown; column: ColumnNode; field: string; index: number; frozenRow: boolean; editorInitCallback: (event: Event) => void; rowTogglerCallback: (event: Event) => void }) => VNode[]),
//      },
//      props: currentColumnProps
//    }
//    if (currentDataHeader.filters) {
//      currentDataHeader.filters.forEach((c) => {
//        filtersFormSchema.push(c.input)
//        modelFilters[dataHeaderKey as string] = { matchMode: c.matchMode, value: null }
//      })
//    }
//    index++
//  }
//  return { datalistColumns, modelFilters, filtersFormSchema }
//  //filtersFormSchema = filters.map(f => f.input)
//}
