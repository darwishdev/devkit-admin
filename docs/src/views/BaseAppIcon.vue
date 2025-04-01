<template>
  <div class="buckets" @dragover.prevent="onDragOver" @dragleave="onDragLeave" @drop.prevent="onDrop"
    :class="{ 'drag-active': isDragging }">
    <input type="file" ref="fileInput" @change="handleFileChange" style="display: none" />
    <div v-if="isDragging" class="drop-overlay">
      Drop files here to upload
    </div>
    <Datalist :context="datalistProps.context">
      <template #headerActionsStartAppend>
        <AppBtn :action="openUploadDialog" label="upload" />
      </template>
    </Datalist>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { apiClient } from '../api/apiClient';
import { useQuery } from '@tanstack/vue-query';
import { Datalist, useDatalistStoreWithKey, type DatalistProps } from "devkit-admin";
import type { FileListRequest, FileObject } from '@buf/ahmeddarwish_devkit-api.bufbuild_es/devkit/v1/public_storage_pb';
import type { StringUnkownRecord } from '../../../devkit-admin/dist/types/pkg/types/types';
import { AppBtn } from 'devkit-base-components';
const isDragging = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);
const datalistStore = useDatalistStoreWithKey('files')
const handleFileChange = (event: Event) => {
  console.log(datalistStore.modelFiltersRef.bucketId)
  const bucketId = datalistStore.modelFiltersRef['bucketId']
  if (!bucketId.value) {
    console.error("bucket should be selected to be able to upload")
    return
  }
  const target = event.target as HTMLInputElement;
  if (!target.files || target.files.length === 0) return;

  const file = target.files[0];
  const filePath = file.name; // Adjust based on your needs
  const fileType = file.type;

  const reader = new FileReader();

  reader.onload = () => {
    if (reader.result instanceof ArrayBuffer) {
      const fileRequest = {
        path: filePath,
        bucketName: bucketId.value,
        reader: new Uint8Array(reader.result),
        fileType: fileType,
      };
      apiClient.fileCreate(fileRequest).then((response) => {
        console.log("response", response)
      })
      console.log("FileCreateRequest:", fileRequest);
    }
  };

  reader.readAsArrayBuffer(file);
  console.log("should handle the upload", bucketId.value)
}

const openUploadDialog = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
  console.log("should open the upload")
}
const datalistProps: DatalistProps<Partial<FileListRequest>, FileObject> = {
  context: {
    datalistKey: 'files',
    title: "files",
    rowIdentifier: "id",
    execludedColumns: ['$typeName', '$unknown'],
    filters: [{
      matchMode: "contains",
      isServerSide: true,
      input: {
        $formkit: 'devkitDropdown',
        options: 'bucketList',
        responseOptionsKey: 'buckets',
        optionValue: 'id',
        optionLabel: 'name',
        validationVisibility: "live",
        validation: '+required',
        prefixIcon: "tools",
        showClear: true,
        outerClass: "col-12 sm:col-6 md:col-3",
        name: "bucketId",
        placeholder: "buckets"
      }
    }],
    requestMapper: (req) => {
      if (!req.filters) return { bucketId: '' }
      if (typeof req.filters.bucketId !== 'string') return { bucketId: '' }
      return { bucketId: req.filters.bucketId }
    },
    responseMapper: (response: StringUnkownRecord) => {
      console.log("response from mapper", response)
      return { records: response.files as FileObject[], options: { title: "files", description: "files_description", totalCount: 50 } }
    },
    records: 'fileList',
    isServerside: true,
    exportable: true,
    displayType: 'card',
    useLazyFilters: false,
    isActionsDropdown: true,
    options: { title: "asd", description: "asd" },
  }
}

// Existing bucket create function
const bucketCreateOpen = () => {
  console.log("open the model to create new bucket");
};
const actions = {
  rename: () => {
    console.log("rename the file")
  },
  move: () => {
    console.log('move the image')
  },
  download: () => {
    console.log("download the image")
  },
  delete: () => {
    console.log("delete ")
  }
}
// Existing buckets query
const bucketsQuyeryResult = useQuery({
  queryKey: ['bucketList'],
  queryFn: () => new Promise((resolve) => {
    apiClient.bucketList({}).then((response) => {
      console.log("reso", response);
      const r = response.buckets.map(bucket => {
        return {
          key: bucket.id.toString(),
          label: bucket.name,
          icon: 'pi pi-fw pi-folder',
        };
      });
      resolve(r);
    });
  }),
});

// Add images query (assuming this exists or needs to be added)

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
const uploadFiles = async (files: any) => {
  try {
    const formData = new FormData();
    for (const file of files) {
      formData.append('files[]', file);
    }

    // Assuming you have an upload endpoint in your apiClient
    //  const reques: FileCreateRequest = { path: "new.webp", bucketName: 'images',fileType: 'webp' ,  }
    //const response = await apiClient.fileCreate(reques);

    // Refresh the images query after successful upload
  } catch (error) {
    console.error('Upload failed:', error);
  }
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
