<script lang="ts" setup generic="TApi extends Record<string, Function>">
import { resolveApiEndpoint } from "devkit-apiclient";
import { InputUploadProps } from "./types";
import FileUpload, {
  FileUploadSelectEvent,
  FileUploadUploaderEvent,
} from "primevue/fileupload";
import { h, inject, ref } from "vue";
import InputUploadDialog from "./InputUploadDialog.vue";
import { useDialog } from "primevue";
import { AppBtn } from "devkit-base-components";
import { createFileBulkRequestFromFiles } from "./InputUploadAdapter";
import { FilesHandler } from "@/pkg/types/types";
import { FileCreateBulkRequest } from "@buf/ahmeddarwish_devkit-api.community_timostamm-protobuf-ts/devkit/v1/public_storage_pb";

const { context } = defineProps<InputUploadProps & { multiple: false }>();
const { bucketName, auto, fileLimit, node, multiple } = context;
const apiClient = inject<TApi>("apiClient");
const previewFileRef = ref(node.value);
const dialog = useDialog();
const filesHandler = inject<FilesHandler<TApi>>("filesHandler");
const fileUploadElementRef = ref();
// When files are selected
const emitInput = (value: string) => {
  previewFileRef.value = value;
  node.input(value);
};
const onSelectedFiles = async (event: FileUploadSelectEvent) => {
  console.log("files selected", event.files);
  if (!event.files.length || auto) return;
  const [file] = event.files;
  emitInput(file.name);
  if (node.parent) {
    if (node.parent.props.type == "form") {
      const request = await createFileBulkRequestFromFiles(
        event.files,
        bucketName,
      );
      node.parent.props.uploads = request;
    }
  }
};
const openGallery = () => {
  dialog.open(
    h(InputUploadDialog, {
      bucketName,
      isSelectionHidden: !multiple,
      onChoose: async (files) => {
        console.log("choossssing", files);
        if (files.length || auto) return;
        const [file] = files;
        emitInput(file.name);
      },
    }),
  );
};
const clearInput = () => {
  emitInput("");
};
const removeUploadedFile = async (file: File | File[]) => {
  if (!filesHandler) return;
  if (!filesHandler.fileDeleteByBucket) return;
  await resolveApiEndpoint(filesHandler.fileDeleteByBucket, apiClient, {
    bucketName: bucketName,
    records: Array.isArray(file) ? file.map((f) => f.name) : [file.name],
  });
};
const uploadSingleFile = async (request: FileCreateBulkRequest) => {
  if (!filesHandler) return;
  if (filesHandler.fileCreate) {
    await resolveApiEndpoint(
      filesHandler.fileCreate,
      apiClient,
      request.files[0],
    );
    return;
  }
  if (filesHandler.fileBulkCreate) {
    await resolveApiEndpoint(filesHandler.fileBulkCreate, apiClient, request);
    return;
  }
};

// On successful upload
const uploader = async (e: FileUploadUploaderEvent) => {
  if (!filesHandler) return;
  if (!filesHandler.fileBulkCreate && !filesHandler.fileCreate) return;
  if (!e.files) return;
  if (Array.isArray(e.files) && e.files.length == 0) return;
  const filesArr = Array.isArray(e.files) ? e.files : [e.files];
  const request = await createFileBulkRequestFromFiles(filesArr, bucketName);
  if (!request.files.length) return;
  await uploadSingleFile(request);
};
const renderFileUpload = () => {
  return h(
    FileUpload,
    {
      ...context,
      ref: (r) => (fileUploadElementRef.value = r),
      onSelect: onSelectedFiles,
      onUploader: uploader,
      fileLimit: !multiple ? 1 : fileLimit,
      customUpload: true,
    },
    {
      content: () =>
        h(
          "div",
          {
            class: "flex",
          },
          [
            h(
              "div",
              {
                class: "card",
              },
              [
                h("img", {
                  width: "150px",
                  src: previewFileRef.value,
                }),
                h(AppBtn, {
                  label: "remove",
                  icon: "trash",
                  action: () => null,
                }),
              ],
            ),
          ],
        ),
      empty: () => h("h2", "drop files hear"),
      header: ({
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
              outlined: true,
              severity: "info",
              action: () => {
                chooseCallback();
                console.log("choose");
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
                clearInput();
                clearCallback();
              },
            }),
          ],
        ),
    },
  );
};
</script>
<template>
  <component :is="renderFileUpload" />
</template>
