import type { FormKitSchemaNode } from '@formkit/core'
import type { ComputedRef, Ref } from "vue"
import type { ColumnProps, ColumnSlots } from 'primevue/column'
import type { DataTableMethods } from 'primevue'
import type { QueryObserverResult, UseMutationReturnType } from '@tanstack/vue-query'
import type { Store } from 'pinia'
import type { DatalistAvailableActions, DatalistProps, DatalistRecords, DatalistRouter, DatalistSlots, PaginationParams } from '../types'
import type { ApiListOptions, DatalisQueryReturnType, DatalistQueryResult, DeleteHandler } from '../utilities/_apiTypes'
import type { AppFormSection } from '@/pkg/types/types'
import type { DatalistFiltersModel } from '../utilities/_filtersTypes'
import { StringUnkownRecord } from 'devkit-apiclient'
export type DatalistStore<TReq, TRecord extends Record<string, unknown>> = Store<
  string,
  Pick<DatalistState<TReq, TRecord>, keyof DatalistState<TReq, TRecord>>,
  Pick<DatalistGetters<TRecord>, keyof DatalistGetters<TRecord>>,
  Pick<DatalistActions<TReq, TRecord>, keyof DatalistActions<TReq, TRecord>>
>
export type DeleteRestoreVariant = {
  disabled: boolean;
  hasSelectedData: boolean;
  hasDeletedRecords: boolean;
  icon: string;
  label: string;
  empty: string;
  severity: 'secondary' | 'success' | 'info' | 'warn' | 'help' | 'danger' | 'contrast' | undefined;

}

export type DatalistState<TReq, TRecord extends Record<string, unknown>> = {
  apiClient: Record<string, Function>
  debounceInMilliSeconds: number
  datalistColumns: {
    props: ColumnProps
    slots: Partial<ColumnSlots>
  }[];
  availableActions: DatalistAvailableActions
  paginationParams: Ref<PaginationParams>
  formSections?: Record<string, AppFormSection | FormKitSchemaNode[]>;
  datalistOptions: ApiListOptions;
  viewRouter: DatalistRouter<TRecord> | undefined
  datalistQueryResult: DatalistQueryResult<TRecord, Error> | undefined
  filtersFormKey: string;
  deleteResotreMutation?: DatalistDeleteMutation
  filtersFormSchema: FormKitSchemaNode[];
  isLoadingRef: Ref<boolean>;
  isShowDeletedRef: Ref<boolean>;
  modelFiltersRef: Ref<DatalistFiltersModel>;
  modelSelectionRef: Ref<TRecord[]>;
  rowIdentifier?: (keyof TRecord);
  tableElementRef: Ref<DataTableMethods | undefined>;
};

export type DatalistGetters<TRecord extends Record<string, unknown>> = {
  activeFilters: ComputedRef<Record<string, unknown>>
  deleteRestoreVariants: ComputedRef<DeleteRestoreVariant>;
};
export type DatalistDeleteMutation = UseMutationReturnType<void, unknown, {
  close: Function
  handler: DeleteHandler
}, unknown>
export type DatalistFetchParams<TReq, TRecord extends Record<string, unknown>> = {
  filtersValue: Record<string, unknown> | undefined
  records: DatalistRecords<TReq, TRecord>
  paginationParams: PaginationParams | undefined
  deletedRecords?: TRecord[]
  options?: ApiListOptions
}
export type DatalistMutations = {
  deleteMutation?: DatalistDeleteMutation
}
export type DatalistStoreInit<TReq, TRecord extends Record<string, unknown>> = {
  queryResult: QueryObserverResult<DatalisQueryReturnType<TRecord>, Error>,
  props: DatalistProps<TReq, TRecord>,
  slots: DatalistSlots<TReq, TRecord>,
  mutaions?: DatalistMutations
}
export type DatalistActions<TReq, TRecord extends Record<string, unknown>> = {
  applyFilters: (filtersFormValue: Partial<Record<(keyof TRecord) | string, unknown>>) => void;
  getRowIdentifier: () => keyof TRecord | undefined
  createNewRecord: () => void;
  datalistFetchFunction: (params: DatalistFetchParams<TReq, TRecord>) => Promise<DatalisQueryReturnType<TRecord>>
  assertValidDatalistQueryResult(
    result: DatalistQueryResult<TRecord, Error> | undefined
  ): asserts result is DatalistQueryResult<TRecord, Error> & { data: { options: ApiListOptions } }
  // deleteRestoreRecordsConfirmed: (dialog: { close: Function }) => Promise<void>
  deleteRecordsConfirmed: (props: { close: Function, handler: DeleteHandler }) => Promise<void>
  // deleteRecords: (row?: TRecord) => void;
  // deledatalistStore.deletmutatteRestoreRecords: (row?: TRecord) => void;
  showDeleteDialog: (mutation: DatalistDeleteMutation, handlerType: 'delete' | 'deleteRestore', row?: TRecord) => void;
  exportRecords: () => void;
  init: (params: DatalistStoreInit<TReq, TRecord>) => Promise<void>
  presistFilters: (filtersFormValue: Record<(keyof TRecord) | string, unknown>) => void;
  refetch: () => void;
  removeFilter: (filterKey: string) => void;
  resetFiltersForm: () => void;
  setIsShowDeletedRef: (value: boolean) => void;
  updateRecord: (record: TRecord) => void;
  viewRecord: (data: TRecord) => void;
};
