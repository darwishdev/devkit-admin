import { type Ref, type VNode } from "vue"
import type { FormKitSchemaNode } from '@formkit/core'
import type { DatalistMutations, DatalistStore } from './store/types'
import type { ApiListOptions, ApiResponseList, DatalistFetchFunction } from './utilities/_apiTypes'
import type { DatalistFilter } from './utilities/_filtersTypes'
import type { DatalistColumns } from './columns/_types'
import { AppFormSection, AppFormSections } from "@/pkg/types/types"
import { StringUnkownRecord } from "devkit-apiclient"

// helper type
export type PaginationParams = {
  sortColumn?: string,
  sortFunction?: string;
  isDeleted?: boolean
  pageSize?: number
  pageNumber?: number
}


export type DatalistRequest = {
  filters?: Record<string, unknown>,
  paginationParams?: PaginationParams
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
export type DatalistRecords<TReq, TRecord extends Record<string, unknown>> = TRecord[] | DatalistFetchFunction<TReq, TRecord> | string


// components types
//
// components/DatalistHeader.vue type
export type DatalistHeaderProps = Pick<DatalistContextComposer<any, any>, "datalistKey" | "exportable"> & {
  mutations: DatalistMutations
};
export type DatalistHeaderSlots<TReq, TRecord extends Record<string, unknown>> = Partial<Pick<
  DatalistSlots<TReq, TRecord>,
  "headerActionsStartPrepend" |
  "headerActionsStartAppend" |
  "headerActionsEndPrepend" |
  "headerActionsEndAppend" |
  Extract<keyof DatalistSlots<TReq, TRecord>, `globalActions.${string}`>
>>
export type DatalistHeaderEmits = {
  (e: 'update:modelValue', filters: Record<string, unknown>): void
}
// components/DatalistFilters.vue
export type DatalistFiltersProps = {
  schema: FormKitSchemaNode[],
  datalistKey: string,
  useLazyFilters?: boolean
  useFilterPersist?: boolean,
  isServerSide?: boolean
}

export type DatalistFiltersSlots<TReq, TRecord extends Record<string, unknown>> = Partial<Pick<
  SharedSlots<TReq, TRecord>, 'filtersForm' | 'filtersPanel'>>
export type DatalistFiltersEmits = {
  (e: 'toggleShowDeleted', value: boolean): void
  (e: 'update:modelValue', value: any): void
}
// "filtersForm" |
// "filtersReset" |
// "filtersPresist" |
// "filtersFormPrepend" |
// "filtersFormAppend"
//Extract<keyof DatalistSlots<TReq, TRecord>, `filters.${string}`>
// components/ColumnActions.vue
export type ColumnActionsProps<TRecord> = Pick<DatalistContext<any, any>, "datalistKey" | "isActionsDropdown"> & { recordData: TRecord } & Pick<ApiListOptions, 'createHandler' | 'deleteHandler' | 'updateHandler' | 'deleteRestoreHandler'> & {
  mutations: DatalistMutations
}



export type ColumnActionsSlots<TRecord extends Record<string, unknown>> = Partial<Pick<
  DatalistSlots<unknown, TRecord>,
  "dropdownActions" |
  "actions" |
  "prependActions" |
  "appendActions" |
  Extract<keyof DatalistSlots<unknown, TRecord>, `rowActions.${string}`>
>>

export type DatalistBaseContext<TRecord extends Record<string, unknown>> = {
  datalistKey: string;
  title: string;
  filters?: DatalistFilter<TRecord>[]; // Required for serverside
  isPresistFilters?: boolean
  useLazyFilters?: boolean
  useFilterPersist?: boolean,
  formSections?: AppFormSections<StringUnkownRecord>;
  exportable?: boolean
  debounceInMilliseconds?: number;
  isActionsDropdown?: boolean
  rowIdentifier?: keyof TRecord;
  viewRouter?: DatalistRouter<TRecord>;
  initiallySelectedItems?: TRecord[]
  options: ApiListOptions;
};

export type DisplayType = 'card' | 'table' | 'list'
export type ServersideDatalistContext<TReq, TRecord extends Record<string, unknown>> = DatalistBaseContext<TRecord> & {
  isServerside: true;
  records: string | DatalistFetchFunction<TReq, TRecord>,
};


export type ClientsideDatalistContext<TRecord extends Record<string, unknown>> =
  DatalistBaseContext<TRecord> & {
    records: DatalistRecords<any, TRecord>
    isServerside: false;
  };
export type DatalistContextComposer<TReq, TRecord extends Record<string, unknown>> =
  | ServersideDatalistContext<TReq, TRecord>
  | ClientsideDatalistContext<TRecord>;
export type TableDatalistContext<TRecord extends Record<string, unknown>> = {
  displayType: DisplayType;
  columns?: DatalistColumns<TRecord>;
  execludedColumns?: (keyof TRecord)[];
};

export type CardDatalistContext = {
  displayType: 'card';
};
export type ListDatalistContext = {
  displayType: 'list';
};
export type DatalistDisplayContext<TRecord extends Record<string, unknown>> = TableDatalistContext<TRecord>
// Datalist.vue
export type DatalistContext<TReq, TRecord extends Record<string, unknown>> =
  DatalistContextComposer<TReq, TRecord> & DatalistDisplayContext<TRecord>;
// export type DatalistContext<TReq extends DatalistRequest, TRecord extends Record<string, unknown>> = {
//   datalistKey: string
//   title: string
//   filters?: DatalistFilter<TRecord>[]
//   records: DatalistRecords<TReq, TRecord>
//   dataKey: keyof TRecord
//   initialRecords?: TRecord[]
//   columns?: DatalistColumns<TRecord>
//   execludedColumns?: (keyof TRecord)[]
//   initiallySelectedItems?: TRecord[]
//   debounceInMilliSeconds?: number
//   options: ApiListOptions
//   displayType?: 'card' | 'table' | 'list'
//   formSections?: AppFormSections
//   exportable?: boolean
//   isServerSide?: boolean
//   isActionsDropdown?: boolean
//   isPresistFilters?: boolean
//   deletedRecords?: TRecord[]
//   viewRouter?: DatalistRouter<TRecord>
// }

export type DatalistProps<TReq, TRecord extends Record<string, unknown>> = {
  context: DatalistContext<TReq, TRecord>
}
// export type BaseDatalistSlots<TReq, TRecord extends Record<string, unknown>> = {
//   default(): VNode | undefined;
//   expansion(props: { data: TRecord }): VNode | undefined;
//   header(store: DatalistStore<TReq, TRecord, TDisplay>): VNode | undefined;
// };
// export type ActionSlots<TReq, TRecord extends Record<string, unknown>> = {
//   dropdownActions(props: { data: TRecord }): VNode | undefined;
//   actions(props: { data: TRecord }): VNode | undefined;
//   prependActions(props: { data: TRecord }): VNode | undefined;
//   appendActions(props: { data: TRecord }): VNode | undefined;
// } & {
//   [K in keyof DatalistGlobalActions as K extends string ? `globalActions.${K}` : never]: (props: { store: DatalistStore<TReq, TRecord, TDisplay> }) => VNode;
// } & {
//   [K in keyof DatalistRowActions as K extends string ? `rowActions.${K}` : never]: (props: { store: DatalistStore<TReq, TRecord, TDisplay> }) => VNode;
// }

// export type , TRecord extends Record<string, unknown>> = {
//   filtersPanel(store: DatalistStore<TReq, TRecord, TDisplay>): VNode | undefined;
//   filtersPresist(store: DatalistStore<TReq, TRecord, TDisplay>): VNode | undefined;
//   filtersReset(store: DatalistStore<TReq, TRecord, TDisplay>): VNode | undefined;
//   filtersForm(store: DatalistStore<TReq, TRecord, TDisplay>): VNode | undefined;
//   filtersFormAppend(store: DatalistStore<TReq, TRecord, TDisplay>): VNode | undefined;
//   filtersFormPrepend(store: DatalistStore<TReq, TRecord, TDisplay>): VNode | undefined;
// } & { [K in keyof TRecord as K extends string ? `filters.${K}` : never]: (props: {
//   store: DatalistStore<TReq, TRecord, TDisplay>;
//   modelFilterFormRef: Ref<Record<string, any>>;
// }) => VNode;
// }
// export type ColumnSlots<TRecord extends Record<string, unknown>> = {
//   [K in keyof TRecord as K extends string ? `column.${K}` : never]: (props: { data: TRecord }) => VNode;
// };
// export type CardSlots<TRecord extends Record<string, unknown>> = {
//   cardStart(props: { data: TRecord }): VNode;
//   cardEnd(props: { data: TRecord }): VNode;
// };

// export type TableSlots<TRecord extends Record<string, unknown>> = {
//   columnHeader(props: { column: keyof TRecord }): VNode | undefined;
//   columnFooter(props: { column: keyof TRecord }): VNode | undefined;
// }

// export type ListSlots<TRecord extends Record<string, unknown>> = {
//   listItem(props: { data: TRecord }): VNode | undefined;
// };
export type BaseDatalistSlots<TReq, TRecord extends Record<string, unknown>> = {
  default(): VNode | undefined;
  expansion(props: { data: TRecord }): VNode | undefined;
  header(store: DatalistStore<TReq, TRecord>): VNode | undefined;
};
export type SharedSlots<TReq, TRecord extends Record<string, unknown>> = {
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

export type CardSlots<TReq, TRecord extends Record<string, unknown>> = Pick<DatalistSlots<TReq, TRecord>, 'cardEnd' | 'card' | 'cardStart'>;
export type TableSlots<TRecord extends Record<string, unknown>> = {
  columnHeader(props: { column: keyof TRecord }): VNode;
  columnFooter(props: { column: keyof TRecord }): VNode;
} & {
  [K in keyof TRecord as K extends string ? `column.${K}` : never]: (props: { data: TRecord }) => VNode;
};
export type ListSlots<TRecord extends Record<string, unknown>> = {
  listItem(props: { data: TRecord }): VNode;
};

export type DatalistSlots<TReq, TRecord extends Record<string, unknown>> = {
  // BaseDatalistSlots<TReq, TRecord> & SharedSlots<TReq, TRecord> & CardSlots<TRecord>

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
export type DatalistEmits<TRecord> = {
  (e: 'update:selection', value: TRecord[]): void
}

// external exports
