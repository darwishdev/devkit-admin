<script setup lang="ts" generic="TReq extends StringUnkownRecord, TRecord extends StringUnkownRecord">
import { FormKitSchema, useFormKitContextById } from "@formkit/vue";
import { useDatalistStoreWithKey } from "../store/DatalisStore";
import {
  type DatalistFiltersEmits,
  type DatalistFiltersProps,
  type DatalistFiltersSlots,
} from "../types";
import { h, onMounted, ref, resolveComponent } from "vue";
import { useDebounceFn } from "@vueuse/core";
import Chip from "primevue/chip";
import { Panel } from "primevue";

import { AppBtn, AppIcon } from "devkit-base-components";
import { ObjectKeys, StringUnkownRecord } from "devkit-apiclient";
const formkitComp = resolveComponent("FormKit");
const {
  datalistKey,
  useLazyFilters = false,
  schema,
  isServerSide,
} = defineProps<DatalistFiltersProps>();
const datalistStore = useDatalistStoreWithKey<TReq, TRecord>(datalistKey);
const slots = defineSlots<DatalistFiltersSlots<TReq, TRecord>>();
const emit = defineEmits<DatalistFiltersEmits>();

const formValue = useFormKitContextById(`${datalistKey}-filter-form`)
const formNode = ref(null);
const modelFilterFormRef = ref<
  Partial<Record<keyof TRecord & string, unknown>>
>({});
onMounted(() => {
  const filtersValueFlat: StringUnkownRecord = {}
  ObjectKeys(datalistStore.modelFiltersRef).forEach(key => filtersValueFlat[key as string] = datalistStore.modelFiltersRef[key].value)
  modelFilterFormRef.value = filtersValueFlat
  console.log("formvalue from filters mounted", formNode.value)
});
const onFormChange = useDebounceFn((formValue, node) => {
  datalistStore.isFiltersFormValid = node.context.state.valid
  if (!datalistStore.isFiltersFormValid) return
  emit("update:modelValue", formValue);
},
  datalistStore.debounceInMilliSeconds,
);
const renderFiltersForm = () => {
  return slots.filtersForm
    ? slots.filtersForm(datalistStore)
    : h(
      formkitComp,
      {
        id: `${datalistKey}-filter-form`,
        type: "form",
        actions: useLazyFilters,
        modelValue: modelFilterFormRef.value,
        onInput: useLazyFilters ? undefined : onFormChange,
        onSubmit: useLazyFilters ? onFormChange : undefined,
      },
      { default: () => h(FormKitSchema, { schema }) },
    );
};
const removeFilter = (filter: keyof TRecord | string) => {
  modelFilterFormRef.value[filter] = null;
  datalistStore.applyFilters(modelFilterFormRef.value);
  if (datalistStore.serverSideInputs.has(filter.toString())) {
    emit('queryInvalidate')
  }

};
const renderResetButton = () => {
  return h(AppBtn, {
    useReset: true,
    label: "reset",
    action: () => {
      modelFilterFormRef.value = {};
      if (isServerSide) emit("update:modelValue", {});
      datalistStore.resetFiltersForm();
    },
  });
};
const renderActiveFilters = () => {
  return ObjectKeys(datalistStore.activeFilters).map(
    (activeFilterKey) =>
      h(
        Chip,
        {
          removable: true,
          class: "z-10 cursor-pointer",
          onRemove: () => {
            datalistStore.removeFilter(activeFilterKey as string);
          },
          onClick: () => {
            removeFilter(activeFilterKey.toString());
            if (modelFilterFormRef.value[activeFilterKey]) {
              datalistStore.removeFilter(activeFilterKey as string);
            }
          },
        },
        {
          default: () => [
            h(AppIcon, { useReset: true, icon: "filter" }),
            h("div", [
              h("span", activeFilterKey as string),
              h("span", ":"),
              h("span", modelFilterFormRef.value[activeFilterKey]),
            ]),
          ],
        },
      ),
  );
};
const renderPresistButton = () => {
  return h(AppBtn, {
    label: "presist",
    action: () => {
      datalistStore.presistFilters(modelFilterFormRef.value);
    },
  });
};
const renderFilters = () => {
  console.log("from filters fomr", schema.length, schema);
  if (schema.length == 0) return;
  return h(
    Panel,
    {
      toggleable: true,
      pt: {
        root: "transparent",
        header: "relative glass",
        content: "glass",
        headerActions: "filters-toggler",
      },
    },
    {
      header: () =>
        h("div", { class: "filters-header flex" }, [
          h("strong", "filters"),
          h("div", { class: "flex" }, [...renderActiveFilters()]),
        ]),
      default: () => [
        renderResetButton(),
        renderPresistButton(),
        renderFiltersForm(),
        //h(AccordionContent, {}, { default: () => [renderFiltersForm()] })
      ],
    },
  );
};
</script>
<template>
  <FormKit />
  <component :is="renderFilters" />
</template>
