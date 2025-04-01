import { type Ref, type VNode } from "vue"
import type { FormKitSchemaNode } from '@formkit/core'
import type { DatalistMutations, DatalistStore } from './store/types'

import { ColumnSlots, type ColumnProps } from 'primevue/column';
import type { ApiListOptions, ApiResponseList, DatalistFetchFunction } from './utilities/_apiTypes'
import type { DatalistFilter } from './utilities/_filtersTypes'
import type { DatalistColumns } from './columns/_types'
import { AppFormSections } from "@/pkg/types/types"
import { ApiEndpoint, StringUnkownRecord } from "devkit-apiclient"
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

export type DatalistGlobalActions = {
	create?: boolean,
	delete?: boolean,
	deleteRestore?: boolean,
	export?: boolean,
}

export type DatalistRowActions = {
	update?: boolean,
	delete?: boolean,
	view?: boolean,
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
	input: FormKitSchemaNode & { name: keyof TRecord }
}
export type DatalistFlags = {
	isPresistFilters?: boolean;
	isLazy?: boolean
	isLazyFilters?: boolean;
	isFilterPersist?: boolean;
	isActionsDropdown?: boolean;
	isExportable?: boolean;
}
export interface DatalistColumn<TRecord extends Record<string, unknown>> {
	props?: ColumnProps
	filters?: DatalistFilter<TRecord>[]
	slots?: ColumnSlots
	router?: DatalistRouter<TRecord>
	editInput?: FormKitSchemaNode
	renderHtml?: (value: TRecord) => VNode
}



export type DatalistColumns<TRecord extends Record<string, unknown>> = Record<keyof TRecord, DatalistColumn<TRecord>>


export type DatalistContext<
	TApi extends Record<string, Function>,
	TReq extends StringUnkownRecord,
	TRecord extends StringUnkownRecord,
	TFiltersReq extends StringUnkownRecord | undefined = undefined,
	TApiResponse extends StringUnkownRecord | undefined = undefined,
	TFormSectionsRequest extends StringUnkownRecord | undefined = undefined
> = DatalistFlags & {
	datalistKey: string;
	records: DatalistRecords<TApi, TReq, TRecord, TFiltersReq, TApiResponse>
	options?: ApiListOptions;
	filters?: DatalistFilter<TRecord>[];
	columns?: DatalistColumns<TRecord>;
	clientFilters?: DatalistClientFilter<TRecord>[];
	serverFilters?: (FormKitSchemaNode & { name: keyof TReq })[];
	formSections?: AppFormSections<TFormSectionsRequest>;
	execludedColumns?: (keyof TRecord)[];
	debounceInMilliseconds?: number;
	rowIdentifier?: keyof TRecord;
	viewRouter?: DatalistRouter<TRecord>;
	initiallySelectedItems?: TRecord[];
};

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
export type BaseDatalistSlots<TReq extends StringUnkownRecord, TRecord extends Record<string, unknown>> = {
	default(): VNode | undefined;
	expansion(props: { data: TRecord }): VNode | undefined;
	header(store: DatalistStore<TReq, TRecord>): VNode | undefined;
};
export type SharedSlots<TReq extends StringUnkownRecord, TRecord extends Record<string, unknown>> = {
	dropdownActions(props: { data: TRecord }): VNode | undefined;
	actions(props: { data: TRecord }): VNode | undefined;
	headerActionsStartPrepend(store: DatalistStore<TReq, TRecord>): VNode | undefined;
	headerActionsStartAppend(store: DatalistStore<TReq, TRecord>): VNode | undefined;
	headerActionsEndPrepend(store: DatalistStore<TReq, TRecord>): VNode | undefined;
	headerActionsEndAppend(store: DatalistStore<TReq, TRecord>): VNode | undefined;
	prependActions(props: { data: TRecord }): VNode | undefined;
	appendActions(props: { data: TRecord }): VNode | undefined;
	filtersPanel(store: DatalistStore<TReq, TRecord>): VNode | undefined;
	filtersForm(store: DatalistStore<TReq, TRecord>): VNode | undefined;
} & {
	[K in keyof TRecord as K extends string ? `filters.${K}` : never]: (props: {
		store: DatalistStore<TReq, TRecord>;
		modelFilterFormRef: Ref<Record<string, any>>;
	}) => VNode;
};

export type CardSlots<TReq extends StringUnkownRecord, TRecord extends Record<string, unknown>> = Pick<DatalistSlots<TReq, TRecord>, 'cardEnd' | 'card' | 'cardStart'>;

export type TableSlots<TRecord extends Record<string, unknown>> = {
	columnHeader(props: { column: keyof TRecord }): VNode;
	columnFooter(props: { column: keyof TRecord }): VNode;
} & {
	[K in keyof TRecord as K extends string ? `column.${K}` : never]: (props: { data: TRecord }) => VNode;
};
export type ListSlots<TRecord extends Record<string, unknown>> = {
	listItem(props: { data: TRecord }): VNode;
};

export type DatalistSlots<TReq extends StringUnkownRecord, TRecord extends Record<string, unknown>> = {
	default(): VNode | undefined
	card?: (props: { data: TRecord }) => VNode[]
	cardStart?: (props: { data: TRecord }) => VNode[]
	cardEnd?: (props: { data: TRecord }) => VNode[]
	expansion(props: { data: TRecord }): VNode | undefined
	headerActionsStartPrepend(store: DatalistStore<TReq, TRecord>): VNode | undefined
	headerActionsStartAppend(store: DatalistStore<TReq, TRecord>): VNode | undefined
	headerActionsEndPrepend(store: DatalistStore<TReq, TRecord>): VNode | undefined
	headerActionsEndAppend(store: DatalistStore<TReq, TRecord>): VNode | undefined
	filtersPanel(store: DatalistStore<TReq, TRecord>): VNode | undefined
	filtersPresist(store: DatalistStore<TReq, TRecord>): VNode | undefined
	filtersReset(store: DatalistStore<TReq, TRecord>): VNode | undefined
	filtersForm(store: DatalistStore<TReq, TRecord>): VNode | undefined
	filtersFormAppend(store: DatalistStore<TReq, TRecord>): VNode | undefined
	filtersFormPrepend(store: DatalistStore<TReq, TRecord>): VNode | undefined
	header(store: DatalistStore<TReq, TRecord>): VNode | undefined
	dropdownActions(props: { data: TRecord }): VNode | undefined
	actions(props: { data: TRecord }): VNode | undefined
	prependActions(props: { data: TRecord }): VNode | undefined
	appendActions(props: { data: TRecord }): VNode | undefined
} & {
	[K in keyof TRecord as K extends string ? `column.${K}` : never]: (props: { data: TRecord }) => VNode;
} & {
	[K in keyof DatalistGlobalActions as K extends string ? `globalActions.${K}` : never]: (props: { store: DatalistStore<TReq, TRecord> }) => VNode;
} & {
	[K in keyof DatalistRowActions as K extends string ? `rowActions.${K}` : never]: (props: { store: DatalistStore<TReq, TRecord> }) => VNode;
} & {
	[K in keyof TRecord as K extends string ? `filters.${K}` : never]: (props: { store: DatalistStore<TReq, TRecord>, modelFilterFormRef: Ref<Record<string, any>> }) => VNode;
}

