<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts" generic="TReq extends StringUnkownRecord, TRecord extends StringUnkownRecord">
import { computed, h, inject, ref, shallowRef, toRefs, watch } from "vue";
import type {
  DatalistEmits,
  DatalistProps,
  DatalistSlots,
  PaginationParams,
} from "./types";
import DataTable, {
  type DataTableFilterEvent,
  type DataTablePageEvent,
  type DataTableSortEvent,
} from "primevue/datatable";
import { useDatalistStoreWithKey } from "./store/DatalisStore";
import { Column } from "primevue";
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
  ApiListOptions,
  ApiResponseList,
} from "./utilities/_apiTypes";
import { DatalistMutations } from "./store/types";
import {
  ObjectKeys,
  resolveApiEndpoint,
  StringUnkownRecord,
} from "devkit-apiclient";
import { RouteQueryFind } from "@/pkg/utils/QueryUtils";
import {
  _constructColumns,
  _extractDatalistColumns,
} from "./utilities/_columnUtils";
import { FormKitSchemaNode } from "@formkit/core";
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
  execludedColumns,
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
  modelSelectionRef,
  setIsShowDeletedRef,
  errorRef,
  serverSideInputs,
  isShowDeletedRef,
  deleteRecordsConfirmed,
} = datalistStore;
const queryClient = useQueryClient();
const paginationParamsRef = ref<PaginationParams | undefined>();
const filtersFormSchema: FormKitSchemaNode[] = []
// let hasRequiredFilters = false;
// set thre reuest body on case of the default server side
// user remove the payload from the query params and use it from the server
// bind the filters form from the other component
const isQueryEnabled = computed(() => {
  return datalistStore.isFiltersFormValid
})

const requiredFilters = new Set<string>()
const initFilters = () => {

  if (filters) {
    const formValues =
      localStorage.getItem(datalistStore.filtersFormKey) ||
      RouteQueryFind(datalistStore.filtersFormKey);
    let formValuesObject: StringUnkownRecord = {}
    if (formValues != null) {
      formValuesObject = JSON.parse(formValues)
    }
    if (filters.length) {
      filters.forEach(({ input, matchMode, isServerSide: currentFilterIsServerSide }) => {
        const currentInputValue = input.name in formValuesObject ? formValuesObject[input.name] : null
        filtersFormSchema.push(input);
        if (isServerside || currentFilterIsServerSide) {
          serverSideInputs.add(input.name)
        }
        console.log("input us", input)
        if ("validation" in input) {
          const isRequired = input.validation.includes("required");
          if (isRequired) {
            datalistStore.requiredFilters.add(input.name)

            console.log("input datalistStore", datalistStore.requiredFilters)
          }
        }
        datalistStore.modelFiltersRef[input.name] = {
          matchMode,
          value: currentInputValue,
        };
      });
    }
  }
};
const validateRequiredFilters = () => {
  console.log("filter is required", datalistStore.requiredFilters)
  if (datalistStore.requiredFilters.size) {
    const filters = datalistStore.requiredFilters.keys()
    filters.forEach((filter) => {
      console.log("filter is required", filter, datalistStore.formFiltersValueFlat[filter])
    })
    return true

  }
}
const queryInvalid = ref(false)
const queryFn = () => {
  const isFormValid = validateRequiredFilters()
  if (!isFormValid) {
    console.log(isFormValid)
  }
  if (isServerside) {
    return Promise.resolve({ records: [] })
  }

  if (Array.isArray(records)) {
    return Promise.resolve({ records });
  }
  return new Promise<ApiResponseList<TRecord>>((resolve, reject) => {
    const requestPayload = {
      filters: datalistStore.formFiltersValueFlat,
      paginationParams: paginationParamsRef.value,
    };
    let request;
    try {
      request = requestMapper ? requestMapper(requestPayload) : isServerside ? requestPayload : datalistStore.formFiltersValueFlat;
    } catch (e) {
      if (e instanceof Error) {
        datalistStore.errorRef = e.message;
      }
      return reject(e);
    }
    resolveApiEndpoint<Record<string, Function>, TReq, StringUnkownRecord>(
      records,
      apiClient,
      request as TReq,
    ).then((response) => {

      console.log("this is the response ", 'options' in response, datalistStore.datalistOptions)
      if (!datalistStore.datalistOptions.createHandler && 'options' in response) {

        console.log("this is the response ", typeof response.options == 'object')
        if (response.options && typeof response.options == 'object') {
          console.log(response.options, 'createHandler' in response.options)
          const options = response.options as ApiListOptions
          datalistStore.datalistOptions.createHandler = options.createHandler
          datalistStore.datalistOptions.updateHandler = options.updateHandler
          datalistStore.datalistOptions.deleteHandler = options.deleteHandler
          datalistStore.datalistOptions.deleteRestoreHandler = options.deleteRestoreHandler
          datalistStore.datalistOptions.totalCount = options.totalCount
          console.log("this datalistStore.datalistOptions is the response ", 'options', datalistStore.datalistOptions)
          if ('createHandler' in response.options) datalistStore.availableActions.add('create')
          if ('updateHandler' in response.options) datalistStore.availableActions.add('update')
          if ('deleteRestoreHandler' in response.options) datalistStore.availableActions.add('deleteRestore')
          if ('deleteHandler' in response.options) datalistStore.availableActions.add('delete')
        }
      }
      if (responseMapper) {
        console.log("this is the response mapper")
        const newResponse = responseMapper(response);
        return resolve(newResponse);
      }
      if ("records" in response && Array.isArray(response["records"])) {
        return resolve(response as ApiResponseList<TRecord>);
      }
      const errMessage = "can't find records on the response ";
      datalistStore.errorRef = errMessage;
      return reject(new Error(errMessage));
    }).catch((e) => {
      return reject(e);
    });
  });
};
watch(() => datalistStore.formFiltersValueFlat, (newFilters) => {
  if (isServerside) {
    result.refetch()
  }
})
const result = useQuery<ApiResponseList<TRecord>, Error>({
  queryKey: [datalistKey, datalistStore.formFiltersValueFlat],
  queryFn: () => queryFn().then(async (response: ApiResponseList<TRecord>) => {
    const { records } = response
    if (
      records.length > 0 &&
      ObjectKeys(datalistStore.datalistColumnsRef).length == 0
    ) {
      const datalistColumns = _constructColumns(
        records[0],
        props.context.execludedColumns,
        slots,
      );
      datalistStore.datalistColumnsRef = datalistColumns;
    }
    return response
  }),
  enabled: true,
  placeholderData: keepPreviousData,
});
const init = async () => {
  datalistStore.syncProps(props)
  if (initiallySelectedItems)
    datalistStore.modelSelectionRef = initiallySelectedItems as TRecord[];
  datalistStore.isServerSide = props.context.isServerside || false
  console.log("formsectionsdasd s", formSections)

  datalistStore.formSections = { ...formSections };

  console.log("formsectionsdasd s", datalistStore.formSections)
  //datalistStore.useFilterPersist = useFilterPersist;
  datalistStore.debounceInMilliSeconds = debounceInMilliseconds || 1000;
  initFilters();
  if (columns) {
    const extrectedColumns = _extractDatalistColumns<TReq, TRecord>(
      columns,
      slots,
    );
    datalistStore.datalistColumnsRef = extrectedColumns;
  }
  if (useLazy) {
    return;
  }
};
await init();
const deleteMutation = useMutation({
  mutationFn: deleteRecordsConfirmed,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: [datalistKey] });
  },
});

const datalistMutations = { deleteMutation } as unknown as DatalistMutations;

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
                  mutations: datalistMutations as unknown as DatalistMutations,
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
  console.log("curren data is ", result.data.value)
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
      filters: datalistStore.modelFiltersRef,
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
      totalRecords: !isServerside ? undefined : !result.data.value
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
        errorRef.length ? h("h2", errorRef) : false ? h("h2", "select filters") : h("h2", "no_records"),
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
                "onUpdate:modelValue": (value: Partial<Record<(keyof TRecord) | string, unknown>>) => {
                  console.log("value is", value)
                  datalistStore.applyFilters(value)
                  if (!result.isFetched.value) {
                  }
                },
                "onQueryInvalidate": () => {
                  console.log("remove this required field should remove the data")
                  queryInvalid.value = true
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
  <h2>is enabled {{ datalistStore.formFiltersValueFlat }}</h2>
  <component :is="renderdatalist" />
</template>
