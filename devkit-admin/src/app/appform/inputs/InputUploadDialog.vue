<script setup lang="ts">
import { inject, ComputedRef } from "vue";
import FileManager from "@/app/filemanager/index";
import {
  FileObject,
  GalleryListRequest,
  GalleryListResponse,
} from "@/pkg/types/api_types";
import { AppBtn, AppImage } from "devkit-base-components";
import { DynamicDialogInstance } from "primevue/dynamicdialogoptions";
import { DatalistStore } from "@/app/datalist";

const dialog = inject<ComputedRef<DynamicDialogInstance>>("dialogRef");
const props = defineProps<{
  isSelectionHidden?: boolean;
  bucketName?: string;
}>();
const emit = defineEmits<{
  (e: "choose", file: FileObject[]): void;
}>();
const chooseFile = (file: FileObject) => {
  console.log("close", dialog);
  if (!dialog) return;
  dialog.value.close();
  emit("choose", [file]);
};
const chooseFiles = (
  store: DatalistStore<
    Record<string, Function>,
    GalleryListRequest,
    FileObject,
    GalleryListRequest,
    GalleryListResponse,
    GalleryListRequest
  >,
) => {
  console.log(store.modelSelectionRef);
  console.log("close", dialog);
  if (!dialog) return;
  dialog.value.close();
  emit("choose", store.modelSelectionRef);
  store.modelSelectionRef = [];
};
</script>
<template>
  <Suspense>
    <FileManager v-bind="props">
      <template #actions="{ data }">
        <AppBtn :action="() => chooseFile(data)" label="choose" />
      </template>
      <template #globalActions="{ store }">
        <AppBtn :action="() => chooseFiles(store)" label="choose" />
      </template>
      <template #card="{ data }">
        {{ data.name }}
        <AppImage :width="150" :src="data.name" />
      </template>
    </FileManager>
  </Suspense>
</template>
