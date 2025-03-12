
import type { FormKitSchemaNode } from '@formkit/core'
import { type ColumnNode, type ColumnProps, type ColumnSlots } from 'primevue';
import type { CardSlots, DatalistSlots, } from '../types'
import { type VNode } from 'vue';
import type { DatalistColumns } from '../columns/_types';
import { ColumnText } from '../columns/ColumnBase';
import type { DatalistFiltersModel } from './_filtersTypes';
import { ObjectKeys, StringUnkownRecord } from 'devkit-apiclient';
export const _constructColumns = <TRecord extends StringUnkownRecord>(record: TRecord, execludedKeys: (keyof TRecord)[] = [], defaultOptions: { isSortable: boolean } = { isSortable: true }): DatalistColumns<TRecord> => {
  const columns = {} as DatalistColumns<TRecord>;
  ObjectKeys(record).forEach((key) => {
    if (!execludedKeys.includes(key)) {
      columns[key] = new ColumnText<TRecord>(key, defaultOptions);
    }
  })
  return columns;
}
export type DatalistPrimevueColumn = {
  props: ColumnProps,
  slots: Partial<ColumnSlots>
}
export const _extractCardColumns = <TReq extends StringUnkownRecord, TRecord extends StringUnkownRecord>({ card, cardStart, cardEnd }: CardSlots<TReq, TRecord>): DatalistPrimevueColumn[] => {
  if (card) {
    return [{ props: { class: 'card' }, slots: { body: ({ data }) => card({ data }) } }]
  }
  const startColumn: DatalistPrimevueColumn | undefined = cardStart ? { props: { class: 'card-start' }, slots: { body: ({ data }) => cardStart({ data }) } } : undefined
  const endColumn: DatalistPrimevueColumn | undefined = cardEnd ? { props: { class: 'card-end' }, slots: { body: ({ data }) => cardEnd({ data }) } } : undefined
  const cardColumns: DatalistPrimevueColumn[] = []
  if (startColumn) cardColumns.push(startColumn)
  if (endColumn) cardColumns.push(endColumn)
  return cardColumns
}

export const _extractColumns = <TReq extends StringUnkownRecord, TRecord extends StringUnkownRecord>(columns: DatalistColumns<TRecord>, slots: DatalistSlots<TReq, TRecord>) => {
  const filtersFormSchema: FormKitSchemaNode[] = []
  const datalistColumns: DatalistPrimevueColumn[] = []
  const modelFilters: DatalistFiltersModel = {}
  let index = 0
  for (const dataHeaderKey of ObjectKeys(columns)) {
    const currentDataHeader = columns[dataHeaderKey]
    if (!currentDataHeader) {
      continue
    }
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

    const currentColumnProps = {
      field: dataHeaderKey as string,
      header: dataHeaderKey as string,
      sortable: currentDataHeader.isSortable,

    }
    datalistColumns[index] = {
      slots: {
        body: bodySlot as ((scope: { data: TRecord; node: unknown; column: ColumnNode; field: string; index: number; frozenRow: boolean; editorInitCallback: (event: Event) => void; rowTogglerCallback: (event: Event) => void }) => VNode[]),
      },
      props: currentColumnProps
    }
    if (currentDataHeader.filters) {
      currentDataHeader.filters.forEach((c) => {
        filtersFormSchema.push(c.input)
        modelFilters[dataHeaderKey as string] = { matchMode: c.matchMode, value: null }
      })
    }
    index++
  }
  return { datalistColumns, modelFilters, filtersFormSchema }
  //filtersFormSchema = filters.map(f => f.input)
}
