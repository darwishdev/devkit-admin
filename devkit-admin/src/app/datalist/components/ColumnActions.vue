<script setup lang="ts" generic="TReq extends StringUnkownRecord,TRecord extends StringUnkownRecord ">
import { h, ref, VNode } from 'vue'; import {
  type
    ColumnActionsProps, type ColumnActionsSlots
} from '../types';
import { useDatalistStoreWithKey } from '../store/DatalisStore';
import { Menu } from 'primevue';
import { AppBtn } from 'devkit-base-components';
import { StringUnkownRecord } from 'devkit-apiclient';
const { datalistKey, deleteRestoreHandler, deleteHandler, recordData, isActionsDropdown, mutations } = defineProps<ColumnActionsProps<TRecord>>()
const datalistStore = useDatalistStoreWithKey<TReq, TRecord>(datalistKey)
const slots = defineSlots<ColumnActionsSlots<TRecord>>()
const actionsMenuElementRef = ref()
const actions = [
  slots.prependActions ? slots.prependActions({ data: recordData }) : undefined,
  datalistStore.availableActions.view ? h(AppBtn, { useReset: true, label: 'view', action: () => datalistStore.viewRecord(recordData) }) : undefined,
  datalistStore.availableActions.update ? h(AppBtn, { useReset: true, label: 'update', action: () => datalistStore.updateRecord(recordData) }) : undefined,
]
const renderActions = () => {
  if (slots.actions) return h('div', { class: 'actions-btns__wrapper' }, slots.actions({ data: recordData }))
  const { deleteMutation } = mutations
  const deleteActions: VNode[] = []
  if (deleteMutation) {
    const { availableActions, deleteRestoreVariants, showDeleteDialog } = datalistStore
    const { delete: hasDeletePermission, deleteRestore: hasDeleteRestorePermission } = availableActions

    if (hasDeletePermission) {
      deleteActions.push(h(AppBtn, {
        label: 'delete',
        icon: 'trash',
        action: () => showDeleteDialog(deleteMutation, 'delete', recordData)
      }))
    }
    if (hasDeleteRestorePermission && datalistStore.isShowDeletedRef) {
      const { label, severity, icon } = deleteRestoreVariants
      deleteActions.push(h(AppBtn, {
        label,
        severity,
        icon,
        key: icon,
        action: () => showDeleteDialog(deleteMutation, 'deleteRestore', recordData)
      }))
    }
  }

  const appendActions = slots.appendActions ? slots.appendActions({ data: recordData }) : undefined
  if (!isActionsDropdown) return h('div', { class: 'actions-btns__wrapper flex gap-2' }, [...actions, ...deleteActions, appendActions])
  return h('div', {
    class: 'actions-btns__wrapper'
  }, [
    h(AppBtn, {
      icon: "menu",
      class: "glass",
      ariaHaspopup: true,
      ariaControls: "actions-menu",
      action: (e: Event) => {
        actionsMenuElementRef.value.toggle(e)
      }
    }),
    h(Menu, {
      ref: (el) => {
        if (el && !actionsMenuElementRef.value) {
          actionsMenuElementRef.value = el
        }
      },
      id: 'actions-menu',
      class: 'actions-menu',
      popup: true
    },
      {
        start: () => slots.dropdownActions ? slots.dropdownActions({ data: recordData }) : h('div', [actions, ...deleteActions, appendActions]),
      }
    )
  ])
}

</script>
<template>
  <component :is="renderActions" />
</template>
