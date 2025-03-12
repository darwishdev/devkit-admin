<template>
  <div class="buckets" v-if="imagesQuyeryResult.data.value" @dragover.prevent="onDragOver" @dragleave="onDragLeave"
    @drop.prevent="onDrop" :class="{ 'drag-active': isDragging }">
    <div v-if="isDragging" class="drop-overlay">
      Drop files here to upload
    </div>
    <Datalist :context="datalistProps.context">
      <template #header>
        <h2>header</h2>
      </template>
      <template #appendActions="">
        <AppBtn v-for="action in ObjectKeys(actions)" :key="action" :label="action" :action="actions[action]" />
      </template>
      <template #card="item">
        <div class="object-partial">
          <AppImage width="150px" preview :src="`images/${item.data.name}`" />
          <h2> {{ item.data.name }}</h2>
          <h3 v-if="item.data.metadata"> {{ item.data.metadata.size }}</h3>
          <h3 v-if="item.data.metadata"> {{ item.data.metadata.mimetype }}</h3>
        </div>
      </template>
    </Datalist>

  </div>
</template>

<script setup lang="ts">
import { ObjectKeys } from 'devkit-apiclient'
import { ref } from 'vue';
import { apiClient } from '../api/apiClient';
import { useQuery } from '@tanstack/vue-query';
import { Datalist, type DatalistProps } from "devkit-admin";
import { AppBtn, AppImage } from 'devkit-base-components';
import type { FileListRequest, FileListResponse, FileObject } from '@buf/ahmeddarwish_devkit-api.bufbuild_es/devkit/v1/public_storage_pb';
import type { DatalistRequest } from '../../../devkit-admin/dist/types/app/datalist/types';
import type { ApiResponseList } from '../../../devkit-admin/dist/types/app/datalist/utilities/_apiTypes';
import { throws } from 'assert';
// Drag and drop state
const isDragging = ref(false);
const datalistProps: DatalistProps<Partial<FileListRequest>, FileObject> = {
  context: {
    datalistKey: 'files',
    title: "files",
    rowIdentifier: "id",
    filters: [{
      matchMode: "contains",
      input: {
        $formkit: 'devkitDropdown',
        options: 'bucketList',
        optionValue: 'id',
        optionLabel: 'name',
        prefixIcon: "tools",
        outerClass: "col-12 sm:col-6 md:col-3",
        name: "bucketId",
        placeholder: "buckets"
      }
    }],
    requestMapper: (req: DatalistRequest): Partial<FileListRequest> => {
      if (!req.filters) {
        throw new Error('bucket must be selected')
      }
      const request: Partial<FileListRequest> = {
        bucketId: req.filters['bucketId'] as string
      }
      return request
    },
    records: 'fileList',
    isServerside: false,
    exportable: true,
    displayType: 'table',
    useLazyFilters: true,
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
const imagesQuyeryResult = useQuery({
  queryKey: ['imagesList'],
  queryFn: () => apiClient.fileList({ bucketId: 'images' }), // Adjust this based on your API
});

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
    imagesQuyeryResult.refetch();
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
