<template>
  <div
    class="buckets"
    @dragover.prevent="onDragOver"
    @dragleave="onDragLeave"
    @drop.prevent="onDrop"
    :class="{ 'drag-active': isDragging }"
  >
    <input
      type="file"
      ref="fileInput"
      @change="handleFileChange"
      style="display: none"
    />
    <div v-if="isDragging" class="drop-overlay">Drop files here to upload</div>
    <Datalist :context="datalistProps.context">
      <template #card="{ data }">
        <AppImage :src="`${data.name}`" class="w-150" />
      </template>
      <template #globalActionsStartAppend>
        <AppBtn :action="openUploadDialog" label="upload" />
      </template>
    </Datalist>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { apiClient } from "../api/apiClient";
import Datalist, {
  type DatalistProps,
  useDatalistStoreWithProps,
} from "devkit-admin/datalist";
import type {
  BucketCreateUpdateRequest,
  FileListRequest,
  FileObject,
} from "@buf/ahmeddarwish_devkit-api.bufbuild_es/devkit/v1/public_storage_pb";
import type { AppFormSections } from "../../../devkit-admin/dist/types/pkg/types/types";
import { AppBtn } from "devkit-base-components";
const isDragging = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);
const formSections: AppFormSections<BucketCreateUpdateRequest> = {
  bucket_info: {
    isTitleHidden: true,
    isTransparent: true,
    inputs: [
      {
        $formkit: "text",
        prefixIcon: "tools",
        outerClass: "col-12 sm:col-6 md:col-5",
        name: "bucketName",
        validation: "required",
        placeholder: "bucketName",
        label: "bucketName",
      },
      {
        $formkit: "text",
        prefixIcon: "tools",
        outerClass: "col-12 sm:col-6 md:col-5",
        name: "fileSizeLimit",
        placeholder: "fileSizeLimit",
        label: "fileSizeLimit",
      },
      {
        $formkit: "devkitMultiDropdown",
        options: [{ label: "image/webp", value: "image/webp" }],
        optionValue: "label",
        optionLabel: "value",
        prefixIcon: "tools",
        outerClass: "col-12 sm:col-6 md:col-5",
        name: "allowedFileTypes",
        placeholder: "allowedFileTypes",
        label: "allowedFileTypes",
      },
      {
        $formkit: "checkbox",
        prefixIcon: "tools",
        outerClass: "col-12 sm:col-6 md:col-5",
        name: "isPulic",
        value: true,
        placeholder: "isPulic",
        label: "userPassword",
      },
    ],
  },
};
const datalistProps: DatalistProps<
  typeof apiClient,
  FileListRequest,
  FileObject,
  undefined,
  undefined,
  BucketCreateUpdateRequest
> = {
  context: {
    datalistKey: "files",
    hideShowDeleted: true,
    title: "files",
    formSections,
    rowIdentifier: "id",
    execludedColumns: ["$typeName", "$unknown"],
    records: "galleryList",
    isServerSide: false,
    isPresistFilters: true,
    displayType: "card",
    isLazyFilters: false,
    isActionsDropdown: true,
    options: { title: "asd", description: "asd" },
  },
};

const datalistStore = useDatalistStoreWithProps(datalistProps);
// Drag and drop handlers
const onDragOver = (event: Event) => {
  event.preventDefault();
  isDragging.value = true;
};

const onDragLeave = () => {
  isDragging.value = false;
};

const onDrop = async (event: any) => {
  event.preventDefault();
  isDragging.value = false;

  const files = event.dataTransfer.files;
  if (files.length > 0) {
    await uploadFiles(files);
  }
};

// File upload function
const uploadFiles = async (files: FileList) => {
  console.log("uploading", files);
  try {
    const file = files[0];
    const filePath = file.name; // Adjust based on your needs
    const fileType = file.type;
    const filtersFormValue = datalistStore.filtersFormStore.formValueRef;

    if (!filtersFormValue || !("bucketName" in filtersFormValue)) return;
    const bucketName = filtersFormValue.bucketName;
    if (!bucketName) return;
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.result instanceof ArrayBuffer) {
        const fileRequest = {
          path: filePath,
          bucketName: bucketName as string,
          reader: new Uint8Array(reader.result),
          fileType: fileType,
        };
        apiClient.fileCreate(fileRequest).then((response) => {
          datalistStore.datalistQueryResult.refetch();
          console.log("response", response);
        });
        console.log("FileCreateRequest:", fileRequest);
      }
    };

    reader.readAsArrayBuffer(file);
  } catch (error) {
    console.error("Upload failed:", error);
  }
};
const openUploadDialog = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};
const handleFileChange = (event: Event) => {
  console.log("filte changed", event);
  // console.log(datalistStore.modelFiltersRef.bucketId)
  const bucketId = { value: "images" };
  if (!bucketId.value) {
    console.error("bucket should be selected to be able to upload");
    return;
  }
  const target = event.target as HTMLInputElement;
  if (!target.files || target.files.length === 0) return;
  console.log("should handle the upload", bucketId.value);
  uploadFiles(target.files);
};
</script>

<style>
.buckets {
  position: relative;
  padding: 1rem;
  border: 2px dashed #ccc;
  border-radius: 4px;
  min-height: 200px;
}

.drag-active {
  border-color: #2196f3;
  background-color: rgba(33, 150, 243, 0.1);
}

.drop-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  pointer-events: none;
}

.images {
  margin-top: 1rem;
}
</style>
