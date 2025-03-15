<script
  setup
  lang="ts"
  generic="TReq extends StringUnkownRecord, TRecord extends StringUnkownRecord"
>
import { FormKitSchema } from "@formkit/vue";
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
import { RouteQueryFind } from "@/pkg/utils/QueryUtils";
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
const modelFilterFormRef = ref<
  Partial<Record<keyof TRecord & string, unknown>>
>({});
onMounted(() => {
  const form =
    localStorage.getItem(datalistStore.filtersFormKey) ||
    RouteQueryFind(datalistStore.filtersFormKey);
  console.log("dataliststore is here", form);
  if (form && typeof form == "string") {
    const newModelValue = JSON.parse(form);
    modelFilterFormRef.value = newModelValue;
    console.log("formref", modelFilterFormRef.value);
    datalistStore.applyFilters(modelFilterFormRef.value);
  }
});
const onFormChange = useDebounceFn(
  isServerSide
    ? (formValue) => {
        emit("update:modelValue", formValue);
      }
    : datalistStore.applyFilters,
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
    (activeFilterKey: keyof TRecord | string) =>
      h(
        Chip,
        {
          removable: true,
          class: "z-10 cursor-pointer",
          onRemove: () => {
            datalistStore.removeFilter(activeFilterKey as string);
          },
          onClick: () => {
            removeFilter(activeFilterKey);
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
  <h2>model{{ modelFilterFormRef }} {{ schema }}</h2>
  <component :is="renderFilters" />
</template>
