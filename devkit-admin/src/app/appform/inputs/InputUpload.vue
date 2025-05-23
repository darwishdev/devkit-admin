<script lang="ts" setup generic="TApi extends Record<string, Function>">
import { InputUploadProps } from "./types";
import { h, inject, ref } from "vue";
import {
  FileUpload,
  FileUploadSelectEvent,
  FileUploadUploaderEvent,
  useDialog,
  useToast,
} from "primevue";
import { FilesHandler } from "@/pkg/types/types";
import { FileCreateBulkRequest } from "@buf/ahmeddarwish_devkit-api.community_timostamm-protobuf-ts/devkit/v1/public_storage_pb";
import { ObjectKeys, resolveApiEndpoint } from "devkit-apiclient";
import { createFileBulkRequestFromFiles } from "./InputUploadAdapter";
import InputUploadDialog from "./InputUploadDialog.vue";
import { AppBtn, AppImage } from "devkit-base-components";
import { useI18n } from "vue-i18n";
const { context } = defineProps<InputUploadProps>();
const previewFilesRef = ref<
  Record<
    string,
    { src: string; fileIndex?: number; uploadedFileIndex?: number }
  >
>({});
const apiClient = inject<TApi>("apiClient");
const filesHandler = inject<FilesHandler<TApi>>("filesHandler");
const dialog = useDialog();
const toast = useToast();
const { t } = useI18n();

const {
  multiple = false,
  fileLimit,
  node,
  auto,
  bucketName = filesHandler?.defauleBucketName || "",
} = context;

// let inputValue: string | string[] = multiple ? [] : "";
const emitValue = () => {
  const keys = ObjectKeys(previewFilesRef.value);
  if (!keys.length) return node.input(multiple ? [] : "");
  return node.input(multiple ? keys : keys[0]);
};

const handleFileLimitExceeded = () => {
  toast.add({
    severity: "error",
    summary: t("max_files"),
    detail: t("file_limit_exceeded"),
    life: 3000,
  });
};
const isFileLimitExceeded = (len: number) => {
  console.log("lenis");
  const keysLength = ObjectKeys(previewFilesRef.value).length;
  console.log("lenis", keysLength);
  if (!multiple) {
    return keysLength > 0;
  }

  if (!fileLimit) return false;
  return keysLength + len > fileLimit;
};
const reflectValues = ({
  name,
  src,
  fileIndex,
  uploadedFileIndex,
  bucket = "",
}: {
  name: string;
  src?: string;
  fileIndex?: number;
  uploadedFileIndex?: number;
  bucket?: string;
}) => {
  const fileName = `${bucket}${name}`;
  previewFilesRef.value[fileName] = {
    src: src || fileName,
    fileIndex,
    uploadedFileIndex,
  };
};
const openGallery = () => {
  dialog.open(
    h(InputUploadDialog, {
      bucketName,
      onChoose: async (files) => {
        if (isFileLimitExceeded(files.length)) {
          handleFileLimitExceeded();
          console.error("max files exceeded");
          return;
        }
        files.forEach(reflectValues);
        emitValue();
      },
    }),
  );
};
const onSlectedFilesEvent = async (event: FileUploadSelectEvent) => {
  const { files } = event;
  if (!files.length || auto) return;
  if (isFileLimitExceeded(files.length)) {
    handleFileLimitExceeded();
    event.originalEvent.preventDefault();
    console.error("max files exceeded");
    return;
  }

  files.forEach((file: File, index: number) =>
    reflectValues({
      name: file.name,
      fileIndex: index,
      bucket: bucketName,
      src: URL.createObjectURL(file),
    }),
  );
  if (node.parent) {
    if (node.parent.props.type == "form") {
      const request = await createFileBulkRequestFromFiles(files, bucketName);
      node.parent.props.uploads = request;
    }
  }
};
const uploader = async (e: FileUploadUploaderEvent) => {
  if (!filesHandler) return;
  if (!filesHandler.fileBulkCreate && !filesHandler.fileCreate) return;
  if (!e.files) return;
  if (Array.isArray(e.files) && e.files.length == 0) return;
  const filesArr = Array.isArray(e.files) ? e.files : [e.files];
  if (!filesArr.length) return;
  const request = await createFileBulkRequestFromFiles(filesArr, bucketName);
  await uploadFiles(request);
};
const uploadFiles = async (request: FileCreateBulkRequest) => {
  if (!filesHandler || !bucketName) return;
  if (!filesHandler.fileBulkCreate && !filesHandler.fileCreate) return;
  if (filesHandler.fileBulkCreate) {
    await resolveApiEndpoint(filesHandler.fileBulkCreate, apiClient, request);
    return;
  }
  request.files.forEach(
    async (file) =>
      await resolveApiEndpoint(filesHandler.fileCreate, apiClient, file),
  );
};

const removeSelectedFile = (key: string) => {
  console.log("removeing this file", key);
  delete previewFilesRef.value[key];
  console.log(previewFilesRef.value);
  // const index = previewFilesRef.value.indexOf(file);
  // if (index !== -1) {
  //   previewFilesRef.value.splice(index, 1);
  //   node.input(inputValue());
  //   if (auto) {
  //     removeUploadedFile(file);
  //   }
  // }
};
const renderEmptySlot = () => h("h2", `drop files hear`);
const renderHeaderSlot = ({
  chooseCallback,
  clearCallback,
}: {
  chooseCallback: Function;
  clearCallback: Function;
}) =>
  h(
    "div",
    {
      class: "flex gap-2",
    },
    [
      h(AppBtn, {
        icon: "images",
        label: "select from files",
        rounded: true,
        // disabled: previewFileRef.value.value.length > 0,
        outlined: true,
        severity: "info",
        action: () => {
          chooseCallback();
        },
      }),
      h(AppBtn, {
        icon: "images",
        label: "select from gallery",
        rounded: true,
        outlined: true,
        severity: "success",
        action: () => {
          openGallery();
        },
      }),
      h(AppBtn, {
        icon: "images",
        label: "cancel",
        rounded: true,
        outlined: true,
        severity: "danger",
        action: async () => {
          if (auto) {
            //await removeUploadedFile(previewFileRef.value);
          }
          clearCallback();
        },
      }),
    ],
  );
const renderContentSlot = ({
  files,
  uploadedFiles,
  removeUploadedFileCallback,
  removeFileCallback,
  messages,
}: {
  files: File[];
  uploadedFiles: File[];
  removeUploadedFileCallback: (index: number) => void;
  removeFileCallback: (index: number) => void;
  progress: number;
  messages: string | undefined;
}) =>
  h(
    "div",
    {
      class: "flex",
    },
    [
      ObjectKeys(previewFilesRef.value).map((key) =>
        h(
          "div",
          {
            class: "card",
          },
          [
            h(AppImage, {
              width: "150px",
              src: previewFilesRef.value[key].src,
            }),
            h(AppBtn, {
              label: "remove",
              icon: "trash",
              action: () => {
                removeSelectedFile(key);
                const file = previewFilesRef.value[key];
                if (file.fileIndex) {
                  removeFileCallback(file.fileIndex);
                }
                if (file.uploadedFileIndex) {
                  removeUploadedFileCallback(file.uploadedFileIndex);
                }
              },
            }),
          ],
        ),
      ),
    ],
  );
const renderInputUpload = () => {
  return h(
    FileUpload,
    {
      ...context,
      url: "http://localhost:9090/upload",
      onSelect: onSlectedFilesEvent,
      onUploader: uploader,
    },
    {
      empty: renderEmptySlot,
      content: renderContentSlot,
      header: renderHeaderSlot,
    },
  );
};
</script>
<template>
  <component :is="renderInputUpload" />
</template>
