
import { ref, computed, h, inject, type Ref, type ComputedRef } from 'vue'
import { AppDialog } from 'devkit-base-components'
import type { FormKitSchemaNode } from '@formkit/core'
import { defineStore } from 'pinia'
import type { DatalistAvailableActions, DatalistContext, DatalistSlots, DatalistRouter, PaginationParams, CardSlots } from '../types'
import { type DatalistDeleteMutation, type DatalistFetchParams, type DatalistStore, type DatalistStoreInit, type DeleteRestoreVariant } from './types'
import { useRouter } from 'vue-router'
import { Message, useDialog, type DataTableMethods } from 'primevue'
import type { ColumnProps, ColumnSlots } from 'primevue'
import { useDebounceFn } from '@vueuse/core'
import { _deleteRecordsConfirmed, _refetch, _datalistFetchWithArray, _datalistFetchWithString, _datalistFetchWithFunction } from '../utilities/_queryUtils'
import { _constructColumns, _extractCardColumns, _extractColumns } from '../utilities/_columnUtils'
import { _applyFilters, _presistFilters } from '../utilities/_filterUtils'
import { _createRecord, _updateRecord, _viewRecord } from '../utilities/_crudUtils'
import type { ApiListOptions, DatalisQueryReturnType, DatalistQueryResult } from '../utilities/_apiTypes'
import type { StringUnkownRecord, AppFormProps, AppFormSection, SubmitHandler } from '@/pkg/types/types'
import type { DatalistFiltersModel } from '../utilities/_filtersTypes'
import type { DatalistColumns } from '../columns/_types'
import { ColumnText } from '../columns/ColumnBase'
import { AssertIsDefined, ObjectKeys } from 'devkit-apiclient'
import AppForm from '@/app/appform/AppForm.vue'
export const useDatalistStore = <TReq, TRecord extends Record<string, unknown>>(
  datalistKey: string) => defineStore(`datalist-${datalistKey}` as string, () => {
    let datalistOptions: ApiListOptions = { title: datalistKey, description: `${datalistKey}_description` }
    const filtersFormKey = `${datalistKey}-filters`
    let formSections: Record<string, AppFormSection | FormKitSchemaNode[]> | undefined
    let rowIdentifier: (keyof TRecord) | undefined = `${datalistKey}Id` as keyof TRecord
    let viewRouter: DatalistRouter<TRecord> | undefined
    const filtersFormSchema: FormKitSchemaNode[] = []
    const paginationParams: Ref<PaginationParams> = ref({ lastRowValue: "2", sortFunction: "asc", sortColumn: "roleId", pageNumber: 2, isDeleted: false, pageSize: 10 })
    let useFilterPersist: boolean | undefined
    let debounceInMilliSeconds = 1000
    let deleteResotreMutation: DatalistDeleteMutation | undefined
    let deleteMutation: DatalistDeleteMutation | undefined
    const availableActions: DatalistAvailableActions = {}
    let datalistQueryResult: DatalistQueryResult<TRecord, Error> | undefined
    const datalistColumns: { props: ColumnProps, slots: Partial<ColumnSlots> }[] = []
    const tableElementRef: Ref<DataTableMethods | undefined> = ref()
    const modelSelectionRef: Ref<TRecord[]> = ref([])
    const isLoadingRef = ref(false)
    const dialogErrorRef = ref('')
    const isShowDeletedRef = ref(false)
    const apiClient = inject('apiClient') as Record<string, Function>
    const modelFiltersRef: Ref<DatalistFiltersModel> = ref({})
    const { push } = useRouter()
    const dialog = useDialog()
    const deleteRestoreVariants: ComputedRef<DeleteRestoreVariant> = computed(() => {
      const hasDeletedRecords = true
      const hasSelectedData = modelSelectionRef.value.length > 0
      if (isShowDeletedRef.value) return { disabled: !hasSelectedData, hasSelectedData, hasDeletedRecords, icon: 'left', label: 'restore', empty: "empty_records_deleted", severity: 'success' } as DeleteRestoreVariant
      return { disabled: !hasSelectedData, hasDeletedRecords, icon: 'trash', label: 'delete', empty: "empty_records", severity: 'danger' } as DeleteRestoreVariant
    })
    const activeFilters: ComputedRef<Record<string, unknown>> = computed(() => {
      const activeFilters: Record<string, unknown> = {}
      const filtersFormKeys = ObjectKeys(modelFiltersRef.value)
      for (const dataHeaderKey of filtersFormKeys) {
        const currentInputValue = modelFiltersRef.value[dataHeaderKey]
        if (currentInputValue) {
          if (currentInputValue.value) {
            activeFilters[dataHeaderKey] = currentInputValue
          }
        }
      }
      return activeFilters
    })

    const datalistFetchFunction = ({ filtersValue, paginationParams, records, deletedRecords = [], options }: DatalistFetchParams<TReq, TRecord>): Promise<DatalisQueryReturnType<TRecord>> => {
      isLoadingRef.value = true
      if (Array.isArray(records)) {
        return _datalistFetchWithArray({ records, deletedRecords, options })
      }
      const requestPayload = { filters: filtersValue, paginationParams: paginationParams }
      const callBack = useDebounceFn(() => isLoadingRef.value = false, debounceInMilliSeconds)
      console.log("Requpaulo", requestPayload)
      if (typeof records == 'string') {
        return _datalistFetchWithString({ records, requestPayload, apiClient, callBack })
      }
      return _datalistFetchWithFunction<TReq, TRecord>({ records, requestPayload: requestPayload as TReq, callBack })
    }
    const refetch = () => {
      return _refetch(datalistQueryResult)
    }

    const setLazyProps = (ctx: DatalistContext<TReq, TRecord>) => {
      const { filters = [], formSections: formSectionsCtx, debounceInMilliseconds: debounceInMilliSecondsCtx = debounceInMilliSeconds, useFilterPersist: useFilterPersistCtx, rowIdentifier: rowIdentifierCtx, initiallySelectedItems = [], viewRouter: viewRouterCtx } = ctx

      console.log("cettntinglazu", filters)
      modelSelectionRef.value = initiallySelectedItems
      formSections = formSectionsCtx
      rowIdentifier = rowIdentifierCtx
      useFilterPersist = useFilterPersistCtx
      debounceInMilliSeconds = debounceInMilliSecondsCtx
      viewRouter = viewRouterCtx
      if (filters.length) {
        console.log("filter is ", filters)
        filters.forEach((c) => {
          filtersFormSchema.push(c.input)
          modelFiltersRef.value[c.input.name] = { matchMode: c.matchMode, value: null }
        })
      }
    }

    // Explicitly declare the type of the assertion function
    // Use the assertion
    const constructColumns = (execludedKeys: (keyof TRecord)[]): DatalistColumns<TRecord> => {
      console.log("constructing colllumnss", datalistQueryResult)
      AssertIsDefined(datalistQueryResult, "datalistQueryResult must not be undefined");
      AssertIsDefined(datalistQueryResult.data, "datalistQueryResult has no data");
      console.log("constructing colllumnss")
      const { records, deletedRecords = [] } = datalistQueryResult.data
      const columns: DatalistColumns<TRecord> = {}
      if (rowIdentifier) {
        columns[rowIdentifier] = new ColumnText<TRecord>(rowIdentifier, { isSortable: true })
      }
      if (records.length == 0 && deletedRecords.length == 0) {
        return columns
      }
      return records.length > 0 ? _constructColumns(records[0], execludedKeys) : _constructColumns(deletedRecords[0], execludedKeys)
    }
    const init = (
      { queryResult, props, slots, mutaions }: DatalistStoreInit<TReq, TRecord>
    ) => {
      return new Promise<void>((resolve) => {
        datalistQueryResult = queryResult
        console.log("initing the storeeeeee", datalistQueryResult, queryResult, queryResult.data)
        if (queryResult.data) {
          if (queryResult.data.options) {
            const { createHandler, updateHandler, deleteHandler } = queryResult.data.options
            availableActions.create = typeof createHandler != 'undefined'
            availableActions.update = typeof updateHandler != 'undefined'
            availableActions.delete = typeof deleteHandler != 'undefined'
          }
        }
        availableActions.create = true
        console.log(datalistQueryResult, 'from the init', props.context.filters)
        setLazyProps(props.context)
        const columns = props.context.columns ? props.context.columns : constructColumns(props.context.execludedColumns || [])
        if (props.context.displayType == 'table') extractColumns(columns, slots)
        if (props.context.displayType == 'card') {
          const { cardStart, cardEnd, card } = slots as CardSlots<TReq, TRecord>
          extractCardColumns({ cardStart, cardEnd, card })
        }
        if (props.context.filters) {
          props.context.filters.forEach((filter) => {
            modelFiltersRef.value[filter.input.name as string] = { matchMode: filter.matchMode, value: null }
          })
        }
        deleteResotreMutation = mutaions.deleteResotreMutation
        deleteMutation = mutaions.deleteMutation
        setTimeout(() => resolve(), 1)
      })
    }

    const removeFilter = (filterKey: string) => {
      if (!modelFiltersRef.value[filterKey]) return
      modelFiltersRef.value[filterKey].value = null
    }
    const presistFilters = (filtersFormValue: Record<(keyof TRecord) | string, unknown>) => {
      _presistFilters(filtersFormKey, filtersFormValue)
    }
    const applyFilters = (filtersFormValue: Partial<Record<(keyof TRecord) | string, unknown>>) => {
      console.log("appling filters ", filtersFormValue)
      const newModelValue = _applyFilters({ filtersFormKey, filtersFormValue, modelFiltersRefValue: modelFiltersRef.value, useFilterPersist })
      console.log(newModelValue, filtersFormValue)
      modelFiltersRef.value = { ...modelFiltersRef.value, ...newModelValue }
    }

    const extractCardColumns = ({ card, cardStart, cardEnd }: CardSlots<TReq, TRecord>) => {
      const values = _extractCardColumns<TReq, TRecord>({ card, cardStart, cardEnd })
      values.forEach((column, index) => datalistColumns[index] = column)
    }

    const extractColumns = (columns: DatalistColumns<TRecord>, slots: DatalistSlots<TReq, TRecord>) => {
      const values = _extractColumns(columns, slots)
      values.filtersFormSchema.forEach((input, index) => filtersFormSchema[index] = input)
      values.datalistColumns.forEach((column, index) => datalistColumns[index] = column)
      modelFiltersRef.value = values.modelFilters
    }
    const resetFiltersForm = () => {
      const filterKeys = ObjectKeys(modelFiltersRef.value)
      filterKeys.forEach((filterKey) => {
        if (modelFiltersRef.value[filterKey]) modelFiltersRef.value[filterKey].value = null
      })
    }
    const getRowIdentifier = (): (keyof TRecord) | undefined => rowIdentifier
    function assertValidDatalistQueryResult(
      result: DatalistQueryResult<TRecord, Error> | undefined
    ): asserts result is DatalistQueryResult<TRecord, Error> & { data: { options: ApiListOptions } } {
      AssertIsDefined(result, "datalistQueryResult must not be undefined");
      AssertIsDefined(result.data, "datalistQueryResult has no data");
      AssertIsDefined(result.data.options, "datalistQueryResult has no options");
    }
    const updateRecord = (record: TRecord) => {
      assertValidDatalistQueryResult(datalistQueryResult)
      AssertIsDefined(datalistQueryResult.data.options.updateHandler, "options has no update handler");
      const handler = datalistQueryResult.data.options.updateHandler
      if (!rowIdentifier) {
        //TODO:  handle this error properly
        console.log("this shouldn't be called")
        return
      }
      if (formSections) {
        console.log("open", handler, handler.endpoint)
        // const handlerFn = apiClient[handler.endpoint] as (req: unknown) => Promise<unknown>
        const submitHandler: SubmitHandler = {
          endpoint: handler.endpoint,

          callback: (resp: StringUnkownRecord): any => {
            console.log("refetching", resp)
            // refetch()
          }
        }
        console.log("recordrowid", record, rowIdentifier, record[rowIdentifier])
        if (!rowIdentifier) return
        const formProps: AppFormProps<'update'> = {
          context: {
            title: `${datalistKey}_update`,
            sections: formSections,
            invalidateCaches: [datalistKey],
            findHandler: {
              endpoint: 'userFindForUpdate',
              requestPropertyName: 'recordId',
              responsePropertyName: 'request',
              requestValue: record[rowIdentifier]
            },
            formKey: `update`,
            submitHandler
          }

        }
        dialog.open(h(AppForm, formProps))
        return
      }
      _updateRecord({ record, rowIdentifier, updateHandler: handler, formSchema: formSections, push })
    }
    const viewRecord = (record: TRecord) => {
      if (!viewRouter || !rowIdentifier) {
        //TODO:  handle this error properly
        console.log("this should not be called")
        return
      }
      _viewRecord({ record, viewRouter, push })
    }
    const createNewRecord = () => {
      assertValidDatalistQueryResult(datalistQueryResult)
      AssertIsDefined(datalistQueryResult.data.options.createHandler, "options has no create handler")
      const handler = datalistQueryResult.data.options.createHandler
      if (formSections) {
        const submitHandler: SubmitHandler<StringUnkownRecord, StringUnkownRecord> = {
          endpoint: handler.endpoint
        }
        dialog.open(h(AppForm, {
          context: {
            title: `${datalistKey}_create`,
            sections: formSections,
            invalidateCaches: [datalistKey],
            formKey: `${datalistKey}_create`,
            submitHandler
          }
        }))
        return
      }
      _createRecord({ createHandler: handler, formSchema: formSections, push })
    }
    const setIsShowDeletedRef = (value: boolean) => {
      isLoadingRef.value = true
      useDebounceFn(() => {
        console.log("calling the dbooo")
        isShowDeletedRef.value = value
        isLoadingRef.value = false
      }, debounceInMilliSeconds)()
    }
    const deleteRestoreRecordsConfirmed = (dialog: { close: Function }): Promise<void> => {
      console.log("confirmingngnng")
      return new Promise((resolve, reject) => {
        assertValidDatalistQueryResult(datalistQueryResult)
        AssertIsDefined(datalistQueryResult.data.options.deleteRestoreHandler, "options has no create handler")
        if (modelSelectionRef.value.length == 0 || !rowIdentifier) {
          reject("no selected records")
          return
        }
        _deleteRecordsConfirmed(
          {
            dialogRef: { close: () => null },
            handler: datalistQueryResult.data.options.deleteRestoreHandler,
            rowIdentifier,
            callback: deleteRecordsCallback,
            errorCallback: deleteRecordsErrorCallback,
            selectedRecords: modelSelectionRef.value,
            apiClient
          }
        ).then(() => { resolve(); dialog.close() }).catch((e: unknown) => { reject(e); dialog.close() })

      })
    }

    const deleteRecordsErrorCallback = (error: unknown) => {
      console.log(error)
    }
    const deleteRecordsCallback = () => {
      modelSelectionRef.value = []
    }
    const deleteRecordsConfirmed = (dialog: { close: Function }): Promise<void> => {
      return new Promise((resolve, reject) => {
        assertValidDatalistQueryResult(datalistQueryResult)
        AssertIsDefined(datalistQueryResult.data.options.deleteHandler, "options has no delete handler")
        if (modelSelectionRef.value.length == 0) {
          reject("no selected records")
          return
        }
        if (!rowIdentifier) {
          reject("row identifier is not passed")
          return
        }
        _deleteRecordsConfirmed(
          {
            dialogRef: { close: () => null },
            handler: datalistQueryResult.data.options.deleteHandler,
            rowIdentifier,
            callback: deleteRecordsCallback,
            errorCallback: deleteRecordsErrorCallback,
            selectedRecords: modelSelectionRef.value,
            apiClient
          }
        ).then(() => { resolve(); dialog.close() }).catch((e: unknown) => { reject(e); dialog.close() })

      })

    }
    const deleteRestoreRecords = (row?: TRecord) => {
      if (!deleteResotreMutation) return
      if (row) {
        modelSelectionRef.value = [row]
      }

      console.log("delete restore", modelSelectionRef)
      const dialogProps = {
        onConfirmed: deleteResotreMutation?.mutate,
        modal: true
      }
      dialog.open(h(AppDialog, dialogProps, {
        default: () => h("div", [
          h('h2', 'error here '),
          h('h2', 'are you sure?')
        ])
      }), {
        props: {
          modal: true,
          dismissableMask: true
        }
      })
    }
    const deleteRecords = (row?: TRecord) => {
      if (!deleteMutation) return
      if (row && typeof row == 'object') {
        modelSelectionRef.value = [row]
      }
      const dialogProps = {
        onConfirmed: deleteMutation?.mutate
      }
      dialog.open(h(AppDialog, dialogProps, {
        default: () => h("div", [
          dialogErrorRef.value ? h(Message, { severity: 'error' }, () => h('h2', dialogErrorRef.value)) : undefined,
          h('h2', 'are you sure?')
        ])
      }))
    }


    const exportRecords = () => {
      if (!tableElementRef.value) return
      tableElementRef.value.exportCSV()
    }

    return {
      // state
      apiClient,
      debounceInMilliSeconds,
      datalistColumns,
      availableActions,
      formSections,
      datalistOptions,
      datalistQueryResult,
      filtersFormKey,
      deleteResotreMutation,
      filtersFormSchema,
      isLoadingRef,
      isShowDeletedRef,
      modelFiltersRef,
      modelSelectionRef,
      tableElementRef,
      paginationParams,
      viewRouter,

      // getters
      activeFilters,
      deleteRestoreVariants,

      // // actions
      applyFilters,
      createNewRecord,
      datalistFetchFunction,
      init,
      exportRecords,
      removeFilter,
      resetFiltersForm,
      assertValidDatalistQueryResult,
      setIsShowDeletedRef,
      deleteRestoreRecordsConfirmed,
      deleteRecordsConfirmed,
      updateRecord,
      viewRecord,
      getRowIdentifier,
      deleteRecords,
      deleteRestoreRecords,
      presistFilters,
      refetch,
    }
  })
export const useDatalistStoreWithKey = <TReq, TRecord extends Record<string, unknown>>(datalistKey: string): DatalistStore<TReq, TRecord> => useDatalistStore<TReq, TRecord>(datalistKey)()
