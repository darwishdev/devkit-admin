import { ref, computed, h, inject, type Ref, watch } from 'vue'
import { defineStore, getActivePinia } from 'pinia'
import { DeleteRestoreVariant } from './types'
import { ActionButtonProps, DatalistAvailableActions, DatalistColumnsBase, DatalistGlobalActions, DatalistProps, DatalistRowActions, FilterMatchModeValues, PaginationParams } from '../types'
import { FormKitSchemaNode } from '@formkit/core'
import { ObjectKeys, resolveApiEndpoint, StringUnkownRecord } from 'devkit-apiclient'
import { DatalistFilter, DatalistFilterInput, DatalistFiltersModel } from '@/app/datalist/utilities/_filtersTypes'
import { ApiListOptions, ApiResponseList } from '@/app/datalist/utilities/_apiTypes'
import { useAppFormStoreWithProps } from '@/app/appform/store/AppFormStore'
import { _constructColumns } from '../utilites/_columnUtils'
import { isServer, keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { objectEntries, useDebounceFn } from '@vueuse/core'
import { AppBtn, AppBtnProps, AppDialog } from 'devkit-base-components'
import { useRouter } from 'vue-router'
import { useDialog } from 'primevue'
import AppForm from '@/app/appform/AppForm.vue'
import { AppFormProps, FindHandler, SubmitHandler } from '@/pkg/types/types'

export const useDatalistStore = <
	TApi extends Record<string, Function>,
	TReq extends StringUnkownRecord,
	TRecord extends StringUnkownRecord,
	TFiltersReq extends StringUnkownRecord | undefined = undefined,
	TApiResponse extends StringUnkownRecord | undefined = undefined,
	TFormSectionsRequest extends StringUnkownRecord | undefined = undefined>
	({ context }: DatalistProps<TApi, TReq, TRecord, TFiltersReq, TApiResponse, TFormSectionsRequest>) => defineStore(`datalist-${context.datalistKey}` as string, () => {
		const filtersFormSchema: FormKitSchemaNode[] = []
		const filtersMatchModesMap: Map<string, FilterMatchModeValues> = new Map()
		const isShowDeletedRef = ref(false)
		const modelSelectionRef = ref<TRecord[]>(context.initiallySelectedItems || [])
		let initialCallbackFinished = false
		const availableActions = ref<DatalistAvailableActions>({})
		const apiClient = inject<TApi>('apiClient')
		const debounceInMilliseconds = context.debounceInMilliseconds || 1000
		const paginationParamsRef = ref<PaginationParams>()
		const dialog = useDialog()
		const globalFilters: string[] = []

		const queryClient = useQueryClient();
		const datalistOptions: ApiListOptions = { title: `datalist-${context.datalistKey}`, ...context.options }
		const datatableColumnsRef: Ref<DatalistColumnsBase<TRecord, TFiltersReq>
		> = ref(context.columns || {})
		const errorRef = ref('')
		const filtersFormKey = `${context.datalistKey}-filter-form`
		const { datalistKey, rowIdentifier, isServerSide } = context
		const filtersFormProps = {
			context: {
				title: filtersFormKey,
				syncWithUrl: true,
				usePresist: context.isPresistFilters,
				useClear: true,
				invalidateCachesOnChage: isServerSide ? [datalistKey] : undefined,
				invalidateCaches: isServerSide ? [datalistKey] : undefined,
				useReset: true,
				isLazy: context.isLazyFilters,
				sections: {},
				formKey: filtersFormKey,
				submitHandler: {
					hideActions: !context.isLazyFilters,
					endpoint: async (req: StringUnkownRecord) => {
						return req
					}
				},
				options: {
					isBulkCreateHidden: true,
					isHeaderSubmitHidden: true,
					isSuccessNotificationHidden: true,
					isFormTransparent: true,
				}

			}
		}
		const rowActions = computed(() => {
			const availableActionsProps: ActionButtonProps<DatalistRowActions>[] = []
			for (const [actionKey, actionProps] of objectEntries(availableActions.value)) {
				if (actionProps && ['view', 'update'].includes(actionKey)) availableActionsProps.push({ ...actionProps, actionKey: actionKey as 'view' | 'update' })
			}
			return availableActionsProps
		})
		const globalActions = computed(() => {
			const availableActionsProps: ActionButtonProps<DatalistGlobalActions>[] = []
			for (const [actionKey, actionProps] of objectEntries(availableActions.value)) {
				if (actionProps && ['create', 'export'].includes(actionKey)) availableActionsProps.push({ ...actionProps, actionKey: actionKey as 'create' | 'export' })
			}
			return availableActionsProps
		})

		const filtersFormStore = useAppFormStoreWithProps(filtersFormProps)
		const debouncedRefetch = useDebounceFn(() => {
			datalistQueryResult.refetch()
		}, debounceInMilliseconds)



		const generateFilters = async () => {
			const { filters, columns } = context
			let allFiltersCombined: (DatalistFilterInput<TFiltersReq> | DatalistFilter<TFiltersReq>)[] = [...filters || []]
			if (columns) {
				for (const [columnKey, columnValue] of objectEntries(columns)) {
					if (!columnValue) continue
					if (columnValue.isGlobalFilter) {
						globalFilters.push(columnKey as string)
					}
					datatableColumnsRef.value[columnKey] = columnValue
					const columnFilters = columnValue.filters
					if (columnFilters) {
						allFiltersCombined = [...allFiltersCombined, ...columnFilters]
					}
				}
			}
			filtersFormSchema.push({ $formkit: 'hidden', name: 'global' })
			allFiltersCombined.forEach((filter: DatalistFilterInput<TFiltersReq> | DatalistFilter<TFiltersReq>) => {
				const inputField = 'input' in filter ? filter.input : filter
				console.log('filters is', filter)
				if ('isGlobal' in filter) {
					if (filter.isGlobal) {
						globalFilters.push(inputField.name)
					}
				}
				if ('matchMode' in filter) filtersMatchModesMap.set(inputField.name, filter.matchMode)
				filtersFormSchema.push(inputField)
			})
		}
		watch(filtersFormStore.formValueRef, async (newValue) => {
			console.log('formvaluechanged', newValue)
			if (context.isLazyFilters || !isFiltersFormValid.value || ObjectKeys(newValue).length == 0) return
			if (context.isServerSide) {
				console.log('context', context.isServerSide)
				queryClient.invalidateQueries({ queryKey: [datalistKey] })
			}
		})
		const filterFormValue = computed(() => {
			const datalistFiltersModel: DatalistFiltersModel = {}
			if (context.isServerSide) return datalistFiltersModel
			for (const [filterName, filterValue] of Object.entries(filtersFormStore.formValueRef)) {
				datalistFiltersModel[filterName] = { value: filterValue, matchMode: filtersMatchModesMap.get(filterName) }
			}

			return datalistFiltersModel
		})
		function isApiResponseList<TRecord extends StringUnkownRecord>(response: any): response is ApiResponseList<TRecord> {
			return (
				response &&
				Array.isArray(response.records)
			);
		}
		const datalistQueryFn = async (): Promise<ApiResponseList<TRecord>> => {
			console.log("query is called", isFiltersFormValid.value)
			const { records, responseMapper, isServerSide, requestMapper } = context
			if (Array.isArray(records)) {
				return { records };
			}
			const requestPayload = { filters: filtersFormStore.formValueRef, paginationParams: paginationParamsRef.value }
			let request: TFiltersReq extends undefined ? TReq : TFiltersReq
			try {
				const requestBody = requestMapper ? requestMapper(requestPayload) : isServerSide ? requestPayload : filterFormValue.value;
				request = requestBody as TFiltersReq extends undefined ? TReq : TFiltersReq

				const apiResponse = await resolveApiEndpoint<TApi, typeof request, TApiResponse extends undefined ? ApiResponseList<TRecord> : TApiResponse>(
					records,
					apiClient,
					request,
				)
				console.log("api response is", apiResponse)
				let newResponse: ApiResponseList<TRecord>
				if (responseMapper) {
					newResponse = responseMapper(apiResponse)
					return newResponse
				}
				if (!isApiResponseList<TRecord>(apiResponse)) {
					throw new Error('invalid response type. pass a response mapper or return object with key records as response')
				}
				return apiResponse
			} catch (e) {
				if (e instanceof Error) {
					errorRef.value = e.message;
				}
				throw e
			}
			// resolveApiEndpoint(records, apiClient, request)
		}
		const deleteRestoreVariants = computed(() => {
			const initialVariant: DeleteRestoreVariant = {
				hasSelectedData: modelSelectionRef.value.length > 0,
				hasDeletedRecords: false,
				icon: isShowDeletedRef.value ? 'back' : 'trash',
				label: isShowDeletedRef.value ? 'restore' : 'delete',
				empty: isShowDeletedRef.value ? 'empty_records_deleted' : 'empty_records',
				severity: isShowDeletedRef.value ? 'success' : 'danger'
			}
			if (!datalistQueryResult.data.value) return initialVariant
			if (datalistQueryResult.data.value.deletedRecords) {
				initialVariant.hasDeletedRecords = datalistQueryResult.data.value.deletedRecords.length > 0
			}
			return initialVariant
		})
		const { push } = useRouter()
		const deleteRestoreOpenDialog = (params?: { record?: any, isHardDelete?: Boolean }) => {
			dialog.open(h(AppDialog, {
				onConfirmed: ({ close }) => {
					deleteMutation.mutateAsync(params || {}).finally(() => {
						close()
						modelSelectionRef.value = []
					})
				}
			}, {
				default: () => h("div", [
					h('h2', 'are you sure?')
				])
			}))
		}
		const createUpdateRecord = (record?: TRecord) => {
			const options: ApiListOptions | undefined = datalistQueryResult.data.value?.options || context.options
			if (!options || !rowIdentifier) return
			const variant = record ? 'update' : 'create'
			const handler = record ? options.updateHandler : options.createHandler
			if (!handler) return
			const { formSections, datalistKey } = context
			if (!formSections) {
				push({ name: handler.routeName })
				return
			}
			type FormReq = TFormSectionsRequest extends undefined ? StringUnkownRecord : TFormSectionsRequest
			let findHandler: FindHandler<string, string, FormReq, unknown> | undefined
			if (record && options.updateHandler) {
				const updateHandler = options.updateHandler
				findHandler = {
					endpoint: updateHandler.findEndpoint,
					requestPropertyName: updateHandler.findRequestProperty,
					responsePropertyName: updateHandler.findResponseProperty,
					requestValue: record[rowIdentifier]
				}
			}
			dialog.open(h(AppForm<string, FormReq, FormReq, StringUnkownRecord, string, string>, {
				context: {
					title: `${datalistKey}_${variant}`,
					sections: formSections,
					invalidateCaches: [datalistKey],
					formKey: `${datalistKey}_${variant}`,
					findHandler,
					resetOnSuccess: true,
					submitHandler: {
						endpoint: handler.endpoint,
					}
				}
			}))

		}
		const viewRecord = (record: any) => {
			const { viewRouter, rowIdentifier } = context
			if (!viewRouter || !rowIdentifier || typeof record != 'object') return
			if (!(viewRouter.paramColumnName in record)) return
			try {
				const params: Record<string, string> = {}
				params[viewRouter.paramName] = record[viewRouter.paramColumnName]
				push({ name: viewRouter.name, params })
			} catch (e) {
				console.error('error routing to view route')
			}
			console.log('view record', record)
		}
		const deleteRestoreMutationFn = async ({ record, isHardDelete }: { record?: any, isHardDelete?: Boolean }) => {
			console.log('recordis', record)
			const options: ApiListOptions | undefined = datalistQueryResult.data.value?.options || context.options
			const { rowIdentifier } = context
			if (!options || !rowIdentifier) return
			const handler = isHardDelete ? options.deleteHandler : options.deleteRestoreHandler
			if (!handler) return
			const deleteRestoreRequest: StringUnkownRecord = {}
			deleteRestoreRequest[handler.requestProperty] = record ? [record[rowIdentifier]] : modelSelectionRef.value.map((row) => row[rowIdentifier as string])

			console.log('recordis', deleteRestoreRequest)
			try {
				await resolveApiEndpoint(handler.endpoint, apiClient, deleteRestoreRequest)
			} catch (e) {
				console.error('delete restore failed', e)
			}
		}
		const deleteMutation = useMutation({
			mutationFn: deleteRestoreMutationFn,
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: [context.datalistKey] });
			},
		});

		const initAvailableActions = async (options: ApiListOptions) => {
			console.log("initialaizee", datalistQueryResult.data.value, options)
			const cuurentAvailableOptions: DatalistAvailableActions = {}
			if (context.viewRouter) {
				cuurentAvailableOptions.view = { label: 'view', actionFn: (record: any) => viewRecord(record) }
			}
			if (options.deleteHandler) {
				cuurentAvailableOptions.delete = { label: 'delete', actionFn: (record: any) => viewRecord(record) }
			}
			if (options.deleteRestoreHandler) {
				cuurentAvailableOptions.deleteRestore = { label: 'delete', actionFn: (record: any) => viewRecord(record) }
			}

			if (options.updateHandler) {
				cuurentAvailableOptions.update = { label: 'update', actionFn: (record: any) => createUpdateRecord(record) }
			}
			if (options.createHandler) {
				cuurentAvailableOptions.create = { label: 'create', actionFn: createUpdateRecord }
			}
			if (context.isExportable) {
				cuurentAvailableOptions.export = { label: 'export', actionFn: (record: any) => viewRecord(record) }
			}

			availableActions.value = cuurentAvailableOptions
		}

		const currenData = computed(() => {
			if (!datalistQueryResult.data.value) return [];
			const { records, deletedRecords = [] } = datalistQueryResult.data.value;
			if (isShowDeletedRef.value) return context.isServerSide ? records : deletedRecords;
			return records;

		})
		const isFiltersFormValid = computed(() => {
			return filtersFormStore?.formElementRef?.node?.context.state.valid || false
		})

		const datalistQueryResult = useQuery<ApiResponseList<TRecord>, Error>({
			queryKey: [context.datalistKey],
			queryFn: () => datalistQueryFn().then(async (response) => {
				if (initialCallbackFinished) return response
				const { records } = response
				if (
					records.length > 0 &&
					ObjectKeys(datatableColumnsRef.value).length == 0
				) {
					const datalistColumns = _constructColumns(
						records[0],
						context.execludedColumns,
						{},
					);
					datatableColumnsRef.value = datalistColumns;
				}

				if (response.options) await initAvailableActions(response.options)
				initialCallbackFinished = true
				return response
			}),
			enabled: isFiltersFormValid,
			placeholderData: keepPreviousData,
		});
		const init = async () => {
			await Promise.all([
				generateFilters(),
				initAvailableActions(context.options)
			])
		}
		return {
			//state
			filtersFormSchema,
			datatableColumnsRef,
			filterFormValue,
			currenData,
			rowActions,
			globalActions,
			globalFilters,
			datalistQueryResult,
			filtersFormProps,
			deleteRestoreOpenDialog,
			availableActions,
			modelSelectionRef,
			isFiltersFormValid,
			viewRecord,
			filtersFormStore,
			createUpdateRecord,
			isShowDeletedRef,
			deleteRestoreVariants,
			filtersFormKey,
			// actions
			init,
		}
	})

export const useDatalistStoreWithProps = <
	TApi extends Record<string, Function>,
	TReq extends StringUnkownRecord,
	TRecord extends StringUnkownRecord,
	TFiltersReq extends StringUnkownRecord | undefined = undefined,
	TApiResponse extends StringUnkownRecord | undefined = undefined,
	TFormSectionsRequest extends StringUnkownRecord | undefined = undefined>(props: DatalistProps<TApi, TReq, TRecord, TFiltersReq, TApiResponse, TFormSectionsRequest>) => useDatalistStore<TApi, TReq, TRecord, TFiltersReq, TApiResponse, TFormSectionsRequest>(props)()


export const useDatalistStoreWithKey = (datalistKey: string) => {
	const pinia = getActivePinia()
	if (!pinia) throw new Error('Pinia not installed')
	const isStoreDefined = `datalist-${datalistKey}` in pinia.state.value
	if (!isStoreDefined) throw new Error('store is not defined')
	return useDatalistStoreWithProps({ context: { datalistKey, records: [] } })
}
