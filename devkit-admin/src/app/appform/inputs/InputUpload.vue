<script lang="ts" setup generic="TApi extends Record<string, Function>">
import { InputUploadProps } from "./types";
import { h } from "vue";
import InputUploadSingle from "./InputUploadSingle.vue";
import InputUploadMultiple from "./InputUploadMultiple.vue";
const { context } = defineProps<InputUploadProps>();
const { multiple = false } = context;
const renderInputUpload = () => {
  if (!multiple) {
    return h(InputUploadSingle, { context, multiple });
  }
  return h(InputUploadMultiple, { context, multiple });
};
</script>
<template>
  <component :is="renderInputUpload" />
</template>
