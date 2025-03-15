<!-- eslint-disable vue/multi-word-component-names -->
<script
  setup
  lang="ts"
  generic="TReq extends StringUnkownRecord, TRecord extends StringUnkownRecord"
>
import { computed, h, inject, ref } from "vue";
import type {
  DatalistEmits,
  DatalistProps,
  DatalistSlots,
  PaginationParams,
} from "./types";
import DataTable, {
  type DataTableFilterEvent,
  type DataTableFilterMetaData,
  type DataTablePageEvent,
  type DataTableSortEvent,
} from "primevue/datatable";
import { useDatalistStoreWithKey } from "./store/DatalisStore";
import { Column, ColumnProps } from "primevue";
import ColumnActions from "./components/ColumnActions.vue";
import DatalistHeader from "./components/DatalistHeader.vue";
import DatalistFilters from "./components/DatalistFilters.vue";
import {
  useMutation,
  useQuery,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/vue-query";
import type {
  ApiResponseList,
  DatalisQueryReturnType,
} from "./utilities/_apiTypes";
import { DatalistDeleteMutation, DatalistMutations } from "./store/types";
import {
  ObjectKeys,
  resolveApiEndpoint,
  StringUnkownRecord,
} from "devkit-apiclient";
import { DatalistColumns } from "./columns/_types";
import {
  _constructColumns,
  _extractDatalistColumns,
} from "./utilities/_columnUtils";
const apiClient = inject<Record<string, Function>>("apiClient");
const props = defineProps<DatalistProps<TReq, TRecord>>();
const {
  datalistKey,
  useLazyFilters,
  records,
  displayType,
  exportable,
  initiallySelectedItems,
  formSections,
  rowIdentifier,
  debounceInMilliseconds,
  useLazy,
  isPresistFilters,
  requestMapper,
  columns,
  responseMapper,
  filters,
  isActionsDropdown,
  isServerside,
} = props.context;
const slots = defineSlots<DatalistSlots<TReq, TRecord>>();
const emit = defineEmits<DatalistEmits<TRecord>>();
const datalistStore = useDatalistStoreWithKey<TReq, TRecord>(datalistKey);
const {
  modelFiltersRef,
  modelSelectionRef,
  filtersFormSchema,
  setIsShowDeletedRef,
  errorRef,
  datalistColumnsRef,
  isShowDeletedRef,
  deleteRecordsConfirmed,
} = datalistStore;
const queryClient = useQueryClient();
const paginationParamsRef = ref<PaginationParams | undefined>();
const filtersValueRef = ref<Record<string, unknown> | undefined>();
let hasRequiredFilters = false;
// set thre reuest body on case of the default server side
// user remove the payload from the query params and use it from the server
// bind the filters form from the other component

const initFilters = () => {
  if (filters) {
    if (filters.length) {
      filters.forEach(({ input, matchMode }) => {
        filtersFormSchema.push(input);
        if ("validation" in input) {
          hasRequiredFilters = input.validation.includes("required");
        }
        modelFiltersRef[input.name as keyof DataTableFilterMetaData] = {
          matchMode: matchMode,
          value: filtersValueRef.value ? filtersValueRef.value[input.name] : "",
        };
      });
    }
  }
};

const queryFn = () => {
  if (Array.isArray(records)) {
    return Promise.resolve({ records });
  }
  return new Promise<DatalisQueryReturnType<TRecord>>((resolve, reject) => {
    const requestPayload = {
      filters: filtersValueRef.value,
      paginationParams: paginationParamsRef.value,
    };
    let request;
    try {
      request = requestMapper ? requestMapper(requestPayload) : requestPayload;
    } catch (e) {
      console.log("error from mapping", e);
      if (e instanceof Error) {
        datalistStore.errorRef = e.message;
      }
      return reject(e);
    }
    if (!apiClient) {
      return;
    }
    resolveApiEndpoint<typeof apiClient, TReq, StringUnkownRecord>(
      records,
      apiClient,
      request as TReq,
    ).then((response) => {
      if (responseMapper) {
        const newResponse = responseMapper(response);
        return resolve(newResponse);
      }
      if ("records" in response && Array.isArray(response["records"])) {
        if (
          response["records"].length &&
          ObjectKeys(datalistStore.datalistColumnsRef).length == 0
        ) {
          const datalistColumns = _constructColumns(
            response["records"][0],
            props.context.execludedColumns,
          );

          console.log("we are here", datalistColumns);
          console.log("we are here", response["records"][0]);
          datalistStore.datalistColumnsRef = datalistColumns;
        }
        return resolve(response as ApiResponseList<TRecord>);
      }
      const errMessage = "can't find records on the response ";
      datalistStore.errorRef = errMessage;
      return reject(new Error(errMessage));
    });
  });
};
const result = useQuery<DatalisQueryReturnType<TRecord>>({
  queryKey: [datalistKey, paginationParamsRef, filtersValueRef],
  queryFn,
  enabled: false,
  placeholderData: keepPreviousData,
});

const init = async () => {
  if (initiallySelectedItems)
    datalistStore.modelSelectionRef = initiallySelectedItems as TRecord[];
  datalistStore.formSections = formSections;
  //datalistStore.useFilterPersist = useFilterPersist;
  datalistStore.debounceInMilliSeconds = debounceInMilliseconds || 1000;
  initFilters();
  if (columns) {
    const extrectedColumns = _extractDatalistColumns<TReq, TRecord>(
      columns,
      slots,
    );
    datalistStore.datalistColumnsRef = extrectedColumns;
    console.log("colums", extrectedColumns);
  }
  if (useLazy) {
    return;
  }
  if (hasRequiredFilters) {
    return;
  }
  result.refetch();
};
await init();
const deleteMutation: DatalistDeleteMutation = useMutation({
  mutationFn: deleteRecordsConfirmed,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: [datalistKey] });
  },
});

const datalistMutations: DatalistMutations = { deleteMutation };

//await result.suspense();
const renderColumnActions = () => {
  return h(
    Column,
    {
      header: "actions",
      pt: {
        headerCell: "transparent",
      },
      class: "actions-btns",
      headerStyle: {
        width: "1rem",
      },
    },
    {
      body: slots.actions
        ? slots.actions
        : (context: { data: TRecord }) =>
            !result.data.value
              ? h("h2", "holahola")
              : [
                  h(
                    ColumnActions,
                    {
                      mutations: datalistMutations,
                      recordData: context.data,
                      isActionsDropdown: isActionsDropdown,
                      deleteRestoreHandler:
                        result.data.value.options?.deleteRestoreHandler,
                      deleteHandler: result.data.value.options?.deleteHandler,
                      datalistKey: datalistKey,
                    },
                    {
                      prependActions: slots.prependActions,
                      dropdownActions: slots.dropdownActions,
                      actions: slots.actions,
                      appendActions: slots.appendActions,
                    },
                  ),
                ],
    },
  );
};
const handleTableChanges = (
  value: DataTablePageEvent | DataTableSortEvent | DataTableFilterEvent,
) => {
  if (!isServerside) return;

  console.log("filters is", value.filters);
  if (currentData.value.length) {
    const pageNumber =
      "page" in value
        ? value.page + 1
        : paginationParamsRef.value
          ? paginationParamsRef.value.pageNumber
          : 1;
    const paginationParams: PaginationParams = {
      sortColumn:
        typeof value.sortField == "string"
          ? value.sortField
          : (rowIdentifier as string) || `${datalistKey}Id`,
      sortFunction: value.sortOrder == -1 ? "desc" : "asc",
      isDeleted: isShowDeletedRef,
      pageSize: value.rows,
      pageNumber,
    };
    if (value.filters) {
      console.log("filters is", value.filters);
    }
    paginationParamsRef.value = paginationParams;
    console.log(paginationParams, "value is onpage");
  }
};
const currentDataColumns = computed(() => {
  return ObjectKeys(datalistStore.datalistColumnsRef).map((columeKey) => {
    const currentColumn = datalistStore.datalistColumnsRef[columeKey];
    if (currentColumn) {
      return h(
        Column,
        {
          ...currentColumn.props,
          pt: {
            headerCell: "transparent",
          },
        },
        { ...currentColumn.slots },
      );
    }
  });
});
const selectAllColumn = h(Column, {
  selectionMode: "multiple",
  pt: {
    headerCell: "transparent",
  },
});
const currentData = computed<TRecord[]>(() => {
  if (!result.data.value) return [];
  const { records, deletedRecords = [] } = result.data.value;
  if (isShowDeletedRef) return isServerside ? records : deletedRecords;
  return records;
});

const renderdatalist = () => {
  console.log("rendere whole");
  return h(
    DataTable,
    {
      value: currentData.value,
      rows: 10,
      ref: "tableEmelentRef",
      maxHeight: 200,
      filters: modelFiltersRef as Record<string, DataTableFilterMetaData>,
      "onUpdate:filters": handleTableChanges,
      paginator: true,
      loading: result.isLoading.value || result.isFetching.value,
      pt: {
        root: "glass rounded-md p-md",
        header: "transparent",
        bodyRow: "transparent",
      },
      metaKeySelection: true,
      exportFilename: datalistKey,
      calss: `data-list ${displayType == "card" ? "cards" : ""}`,
      lazy: isServerside,
      totalRecords: !result.data.value
        ? undefined
        : !result.data.value.options
          ? undefined
          : result.data.value.options.totalCount,
      selection: modelSelectionRef,
      "onUpdate:selection": (e: TRecord[]) => {
        emit("update:selection", e);
        datalistStore.modelSelectionRef = e;
      },
      onPage: handleTableChanges,
      onSort: handleTableChanges,
      paginatorTemplate:
        "FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown",
    },
    {
      empty: () => [
        errorRef.length ? h("h2", errorRef) : h("h2", "no_records"),
      ],
      default: () => [
        selectAllColumn,
        ...currentDataColumns.value,
        renderColumnActions(),
      ],
      header: () =>
        slots.header
          ? slots.header(datalistStore)
          : [
              h(
                DatalistHeader,
                {
                  mutations: datalistMutations,
                  datalistKey: datalistKey,
                  onToggleShowDeleted: (value) => {
                    console.log("setting deleted");
                    setIsShowDeletedRef(value);
                    if (isServerside) {
                      if (paginationParamsRef.value) {
                        paginationParamsRef.value.isDeleted = value;
                      } else {
                        paginationParamsRef.value = { isDeleted: value };
                      }
                    }
                  },
                  exportable: exportable,
                },
                slots,
              ),
              h(
                DatalistFilters,
                {
                  "onUpdate:modelValue": (value: Record<string, unknown>) => {
                    console.log("update filter value", value);
                    if (!isServerside || !value) return;
                    filtersValueRef.value = value;
                    console.log("filters changed", filtersValueRef.value);
                  },
                  datalistKey: datalistKey,
                  isServerSide: isServerside,
                  schema: filtersFormSchema,
                  isPresistFilters: isPresistFilters,
                  useLazyFilters: useLazyFilters,
                },
                slots,
              ),
            ],
    },
  );
};
</script>
<template>
  <component :is="renderdatalist" />
</template>
