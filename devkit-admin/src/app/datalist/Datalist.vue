<script lang="ts" setup generic="
    TApi extends Record<string, Function>,
    TReq extends Record<string, unknown>,
    TRecord extends Record<string, unknown>,
    TFiltersReq extends Record<string, unknown> | undefined = undefined,
    TApiResponse extends Record<string, unknown> | undefined = undefined,
    TFormSectionsRequest extends Record<string, unknown> | undefined = undefined
  ">
  import DataTable from "primevue/datatable";

  import { useDatalistStoreWithProps } from "./store/DatalistStore";

  import {
    Column,
    IconField,
    InputIcon,
    InputText,
    ToggleSwitch,
  } from "primevue";
  import { type DatalistEmits, type DatalistProps, type DatalistSlots, type DatalistStore } from "./types";
  import DatalistFiltersForm from "./components/DatalistFiltersForm.vue";
  import { AppBtn } from "devkit-base-components";
  import { objectEntries } from "@vueuse/core";
  import { computed, h } from "vue";
  import { StringUnkownRecord } from "@/pkg/types/types";
  const emit = defineEmits<DatalistEmits<TRecord, TApiResponse>>()
  const props =
    defineProps<
      DatalistProps<
        TApi,
        TReq,
        TRecord,
        TFiltersReq,
        TApiResponse,
        TFormSectionsRequest
      >
    >();
  const { hideShowDeleted } = props.context;
  const datalistStore: DatalistStore<
    TApi,
    TReq,
    TRecord,
    TFiltersReq,
    TApiResponse,
    TFormSectionsRequest
  > = useDatalistStoreWithProps(props);
  const isDeleteVisibile = computed(
    () =>
      datalistStore.optionsInUse.deleteHandler &&
      (hideShowDeleted || datalistStore.isShowDeletedRef),
  );
  const isShowDeletedSwitctVisible = computed(
    () =>
      !hideShowDeleted &&
      (datalistStore.deleteRestoreVariants.hasDeletedRecords ||
        datalistStore.isShowDeletedRef),
  );
  const slots = defineSlots<
    DatalistSlots<
      TApi,
      TReq,
      TRecord,
      TFiltersReq,
      TApiResponse,
      TFormSectionsRequest
    >
  >();
  const deleteRestoreButtonProps = computed(() => {
    return {
      key: datalistStore.deleteRestoreVariants.label,
      action: datalistStore.deleteRestoreOpenDialog,
      ...datalistStore.deleteRestoreVariants,
    };
  });
  await datalistStore.init();
  const renderRowActions = (record: TRecord) => {
    return datalistStore.permittedActions.rowActions.map(actionBtn => {
      const callback = (value: StringUnkownRecord) => emit('update:submited', value)
      return slots[`rowActions.${actionBtn.actionKey}`] ? slots[`rowActions.${actionBtn.actionKey}`]!({ store: datalistStore, data: record }) : h(AppBtn, { action: () => actionBtn.actionFn(callback, record), ...actionBtn })
    })
  }
  const renderGlobalActions = () => {
    return datalistStore.permittedActions.globalActions.map(actionBtn => {
      const callback = (value: StringUnkownRecord) => emit('create:submited', value)
      return slots[`globalActions.${actionBtn.actionKey}`] ? slots[`globalActions.${actionBtn.actionKey}`]!({ store: datalistStore }) : h(AppBtn, { action: () => actionBtn.actionFn(callback), ...actionBtn })
    })
  }

</script>
<template>
  <DataTable v-model:selection="datalistStore.modelSelectionRef"
    :dataKey="(context.rowIdentifier as string) || undefined" :rows="10" :value="datalistStore.currenData"
    selection-mode="multiple" :max-height="200" :globalFilterFields="datalistStore.globalFilters"
    :filters="datalistStore.filterFormValue" paginator metaKeySelection
    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
    :loading="datalistStore.datalistQueryResult.isLoading ||
      datalistStore.datalistQueryResult.isFetching
      ">
    <template #header="">
      <slot name="header" :store="datalistStore">
        <div class="d-flex">
          <slot name="globalActions" :store="datalistStore">
            <div class="global-actions">
              <div class="global-actions__start">
                <slot name="globalActionsStartPrepend" :store="datalistStore" />
                <component v-for="(slotContent, index) in renderGlobalActions()" :key="index" :is="slotContent" />
                <!-- <slot v-for="actionBtn in datalistStore.permittedActions.globalActions" -->
                <!--   :name="`globalActions.${actionBtn.actionKey}`" :store="datalistStore"> -->
                <!--   <AppBtn v-bind="actionBtn" :action="() => actionBtn.actionFn()" :key="actionBtn.label" /> -->
                <!-- </slot> -->

                <slot name="globalActionsStartAppend" :store="datalistStore" />
              </div>
              <div class="global-actions__end">
                <slot name="globalActionsEndPrepend" :store="datalistStore" />
                <slot name="globalActions.delete" v-if="isDeleteVisibile" :store="datalistStore">
                  <AppBtn :action="() =>
                    datalistStore.deleteRestoreOpenDialog({
                      isHardDelete: true,
                    })
                    " label="hard_delete" severity="danger" />
                </slot>
                <slot name="globalActions.deleteRestore" v-if="datalistStore.optionsInUse.deleteRestoreHandler"
                  :store="datalistStore">
                  <AppBtn v-bind="deleteRestoreButtonProps" />
                </slot>

                <slot name="globalActionsEndAppend" :store="datalistStore" />
              </div>
            </div>
          </slot>
          <div class="deleted-switch" v-if="isShowDeletedSwitctVisible">
            show deleted
            <ToggleSwitch v-model="datalistStore.isShowDeletedRef" />
          </div>
          <IconField v-if="datalistStore.permittedActions.globalActions.length">
            <InputIcon>
              <i class="pi pi-search" />
            </InputIcon>
            <InputText :modelValue="(datalistStore.filtersFormStore.initialFormValue[
              'global'
            ] as string) || ''
              " @update:modelValue="(value: unknown) => {
                console.log('val; ', value);
                datalistStore.filtersFormStore.setInputValue('global', value);
              }
                " placeholder="Keyword Search" />
          </IconField>
        </div>
        <slot name="filtersPanel" :store="datalistStore">
          <DatalistFiltersForm :datalistKey="context.datalistKey" />
        </slot>
      </slot>
    </template>
    <template #empty>
      <slot name="empty">
        <h2 v-if="!datalistStore.isFiltersFormValid">select filters</h2>
        <h2 v-else>{{ datalistStore.deleteRestoreVariants.empty }}</h2>
      </slot>
    </template>
    <Column selection-mode="multiple" :pt="{ headerCell: 'transparent' }">
    </Column>

    <Column v-if="context.displayType == 'card'" key="card">
      <template #body="{ data }">
        <slot name="card" :data="data as TRecord">
          <div class="card-item">
            <slot name="cardStart" :data="data as TRecord" />
            <slot name="cardEnd" :data="data as TRecord" />
          </div>
        </slot>
      </template>
    </Column>
    <Column v-else v-for="[columnKey, columnValue] in objectEntries(
      datalistStore.datatableColumnsRef,
    )" :key="columnKey" v-bind="columnValue?.props">
      <template v-if="columnValue" #body="{ data }">
        <slot :name="`column.${columnKey}`" :data="data as TRecord" :store="datalistStore">
          <component v-if="typeof columnValue.renderHtml == 'function'" :is="() => columnValue.renderHtml!(data)" />
        </slot>
      </template>
    </Column>
    <Column header="actions" :header-style="{ width: '1rem' }" v-if="!context.hideActions">
      <template #body="{ data: record }">
        <slot name="actions" :data="record" />
        <div class="d-flex">
          <slot name="actionsPrepend" :data="record" />
          <slot name="rowActions.delete" v-if="isDeleteVisibile" :data="record as TRecord" :store="datalistStore">
            <AppBtn :action="() =>
              datalistStore.deleteRestoreOpenDialog({
                record,
                isHardDelete: true,
              })
              " label="hard_delete" severity="danger" />
          </slot>
          <slot name="rowActions.deleteRestore" v-if="datalistStore.optionsInUse.deleteRestoreHandler"
            :store="datalistStore" :data="record as TRecord">
            <AppBtn v-bind="deleteRestoreButtonProps"
              :action="() => datalistStore.deleteRestoreOpenDialog({ record })" />
          </slot>
          <component v-for="(slotContent, index) in renderRowActions(record)" :key="index" :is="slotContent" />
          <!-- <slot v-for="actionBtn in datalistStore.permittedActions.rowActions" :key="actionBtn.label" -->
          <!--   :name="`rowActions.${actionBtn.actionKey}`" :data="record"> -->
          <!--   <AppBtn v-bind="actionBtn" :action="() => actionBtn.actionFn(record)" /> -->
          <!-- </slot> -->
          <slot name="actionsAppend" :data="record" />
        </div>
      </template>
    </Column>
  </DataTable>
</template>
