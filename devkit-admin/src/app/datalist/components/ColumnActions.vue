<script setup lang="ts" generic="TReq,TRecord extends Record<string, unknown> ">
import { h, ref } from 'vue'; import {
  type
    ColumnActionsProps, type ColumnActionsSlots
} from '../types';
import { useDatalistStoreWithKey } from '../store/DatalisStore';
import { Menu } from 'primevue';
import { AppBtn } from 'devkit-base-components';
const { datalistKey, deleteRestoreHandler, deleteHandler, recordData, isActionsDropdown } = defineProps<ColumnActionsProps<TRecord>>()
const datalistStore = useDatalistStoreWithKey<TReq, TRecord>(datalistKey)
const slots = defineSlots<ColumnActionsSlots<TRecord>>()
const actionsMenuElementRef = ref()
const actions = [
  slots.prependActions ? slots.prependActions({ data: recordData }) : undefined,
  datalistStore.availableActions.view ? h(AppBtn, { label: 'view', action: () => datalistStore.viewRecord(recordData) }) : undefined,
  datalistStore.availableActions.update ? h(AppBtn, { label: 'update', action: () => datalistStore.updateRecord(recordData) }) : undefined,
]
const renderActions = () => {
  if (slots.actions) return h('div', { class: 'actions-btns__wrapper' }, slots.actions({ data: recordData }))
  const deleteRestoreBtn = deleteRestoreHandler ? h(AppBtn, { ...datalistStore.deleteRestoreVariants, class: 'glass', disabled: false, action: () => datalistStore.deleteRestoreRecords(recordData), label: !isActionsDropdown ? '' : datalistStore.deleteRestoreVariants.label }) : undefined
  const deleteBtn = datalistStore.isShowDeletedRef && deleteHandler ? h(AppBtn, { label: 'delete', action: () => datalistStore.deleteRecords(recordData) }) : undefined
  const appendActions = slots.appendActions ? slots.appendActions({ data: recordData }) : undefined
  if (!isActionsDropdown) return h('div', { class: 'actions-btns__wrapper flex gap-2' }, [...actions, deleteRestoreBtn, deleteBtn, appendActions])
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
        start: () => slots.dropdownActions ? slots.dropdownActions({ data: recordData }) : h('div', [actions, deleteRestoreBtn, deleteBtn, appendActions]),
      }
    )
  ])
}

</script>
<template>
  <component :is="renderActions" />
</template>
