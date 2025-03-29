
import { ref, computed, h, inject, type Ref, type ComputedRef } from 'vue'
import { AppDialog } from 'devkit-base-components'
import type { FormKitSchemaNode } from '@formkit/core'
import { defineStore } from 'pinia'
import type { DatalistAvailableActions, DatalistRouter, PaginationParams } from '../types'
import { DatalistDeleteMutationRequest, type DatalistStore, type DeleteRestoreVariant } from './types'
import { useRouter } from 'vue-router'
import { useDialog, type DataTableMethods } from 'primevue'
import { useDebounceFn } from '@vueuse/core'
import { _applyFilters, _presistFilters } from '../utilities/_filterUtils'
import { _createRecord, _updateRecord, _viewRecord } from '../utilities/_crudUtils'
import type { ApiListOptions, DatalistQueryResult, DeleteHandler } from '../utilities/_apiTypes'
import type { StringUnkownRecord, AppFormProps, AppFormSection, SubmitHandler } from '@/pkg/types/types'
import type { DatalistFiltersModel } from '../utilities/_filtersTypes'
import AppForm from '@/app/appform/AppForm.vue'
import { AssertIsDefined, ObjectKeys } from 'devkit-apiclient'
import { DatalistColumns } from '../columns/_types'
import { UseMutationReturnType } from '@tanstack/vue-query'
export const useDatalistStore = <TReq extends StringUnkownRecord, TRecord extends StringUnkownRecord>(
  datalistKey: string) => defineStore(`datalist-${datalistKey}` as string, () => {
    let datalistOptions: ApiListOptions = { title: `${datalistKey}_title`, description: `${datalistKey}_description` }
    const errorRef = ref('')
    const filtersFormKey = `${datalistKey}-filters`
    let formSections: Ref<Record<string, AppFormSection | FormKitSchemaNode[]> | undefined> = ref()
    let rowIdentifier: (keyof TRecord) | undefined = `${datalistKey}Id` as keyof TRecord
    let isServerSide = false
    let viewRouter: DatalistRouter<TRecord> | undefined
    const paginationParams = ref<PaginationParams>()
    const serverSideInputs = new Set<string>()
    let useFilterPersist: boolean | undefined
    let debounceInMilliSeconds = 1000
    const availableActions = new Set<'create' | 'update' | 'delete' | 'deleteRestore' | 'export' | 'view'>()
    let refetchFn: DatalistQueryResult<TRecord, Error>['refetch'] | undefined
    // const datalistColumns: DatalistColumns<TRecord> = {}
    const datalistColumnsRef: Ref<Partial<DatalistColumns<TRecord>>> = ref({})
    const tableElementRef: Ref<DataTableMethods | undefined> = ref()
    const modelSelectionRef: Ref<TRecord[]> = ref([])
    const isLoadingRef = ref(false)
    const isShowDeletedRef = ref(false)
    const apiClient = inject('apiClient') as Record<string, Function>
    const modelFiltersRef: Ref<DatalistFiltersModel> = ref({})
    const isFiltersFormValid: Ref<boolean> = ref(false)
    const { push } = useRouter()
    const dialog = useDialog()
    const setRefetchFn = (fn: DatalistQueryResult<TRecord, Error>['refetch']) => {
      refetchFn = fn
    }
    const deleteRestoreVariants: ComputedRef<DeleteRestoreVariant> = computed(() => {
      const hasDeletedRecords = true
      const hasSelectedData = modelSelectionRef.value.length > 0
      if (isShowDeletedRef.value) return { disabled: !hasSelectedData, hasSelectedData, hasDeletedRecords, icon: 'left', label: 'restore', empty: "empty_records_deleted", severity: 'success' } as DeleteRestoreVariant
      return { disabled: !hasSelectedData, hasDeletedRecords, icon: 'trash', label: 'delete', empty: "empty_records", severity: 'danger' } as DeleteRestoreVariant
    })
    const activeFilters: ComputedRef<StringUnkownRecord> = computed(() => {
      const activeFilters: StringUnkownRecord = {}
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

    // const datalistFetchFunction = ({ filtersValue, requestMapper, responseMapper, paginationParams, records, deletedRecords = [], options }: DatalistFetchParams<TReq, TRecord>): Promise<DatalisQueryReturnType<TRecord>> => {
    //   if (Array.isArray(records)) {
    //     return _datalistFetchWithArray({ records, deletedRecords, options })
    //   }
    //   console.log("filters is", filtersValue)
    //   return new Promise<DatalisQueryReturnType<TRecord>>((resolve, reject) => {
    //     const requestPayload = { filters: filtersValue, paginationParams: paginationParams }
    //     let request
    //     try {
    //       request = requestMapper ? requestMapper(requestPayload) : requestPayload
    //     } catch (e) {
    //       console.log("error from mapping", e)
    //       if (e instanceof Error) {
    //         errorRef.value = e.message
    //       }
    //       return reject(e)
    //     }

    //     resolveApiEndpoint<typeof apiClient, TReq, StringUnkownRecord>(records, apiClient, request as TReq).then((response) => {
    //       if (responseMapper) {
    //         const newResponse = responseMapper(response)
    //         return resolve(newResponse)
    //       }
    //       if ('records' in response && Array.isArray(response['records'])) {
    //         return resolve(response as ApiResponseList<TRecord>)
    //       }
    //       const errMessage = 'can\'t find records on the response '
    //       errorRef.value = errMessage
    //       return reject(new Error(errMessage))

    //     })
    //   })
    // }
    const refetch = () => {
      if (refetchFn) {
        refetchFn()
      }
    }

    //const init = (
    //  { queryResult, props, slots, mutaions }: DatalistStoreInit<TReq, TRecord>
    //) => {
    //  return new Promise<void>((resolve) => {
    //    datalistQueryResult = queryResult
    //    console.log("initing the storeeeeee", datalistQueryResult, queryResult, queryResult.data)
    //    if (queryResult.data) {
    //      if (queryResult.data.options) {
    //        const { createHandler, updateHandler, deleteHandler } = queryResult.data.options
    //        availableActions.create = typeof createHandler != 'undefined'
    //        availableActions.update = typeof updateHandler != 'undefined'
    //        availableActions.delete = typeof deleteHandler != 'undefined'
    //      }
    //    }
    //    availableActions.create = true
    //    console.log(datalistQueryResult, 'from the init', props.context.filters)
    //    setLazyProps(props.context)
    //    const columns = props.context.columns ? props.context.columns : props.context.displayType != 'card' ?  constructColumns(props.context.execludedColumns || []) : {}
    //    if (props.context.displayType == 'table') extractColumns(columns, slots)
    //    if (props.context.displayType == 'card') {
    //      const { cardStart, cardEnd, card } = slots as CardSlots<TReq, TRecord>
    //      extractCardColumns({ cardStart, cardEnd, card })
    //    }
    //    if (props.context.filters) {
    //      props.context.filters.forEach((filter) => {
    //        modelFiltersRef.value[filter.input.name as string] = { matchMode: filter.matchMode, value: null }
    //      })
    //    }
    //    // deleteResotreMutation = mutaions.deleteResotreMutation
    //    // deleteMutation = mutaions.deleteMutation
    //    setTimeout(() => resolve(), 1)
    //  })
    //}

    const removeFilter = (filterKey: string) => {
      if (!modelFiltersRef.value[filterKey]) return
      modelFiltersRef.value[filterKey].value = null
    }
    const presistFilters = (filtersFormValue: Record<(keyof TRecord) | string, unknown>) => {
      _presistFilters(filtersFormKey, filtersFormValue)
    }
    const applyFilters = (filtersFormValue: Partial<Record<(keyof TRecord) | string, unknown>>) => {
      const newModelValue = _applyFilters({ filtersFormKey, filtersFormValue, modelFiltersRefValue: modelFiltersRef.value, useFilterPersist })
      modelFiltersRef.value = { ...modelFiltersRef.value, ...newModelValue }
      console.log("asdasdasd", isServerSide)
      if (isServerSide) {
        refetch()
      }
    }
    const resetFiltersForm = () => {
      const filterKeys = ObjectKeys(modelFiltersRef.value)
      filterKeys.forEach((filterKey) => {
        if (modelFiltersRef.value[filterKey]) modelFiltersRef.value[filterKey].value = null
      })
    }
    const getRowIdentifier = (): (keyof TRecord) | undefined => rowIdentifier
    // function assertValidDatalistQueryResult(
    //   result: Pick<DatalistQueryResult<TRecord, Error>, 'data' | 'refetch'> | undefined
    // ): asserts result is Pick<DatalistQueryResult<TRecord, Error>, 'data' | 'refetch'> & { data: { options: ApiListOptions } } {
    //   AssertIsDefined(result, "datalistQueryResult must not be undefined");
    //   AssertIsDefined(result.data, "datalistQueryResult has no data");
    //   AssertIsDefined(result.data.options, "datalistQueryResult has no options");
    // }
    const updateRecord = (record: TRecord) => {
      AssertIsDefined(datalistOptions, "options not defined");
      AssertIsDefined(datalistOptions.updateHandler, "options has no update handler");
      const handler = datalistOptions.updateHandler
      console.log("formsections", formSections)
      if (!rowIdentifier) {
        //TODO:  handle this error properly
        console.log("this shouldn't be called")
        return
      }
      if (formSections.value) {
        console.log("open", handler, handler.endpoint)
        // const handlerFn = apiClient[handler.endpoint] as (req: unknown) => Promise<unknown>
        const submitHandler: SubmitHandler = {
          endpoint: handler.endpoint,

          callback: (resp: StringUnkownRecord): void => {
            console.log("refetching", resp)
            // refetch()
          }
        }
        if (!rowIdentifier) return
        const formProps: AppFormProps<`${string}_update`, StringUnkownRecord, StringUnkownRecord, StringUnkownRecord, typeof handler.findRequestProperty, typeof handler.findResponseProperty, unknown, unknown> = {
          context: {
            title: `${datalistKey}_update`,
            sections: formSections.value,
            invalidateCaches: [datalistKey],
            findHandler: {
              endpoint: handler.findEndpoint,
              requestPropertyName: handler.findRequestProperty,
              responsePropertyName: handler.findResponseProperty,
              requestValue: record[rowIdentifier]
            },
            formKey: `${datalistKey}_update`,
            submitHandler
          }

        }
        dialog.open(h(AppForm, formProps))
        return
      }
      _updateRecord({ record, rowIdentifier, updateHandler: handler, formSchema: formSections.value, push })
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
      AssertIsDefined(datalistOptions, "options not defined");
      AssertIsDefined(datalistOptions.createHandler, "options has no create handler")
      const handler = datalistOptions.createHandler
      if (formSections.value) {
        const submitHandler: SubmitHandler<StringUnkownRecord, StringUnkownRecord> = {
          endpoint: handler.endpoint,
          callback: () => {
            console.log("callback from datalist")
            refetch()
          }
        }
        dialog.open(h(AppForm, {
          context: {
            title: `${datalistKey}_create`,
            sections: formSections.value,
            // invalidateCaches: [datalistKey],
            formKey: `${datalistKey}_create`,
            submitHandler
          }
        }))
        return
      }
      _createRecord({ createHandler: handler, formSchema: formSections.value, push })
    }
    const setIsShowDeletedRef = (value: boolean) => {
      isLoadingRef.value = true
      useDebounceFn(() => {
        isShowDeletedRef.value = value
        isLoadingRef.value = false
      }, debounceInMilliSeconds)()
    }

    type DeleteConfirmedParams<TRecord extends Record<string, unknown>> = {
      dialogRef: { close: Function },
      handler: DeleteHandler
      rowIdentifier: keyof TRecord
      callback: () => void
      errorCallback: (error: unknown) => void
      selectedRecords: TRecord[],
      apiClient: Record<string, Function>,
    }
    const _deleteRecordsConfirmed = <TRecord extends Record<string, unknown>>({ errorCallback, callback, handler, selectedRecords, apiClient, rowIdentifier }: DeleteConfirmedParams<TRecord>) => {
      return new Promise((resolve, reject) => {
        const deleteRequest: Record<string, unknown> = {}
        const requestProperty = handler.requestProperty || "records"
        deleteRequest[requestProperty] = selectedRecords.map((row) => {
          return row[rowIdentifier]
        })
        const deleteEndpointFn = apiClient[handler.endpoint]
        console.log("resseeqq isss", deleteRequest)
        deleteEndpointFn(deleteRequest).then(() => {
          callback()
          // dialogRef.close()
          resolve(null)
        }).catch((err: unknown) => {
          errorCallback(err)
          reject(err)
        })

      })
    }
    const deleteRecordsConfirmed = ({ close, handler }: { close: Function, handler: DeleteHandler }): Promise<void> => {
      return new Promise((resolve, reject) => {
        AssertIsDefined(rowIdentifier, 'row indentifier mus be passed to take this action')
        _deleteRecordsConfirmed(
          {
            dialogRef: { close: () => null },
            handler: handler,
            rowIdentifier,
            callback: () => {
              modelSelectionRef.value = []
            },
            errorCallback: (error: unknown) => {
              if (!error) return
              if (typeof error == 'object' && 'message' in error) {
                deleteErrorRef.value = error.message as string
                return
              }
              deleteErrorRef.value = error as string
            },
            selectedRecords: modelSelectionRef.value,
            apiClient
          }
        ).then(() => {
          resolve();
          close()
        }).catch(reject)

      })
    }
    const deleteErrorRef = ref<string>('')
    const showDeleteDialog = ({ mutate }: UseMutationReturnType<void, unknown, DatalistDeleteMutationRequest, unknown>
      , handlerType: 'delete' | 'deleteRestore', row?: TRecord) => {
      console.log("daada", datalistOptions)
      AssertIsDefined(datalistOptions, "options not defined");
      const handlers: { delete: DeleteHandler | undefined, deleteRestore: DeleteHandler | undefined } = {
        delete: datalistOptions.deleteHandler,
        deleteRestore: datalistOptions.deleteRestoreHandler,
      }
      const handler = handlers[handlerType]
      AssertIsDefined(handler, `options has no ${handlerType} handler`)
      if (modelSelectionRef.value.length == 0 && !row) return
      if (row) {
        modelSelectionRef.value = [row]
      }
      dialog.open(h(AppDialog, {
        onConfirmed: ({ close }) => mutate({ close, handler }),
        errorRef: deleteErrorRef,
        modal: true
      }, {
        default: () => h("div", [
          h('h2', 'are you sure?')
        ])
      }),
        {
          props: {
            modal: true,
            dismissableMask: true,
          },
          onClose: () => {
            deleteErrorRef.value = ""
          }

        }
      )
    }
    const exportRecords = () => {
      if (!tableElementRef.value) return
      tableElementRef.value.exportCSV()
    }

    return {
      // state
      apiClient,
      debounceInMilliSeconds,
      // datalistColumns,
      availableActions,
      formSections,
      datalistOptions,
      filtersFormKey,
      isLoadingRef,
      isShowDeletedRef,
      isFiltersFormValid,
      modelFiltersRef,
      modelSelectionRef,
      tableElementRef,
      serverSideInputs,
      paginationParams,
      isServerSide,
      viewRouter,
      datalistColumnsRef,
      errorRef,

      // getters
      activeFilters,
      deleteRestoreVariants,

      // // actions
      applyFilters,
      setRefetchFn,
      createNewRecord,
      // datalistFetchFunction,
      //init,
      exportRecords,
      removeFilter,
      resetFiltersForm,
      setIsShowDeletedRef,
      deleteRecordsConfirmed,
      updateRecord,
      viewRecord,
      getRowIdentifier,
      showDeleteDialog,
      presistFilters,
      refetch,
    }
  })
export const useDatalistStoreWithKey = <TReq extends StringUnkownRecord, TRecord extends StringUnkownRecord>(datalistKey: string): DatalistStore<TReq, TRecord> => useDatalistStore<TReq, TRecord>(datalistKey)()
