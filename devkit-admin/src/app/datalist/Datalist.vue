<script setup lang="ts" generic="TReq extends  StringUnkownRecord,TRecord extends  StringUnkownRecord">
import { computed, h, ref, type Ref } from 'vue';
import type { DatalistEmits, DatalistProps, DatalistSlots, PaginationParams } from './types';
import DataTable, { type DataTableFilterEvent, type DataTableFilterMetaData, type DataTablePageEvent, type DataTableSortEvent } from 'primevue/datatable';
import { useDatalistStoreWithKey } from './store/DatalisStore';
import { Column } from 'primevue';
import ColumnActions from './components/ColumnActions.vue';
import DatalistHeader from './components/DatalistHeader.vue';
import DatalistFilters from './components/DatalistFilters.vue';
import { useMutation, useQuery, useQueryClient, keepPreviousData } from '@tanstack/vue-query';
import type { DatalisQueryReturnType } from './utilities/_apiTypes';
import { DatalistDeleteMutation, DatalistMutations } from './store/types';
import { StringUnkownRecord } from 'devkit-apiclient';
const props = defineProps<DatalistProps<TReq, TRecord>>()
const slots = defineSlots<DatalistSlots<TReq, TRecord>>()
const emit = defineEmits<DatalistEmits<TRecord>>();
const datalistStore = useDatalistStoreWithKey<TReq, TRecord>(props.context.datalistKey)
const queryClient = useQueryClient()
const paginationParamsRef = ref<PaginationParams | undefined>()
const filtersValueRef = ref<Record<string, unknown> | undefined>()
// set thre reuest body on case of the default server side
// user remove the payload from the query params and use it from the server
// bind the filters form from the other component
const result = useQuery<DatalisQueryReturnType<TRecord>>({
  queryKey: [props.context.datalistKey, paginationParamsRef, filtersValueRef],
  queryFn: () => datalistStore.datalistFetchFunction({
    paginationParams: paginationParamsRef.value,
    requestMapper: props.context.requestMapper,
    responseMapper: props.context.responseMapper,
    filtersValue: filtersValueRef.value,
    records: props.context.records, deletedRecords: [], options: props.context.options
  }),
  enabled: true,
  placeholderData: keepPreviousData,
})

const deleteMutation: DatalistDeleteMutation = useMutation({
  mutationFn: datalistStore.deleteRecordsConfirmed,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: [props.context.datalistKey] })
  },
})

const datalistMutations: DatalistMutations = { deleteMutation }

await result.suspense().then((queryResult) => {
  datalistStore.init({ queryResult, props, slots, mutaions: datalistMutations })
})

const renderColumnActions = () => {
  return h(Column,
    {
      header: 'actions',
      pt: {
        headerCell: 'transparent'
      },
      class: 'actions-btns',
      headerStyle: {
        width: "1rem"
      },
    },
    {
      body: slots.actions ? slots.actions : (context: { data: TRecord }) => !result.data.value ? h('h2', 'holahola') : [
        h(ColumnActions, {
          mutations: datalistMutations,
          recordData: context.data,
          isActionsDropdown: props.context.isActionsDropdown,
          deleteRestoreHandler: result.data.value.options?.deleteRestoreHandler,
          deleteHandler: result.data.value.options?.deleteHandler,
          datalistKey: props.context.datalistKey
        }, {
          prependActions: slots.prependActions,
          dropdownActions: slots.dropdownActions,
          actions: slots.actions,
          appendActions: slots.appendActions
        })
      ]
    }
  )
}
const handleTableChanges = (value: DataTablePageEvent | DataTableSortEvent | DataTableFilterEvent) => {
  if (!props.context.isServerside) return

  console.log("filters is", value.filters)
  if (currentData.value.length) {
    const pageNumber = 'page' in value ? value.page + 1 : paginationParamsRef.value ? paginationParamsRef.value.pageNumber : 1
    const paginationParams: PaginationParams = {
      sortColumn: typeof value.sortField == 'string' ? value.sortField : props.context.rowIdentifier as string || `${props.context.datalistKey}Id`,
      sortFunction: value.sortOrder == -1 ? 'desc' : 'asc',
      isDeleted: datalistStore.isShowDeletedRef,
      pageSize: value.rows,
      pageNumber
    }
    if (value.filters) {
      console.log("filters is", value.filters)
    }
    paginationParamsRef.value = paginationParams
    console.log(paginationParams, "value is onpage")
  }
}
const currentDataColumns = datalistStore.datalistColumns.map((item) => h(Column, {
  ...item.props, pt: {
    headerCell: 'transparent',
  }
}, item.slots))
const selectAllColumn = h(Column, {
  selectionMode: 'multiple',
  pt: {
    headerCell: 'transparent',
  }

})
const currentData = computed<TRecord[]>(() => {
  const { isShowDeletedRef } = datalistStore
  if (!result.data.value) return []
  const { records, deletedRecords = [] } = result.data.value
  if (isShowDeletedRef) return props.context.isServerside ? records : deletedRecords
  return records
})

const renderdatalist = () => {
  console.log("rendere whole")
  return h(
    DataTable,
    {
      value: currentData.value,
      rows: 10,
      ref: 'tableEmelentRef',
      maxHeight: 200,
      filters: datalistStore.modelFiltersRef as Record<string, DataTableFilterMetaData>,
      "onUpdate:filters": handleTableChanges,
      paginator: true,
      loading: result.isLoading.value || result.isFetching.value,
      pt: {
        root: 'glass rounded-md p-md',
        header: 'transparent',
        bodyRow: 'transparent',
      },
      metaKeySelection: true,
      exportFilename: props.context.datalistKey,
      calss: `data-list ${props.context.displayType == 'card' ? 'cards' : ''}`,
      lazy: props.context.isServerside,
      totalRecords: !result.data.value ? undefined : !result.data.value.options ? undefined : result.data.value.options.totalCount,
      selection: datalistStore.modelSelectionRef,
      "onUpdate:selection": (e: any) => {
        emit('update:selection', e)
        datalistStore.modelSelectionRef = e
      },
      "onPage": handleTableChanges,
      "onSort": handleTableChanges,
      paginatorTemplate:
        "FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown",
    },
    {
      empty: () => [h('h1', 'no_records')],
      default: () => [selectAllColumn, ...currentDataColumns, renderColumnActions()],
      header: () => slots.header ?
        slots.header(datalistStore) :
        [
          h(DatalistHeader, {
            mutations: datalistMutations,
            datalistKey: props.context.datalistKey, onToggleShowDeleted: (value) => {
              console.log("setting deleted",)
              datalistStore.setIsShowDeletedRef(value)
              if (props.context.isServerside) {
                if (paginationParamsRef.value) {
                  paginationParamsRef.value.isDeleted = value
                } else {
                  paginationParamsRef.value = { isDeleted: value }
                }
              }
            }, exportable: props.context.exportable
          }, slots),
          h(DatalistFilters, {
            'onUpdate:modelValue': (value: Record<string, unknown>) => {
              console.log("update filter value", value)
              if (!props.context.isServerside || !value) return
              filtersValueRef.value = value
              console.log("filters changed", filtersValueRef.value)
            }, datalistKey: props.context.datalistKey, isServerSide: props.context.isServerside, schema: datalistStore.filtersFormSchema, isPresistFilters: props.context.isPresistFilters, useLazyFilters: props.context.useLazyFilters
          }, slots)
        ],
    }
  );
}
</script>
<template>
  <h2>datalist</h2>
  <component :is="renderdatalist" />
</template>
