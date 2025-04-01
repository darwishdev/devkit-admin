import { ref, computed, h, inject, type Ref, type ComputedRef } from 'vue'
import { defineStore } from 'pinia'
import { DatalistState, DatalistStore } from './types'
import { TestAPI } from 'vitest'
import { DatalistProps } from '../types'
import { FormKitSchemaNode } from '@formkit/core'
import { ObjectKeys, StringUnkownRecord } from 'devkit-apiclient'
import { DatalistFilter, DatalistFiltersModel } from '@/app/datalist/utilities/_filtersTypes'
import { RouteQueryFind } from '@/pkg/utils/QueryUtils'

export const useDatalistStore = <
	TApi extends Record<string, Function>,
	TReq extends Record<string, unknown>,
	TRecord extends Record<string, unknown>,
	TFiltersReq extends Record<string, unknown> | undefined = undefined,
	TApiResponse extends Record<string, unknown> | undefined = undefined,
	TFormSectionsRequest extends Record<string, unknown> | undefined = undefined>
	({ context }: DatalistProps<TApi, TReq, TRecord, TFiltersReq, TApiResponse, TFormSectionsRequest>) => defineStore(`datalist-${context.datalistKey}` as string, () => {
		const filtersFormSchema: FormKitSchemaNode[] = []
		const modelFiltersRef: Ref<DatalistFiltersModel> = ref({})
		const filtersFormKey = "filters"
		const filtersFormInitialValues = () => {
			const formValues =
				localStorage.getItem(filtersFormKey) ||
				RouteQueryFind(filtersFormKey);
			let formValuesObject: StringUnkownRecord = {}
			if (formValues != null) {
				formValuesObject = JSON.parse(formValues)
			}
			return formValuesObject
		}
		const generateFilters = () => {
			const initialValues = filtersFormInitialValues()
			console.log(context.clientFilters, context.serverFilters, context.columns)
			const { clientFilters, serverFilters, columns } = context
			let clientFiltersLength = 0
			if (clientFilters) {
				clientFiltersLength = clientFilters.length
				clientFilters.forEach((clientFilter, index) => {
					const inputName = clientFilter.input.name as string
					modelFiltersRef.value[inputName] = { matchMode: clientFilter.matchMode, value: initialValues[inputName] }
					filtersFormSchema[index] = clientFilter.input
				})
			}
			if (serverFilters) {
				serverFilters.forEach((serverFilter, index) => {
					filtersFormSchema[index + clientFiltersLength] = serverFilter
					console.log("server filter is", serverFilter)
				})
			}
			if (columns) {
				ObjectKeys(columns).forEach((column) => {
					console.log("columns is", columns[column].filters)
					if (columns[column].filters)
						columns[column].filters.forEach((filter: DatalistFilter<TRecord>) => {
							const inputName = filter.input.name as string
							modelFiltersRef.value[inputName] = { matchMode: filter.matchMode, value: initialValues[inputName] }
							filtersFormSchema.push(filter.input)
						})
				})
			}

		}
		const init = async () => {
			generateFilters()
		}
		return {
			//state
			filtersFormSchema,
			// actions
			init,
		}
	})
export const useDatalistStoreWithKey = <
	TApi extends Record<string, Function>,
	TReq extends Record<string, unknown>,
	TRecord extends Record<string, unknown>,
	TFiltersReq extends Record<string, unknown> | undefined = undefined,
	TApiResponse extends Record<string, unknown> | undefined = undefined,
	TFormSectionsRequest extends Record<string, unknown> | undefined = undefined>(props: DatalistProps<TApi, TReq, TRecord, TFiltersReq, TApiResponse, TFormSectionsRequest>) => useDatalistStore<TApi, TReq, TRecord, TFiltersReq, TApiResponse, TFormSectionsRequest>(props)()
