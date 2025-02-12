import type { DataTableFilterMetaData } from 'primevue/datatable';
import type { DatalistFiltersModel } from './_filtersTypes';
import { RouteQueryAppend } from '@/pkg/utils/QueryUtils';
import { ObjectKeys } from 'devkit-apiclient'

export const _presistFilters = (filtersFormKey: string, filtersFormValue: Record<string, unknown>) => {
  const filtersFormValueString = JSON.stringify(filtersFormValue)
  localStorage.setItem(filtersFormKey, filtersFormValueString)
}
export type ApplyFiltersParams<TRecord> = {
  filtersFormKey: string,
  filtersFormValue: Partial<Record<keyof TRecord & string, unknown>>,
  modelFiltersRefValue: DatalistFiltersModel,
  useFilterPersist?: boolean
}
export const _applyFilters = <TRecord>(params: ApplyFiltersParams<TRecord>) => {
  const { filtersFormKey, filtersFormValue, modelFiltersRefValue, useFilterPersist } = params
  const filtersFormKeys = ObjectKeys(filtersFormValue)
  const newModelValue: Partial<Record<keyof TRecord, DataTableFilterMetaData>> = {}
  for (const dataHeaderKey of filtersFormKeys) {
    const currentInputValue = filtersFormValue[dataHeaderKey]
    const filerObj: DataTableFilterMetaData | undefined = modelFiltersRefValue[dataHeaderKey]
    if (!filerObj) continue
    newModelValue[dataHeaderKey] = { value: currentInputValue, matchMode: filerObj.matchMode }
  }
  const filtersFormValueString = JSON.stringify(filtersFormValue)
  RouteQueryAppend(filtersFormKey, filtersFormValueString)
  if (useFilterPersist) {
    _presistFilters(filtersFormKey, filtersFormValue)
  }
  return newModelValue
}

