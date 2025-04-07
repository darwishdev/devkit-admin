import { type Ref, type VNode } from "vue"
import type { FormKitSchemaNode } from '@formkit/core'

import { ColumnSlots, type ColumnProps } from 'primevue/column';
import type { ApiListOptions, ApiResponseList, DatalistFetchFunction } from './utilities/_apiTypes'
import { AppFormSections } from "@/pkg/types/types"
import { ApiEndpoint, StringUnkownRecord } from "devkit-apiclient"
import { DatalistFilter, DatalistFilterInput } from "../datalist/utilities/_filtersTypes";
import { useDatalistStore } from "./store/DatalistStore";
import { AppBtnProps } from "devkit-base-components";
export type PaginationParams = {
	sortColumn?: string,
	sortFunction?: string;
	isDeleted?: boolean
	pageSize?: number
	pageNumber?: number
}


export type DisplayType = 'card' | 'table' | 'list'

export type FilterMatchModeValues = 'startsWith' | 'contains' | 'notContains' | 'endsWith' | 'equals' | 'notEquals' | 'in' | 'lt' | 'lte' | 'gt' | 'gte' | 'between' | 'dateIs' | 'dateIsNot' | 'dateBefore' | 'dateAfter'
export type DatalistRequest = {
	filters?: Record<string, unknown>,
	paginationParams?: PaginationParams
}
export type DatalistMappers<TReq extends StringUnkownRecord, TRecord extends StringUnkownRecord> = {
	requestMapper?: (req: DatalistRequest) => TReq,
	responseMapper?: (response: StringUnkownRecord) => ApiResponseList<TRecord>,
}
export type DatalistRouter<TRecord extends Record<string, unknown>> = {
	name: string,
	paramName: string,
	paramColumnName: keyof TRecord
}

export type ActionButtonProps<TAvailableKeys = DatalistAvailableActions> = Omit<AppBtnProps, 'action'> & { actionFn: Function, actionKey: keyof TAvailableKeys }
export type DatalistCommonActions = {
	delete?: ActionButtonProps,
	deleteRestore?: ActionButtonProps,
}
export type DatalistGlobalActions = DatalistCommonActions & {
	create?: ActionButtonProps,
	export?: ActionButtonProps,
}
export type DatalistRowActions = DatalistCommonActions & {
	update?: ActionButtonProps,
	view?: ActionButtonProps,
}

export type DatalistAvailableActions = DatalistGlobalActions & DatalistRowActions
export type PaginatedQueryRequest = {
	filters: Record<string, unknown>;
	paginationParams: PaginationParams;
}
export type DatalistRecords<TApi extends Record<string, Function>, TReq extends StringUnkownRecord, TRecord extends StringUnkownRecord, TFiltersReq extends StringUnkownRecord | undefined = undefined, TApiResponse extends StringUnkownRecord | undefined = undefined> = TRecord[] | ApiEndpoint<
	TApi,
	TFiltersReq extends undefined ? TReq : TFiltersReq,
	TApiResponse extends undefined ? ApiResponseList<TReq, TRecord> : TApiResponse
>;


export type DatalistClientFilter<TRecord> = {
	matchMode: FilterMatchModeValues,
	input: FormKitSchemaNode & { name: keyof TRecord, value?: unknown }
}
export type DatalistFlags = {
	isPresistFilters?: boolean;
	hideShowDeleted?: boolean
	isLazy?: boolean
	hideActions?: boolean
	isLazyFilters?: boolean;
	isFilterPersist?: boolean;
	isActionsDropdown?: boolean;
	isExportable?: boolean;
}
export type DatalistColumnBase<TRecord extends Record<string, unknown>, TFiltersReq extends StringUnkownRecord | undefined = undefined> = {
	props?: ColumnProps
	slots?: ColumnSlots
	isGlobalFilter?: boolean
	router?: DatalistRouter<TRecord>
	editInput?: FormKitSchemaNode
	renderHtml?: (value: TRecord) => VNode
}

export type DatalistColumnClientSide<TRecord extends Record<string, unknown>, TFiltersReq extends StringUnkownRecord | undefined = undefined> = DatalistColumnBase<TRecord, TFiltersReq> & {
	filters?: DatalistFilter<TFiltersReq>[]
}
export type DatalistColumnServerSide<TRecord extends Record<string, unknown>, TFiltersReq extends StringUnkownRecord | undefined = undefined> = DatalistColumnBase<TRecord, TFiltersReq> & {
	filters?: DatalistFilterInput<TFiltersReq>[]
}


export type DatalistColumnsClientSide<TRecord extends StringUnkownRecord, TFiltersReq extends StringUnkownRecord | undefined = undefined> = Partial<Record<keyof TRecord, DatalistColumnClientSide<TRecord, TFiltersReq>>>
export type DatalistColumnsServerSide<TRecord extends StringUnkownRecord, TFiltersReq extends StringUnkownRecord | undefined = undefined> = Partial<Record<keyof TRecord, DatalistColumnServerSide<TRecord, TFiltersReq>>>
export type DatalistColumnsBase<TRecord extends StringUnkownRecord, TFiltersReq extends StringUnkownRecord | undefined = undefined> = Partial<Record<keyof TRecord, DatalistColumnBase<TRecord, TFiltersReq>>>



export type DatalistContext<
	TApi extends Record<string, Function>,
	TReq extends StringUnkownRecord,
	TRecord extends StringUnkownRecord,
	TFiltersReq extends StringUnkownRecord | undefined = undefined,
	TApiResponse extends StringUnkownRecord | undefined = undefined,
	TFormSectionsRequest extends StringUnkownRecord | undefined = undefined,
> = DatalistFlags & DatalistMappers<TReq, TRecord> & {
	datalistKey: string;
	title?: string,
	records: DatalistRecords<TApi, TReq, TRecord, TFiltersReq, TApiResponse>
	options?: ApiListOptions;
	formSections?: AppFormSections<TFormSectionsRequest extends undefined ? StringUnkownRecord : TFormSectionsRequest>;
	execludedColumns?: (keyof TRecord)[];
	displayType?: DisplayType
	debounceInMilliseconds?: number;
	rowIdentifier?: keyof TRecord;
	viewRouter?: DatalistRouter<TRecord>;
	initiallySelectedItems?: TRecord[];
} & ({
	isServerSide?: true
	columns?: DatalistColumnsServerSide<TRecord, TFiltersReq>;
	filters?: DatalistFilterInput<TFiltersReq>[];
} | {
	isServerSide?: false
	columns?: DatalistColumnsClientSide<TRecord, TFiltersReq>;
	filters?: DatalistFilter<TFiltersReq>[];
});

export type DatalistProps<
	TApi extends Record<string, Function>,
	TReq extends StringUnkownRecord,
	TRecord extends StringUnkownRecord,
	TFiltersReq extends StringUnkownRecord | undefined = undefined,
	TApiResponse extends StringUnkownRecord | undefined = undefined,
	TFormSectionsRequest extends StringUnkownRecord | undefined = undefined
> = {
	context: DatalistContext<TApi, TReq, TRecord, TFiltersReq, TApiResponse, TFormSectionsRequest>
}
//slots 
export type DatalistStore<
	TApi extends Record<string, Function>,
	TReq extends StringUnkownRecord,
	TRecord extends StringUnkownRecord,
	TFiltersReq extends StringUnkownRecord | undefined = undefined,
	TApiResponse extends StringUnkownRecord | undefined = undefined,
	TFormSectionsRequest extends StringUnkownRecord | undefined = undefined
> = ReturnType<ReturnType<typeof useDatalistStore<TApi, TReq, TRecord, TFiltersReq, TApiResponse, TFormSectionsRequest>>>
export type DatalistSlots<
	TApi extends Record<string, Function>,
	TReq extends StringUnkownRecord,
	TRecord extends StringUnkownRecord,
	TFiltersReq extends StringUnkownRecord | undefined = undefined,
	TApiResponse extends StringUnkownRecord | undefined = undefined,
	TFormSectionsRequest extends StringUnkownRecord | undefined = undefined

> = {
	default(): VNode | undefined
	card?: (props: { data: TRecord }) => VNode[]
	cardStart?: (props: { data: TRecord }) => VNode[]
	cardEnd?: (props: { data: TRecord }) => VNode[]
	expansion(props: { data: TRecord }): VNode | undefined

	globalActions(props:{store: DatalistStore<TApi, TReq, TRecord, TFiltersReq, TApiResponse, TFormSectionsRequest>}): VNode | undefined
	globalActionsStartPrepend(props:{store: DatalistStore<TApi, TReq, TRecord, TFiltersReq, TApiResponse, TFormSectionsRequest>}): VNode | undefined
	empty(): VNode | undefined
	globalActionsStartAppend(props:{store: DatalistStore<TApi, TReq, TRecord, TFiltersReq, TApiResponse, TFormSectionsRequest>}): VNode | undefined
	globalActionsEndPrepend(props:{store: DatalistStore<TApi, TReq, TRecord, TFiltersReq, TApiResponse, TFormSectionsRequest>}): VNode | undefined
	globalActionsEndAppend(props:{store: DatalistStore<TApi, TReq, TRecord, TFiltersReq, TApiResponse, TFormSectionsRequest>}): VNode | undefined
	loading(props:{store: DatalistStore<TApi, TReq, TRecord, TFiltersReq, TApiResponse, TFormSectionsRequest>}): VNode | undefined
	paginatorcontainer(props:{store: DatalistStore<TApi, TReq, TRecord, TFiltersReq, TApiResponse, TFormSectionsRequest>}): VNode | undefined
	paginatorstart(props:{store: DatalistStore<TApi, TReq, TRecord, TFiltersReq, TApiResponse, TFormSectionsRequest>}): VNode | undefined
	paginatorend(props:{store: DatalistStore<TApi, TReq, TRecord, TFiltersReq, TApiResponse, TFormSectionsRequest>}): VNode | undefined
	empty(props:{store: DatalistStore<TApi, TReq, TRecord, TFiltersReq, TApiResponse, TFormSectionsRequest>}): VNode | undefined
	filtersPanel(props:{store: DatalistStore<TApi, TReq, TRecord, TFiltersReq, TApiResponse, TFormSectionsRequest>}): VNode | undefined
	filtersPresist(props:{store: DatalistStore<TApi, TReq, TRecord, TFiltersReq, TApiResponse, TFormSectionsRequest>}): VNode | undefined
	filtersReset(props:{store: DatalistStore<TApi, TReq, TRecord, TFiltersReq, TApiResponse, TFormSectionsRequest>}): VNode | undefined
	filtersForm(props:{store: DatalistStore<TApi, TReq, TRecord, TFiltersReq, TApiResponse, TFormSectionsRequest>}): VNode | undefined
	filtersFormAppend(props:{store: DatalistStore<TApi, TReq, TRecord, TFiltersReq, TApiResponse, TFormSectionsRequest>}): VNode | undefined
	filtersFormPrepend(props:{store: DatalistStore<TApi, TReq, TRecord, TFiltersReq, TApiResponse, TFormSectionsRequest>}): VNode | undefined
	header(props:{store: DatalistStore<TApi, TReq, TRecord, TFiltersReq, TApiResponse, TFormSectionsRequest>}): VNode | undefined
	dropdownActions(props: { data: TRecord }): VNode | undefined
	actions(props: { data: TRecord }): VNode | undefined
	actionsPrepend(props: { data: TRecord }): VNode | undefined
	actionsAppend(props: { data: TRecord }): VNode | undefined
} & {
		[K in keyof TRecord as K extends string ? `column.${K}` : never]: (props: { data: TRecord }) => VNode;
	} & {
		[K in keyof DatalistGlobalActions as K extends string ? `globalActions.${K}` : never]: (props: { props:{store: DatalistStore<TApi, TReq, TRecord, TFiltersReq, TApiResponse, TFormSectionsRequest>} }) => VNode;
	} & {
		[K in keyof DatalistRowActions as K extends string ? `rowActions.${K}` : never]: (props: { props:{store: DatalistStore<TApi, TReq, TRecord, TFiltersReq, TApiResponse, TFormSectionsRequest>} }) => VNode;
	} & {
		[K in keyof TRecord as K extends string ? `filters.${K}` : never]: (props: { props:{store: DatalistStore<TApi, TReq, TRecord, TFiltersReq, TApiResponse, TFormSectionsRequest>}, modelFilterFormRef: Ref<Record<string, any>> }) => VNode;
	}

