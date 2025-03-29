<script setup lang="ts" generic="TReq extends StringUnkownRecord,TRecord extends StringUnkownRecord">
import { h, type VNode } from 'vue';
import type { DatalistHeaderSlots, DatalistHeaderProps, DatalistFiltersEmits } from '../types';
import { useDatalistStoreWithKey } from '../store/DatalisStore';
import { ToggleSwitch } from 'primevue';
import { AppBtn } from 'devkit-base-components';
import { StringUnkownRecord } from 'devkit-apiclient';
const { datalistKey, exportable, mutations } = defineProps<DatalistHeaderProps>()
const slots = defineSlots<DatalistHeaderSlots<TReq, TRecord>>()

const emit = defineEmits<DatalistFiltersEmits>()
const datalistStore = useDatalistStoreWithKey<TReq, TRecord>(datalistKey)
const ExportBtn = h(AppBtn, {
  icon: "file_upload",
  useReset: true,
  class: "info",
  label: "export",
  action: () => { }
})
const ReloadBtn = h(AppBtn, {
  icon: "file_upload",
  useReset: true,
  class: "info",
  label: "reload",
  action: datalistStore.refetch

})
const actions = [
  slots.headerActionsStartPrepend ? slots.headerActionsStartPrepend(datalistStore) : undefined,
  datalistStore.availableActions.has('create') ? h(AppBtn, { label: 'create', action: datalistStore.createNewRecord, severity: 'success', class: '' }) : undefined,
  slots.headerActionsStartAppend ? slots.headerActionsStartAppend(datalistStore) : undefined,
]
const renderHeader = (): VNode => {
  const { deleteMutation } = mutations
  const deleteRestoreBtn = deleteMutation ? h(AppBtn, {
    useReset: true,
    ...datalistStore.deleteRestoreVariants,
    key: datalistStore.deleteRestoreVariants.icon,
    action: () => datalistStore.showDeleteDialog(deleteMutation, 'deleteRestore')
  }) : undefined
  const deleteBtn = deleteMutation && datalistStore.availableActions.has('delete') && datalistStore.isShowDeletedRef ? h(AppBtn, {
    label: 'delete',
    useReset: true,
    disabled: datalistStore.deleteRestoreVariants.disabled,
    severity: 'danger',
    class: 'text-white',
    action: () => datalistStore.showDeleteDialog(deleteMutation, 'delete')
  }) : undefined
  const variant = datalistStore.deleteRestoreVariants
  return h('div', {
    class: "table-actions"
  }, [
    h('div', {
      class: 'start'
    }, [...actions, deleteRestoreBtn, deleteBtn]),
    h('div', {
      class: 'end'
    }, [

      variant.hasDeletedRecords ? h(ToggleSwitch, {
        type: 'toggle',
        modelValue: datalistStore.isShowDeletedRef,
        onValueChange: (value: boolean) => emit('toggleShowDeleted', value),
      }) : undefined,
      exportable ? h(ExportBtn) : undefined,
      h(ReloadBtn),
    ])
  ])
}
</script>
<template>
  <component :is="renderHeader" />
</template>
