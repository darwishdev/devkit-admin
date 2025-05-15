<script lang="ts" setup generic="TApi extends Record<string, Function>">
import { FileCreateBulkRequest, FileObject } from "@/pkg/types/api_types";
import { resolveApiEndpoint } from "devkit-apiclient";
import { InputUploadProps } from "./types";
import FileUpload, {
  FileUploadSelectEvent,
  FileUploadUploaderEvent,
} from "primevue/fileupload";
import { h, inject, ref } from "vue";
import InputUploadDialog from "./InputUploadDialog.vue";
import { FilesHandler } from "@/pkg/types/types";
import { useDialog } from "primevue";
import { AppBtn, AppImage } from "devkit-base-components";
import { createFileBulkRequestFromFiles } from "./InputUploadAdapter";
const { context } = defineProps<InputUploadProps>();
const { bucketName, auto, fileLimit, node, multiple } = context;
const apiClient = inject<TApi>("apiClient");
const selectedFilesRef = ref<File[]>([]);
const galleryFilesRef = ref<FileObject[]>([]);
const dialog = useDialog();
const filesHandler = inject<FilesHandler<TApi>>("filesHandler");
const fileUploadElementRef = ref();
const totalFilesLength = () => {
  return selectedFilesRef.value.length + galleryFilesRef.value.length;
};
const inputValue = (): string[] | string => {
  const currentFiles = [
    ...galleryFilesRef.value.map((f) => `${f.name}`),
    ...selectedFilesRef.value.map((f) => `${bucketName}/${f.name}`),
  ];
  if (!currentFiles.length) return multiple ? [] : "";
  if (multiple) {
    return currentFiles;
  }
  return currentFiles[0];
};
// Emit types
// When files are selected
const onSelectedFiles = async (event: FileUploadSelectEvent) => {
  console.log("files selected", event.files);
  // if not auto means the uploader will not be loaded so we need to update the input and bind the request to parent form
  if (!event.files.length) return;
  if (!multiple) {
    galleryFilesRef.value = [];
    const files = [event.files[event.files.length - 1]];
    fileUploadElementRef.value.files = files;
    selectedFilesRef.value = files;
  } else {
    const files = [...selectedFilesRef.value, ...event.files];
    fileUploadElementRef.value.files = files;
    selectedFilesRef.value = files;
  }
  if (fileLimit && multiple) {
    if (totalFilesLength() + event.files.length > fileLimit) {
      console.error("exceeded file limit");
      return;
    }
  }
  if (!auto) {
    console.log("emiting innput val", inputValue());
    node.input(inputValue());
    if (node.parent) {
      if (node.parent.props.type == "form") {
        const request = await createFileBulkRequestFromFiles(
          event.files,
          bucketName,
        );
        node.parent.props.uploads = request;
      }
    }
  }
};
const openGallery = () => {
  dialog.open(
    h(InputUploadDialog, {
      bucketName,
      isSelectionHidden: !multiple,
      onChoose: async (files) => {
        if (!multiple) {
          console.log("choosing");
          console.log("choossssing", files);

          console.log("choossssing", files);
          galleryFilesRef.value = files;
          selectedFilesRef.value = [];
          node.input(inputValue());
          return;
        }

        fileUploadElementRef.value.uploadedFiles = [
          ...galleryFilesRef.value,
          ...files,
        ];
        galleryFilesRef.value = [...galleryFilesRef.value, ...files];
        node.input(inputValue());
      },
    }),
  );
};
const clearInput = () => {
  galleryFilesRef.value = [];
  galleryFilesRef.value = [];
  selectedFilesRef.value = [];
  node.input("");
  fileUploadElementRef.value.files = [];
};
const removeSelectedFile = (file: File) => {
  if (!multiple) {
    clearInput();
  }

  const index = selectedFilesRef.value.indexOf(file);
  if (index !== -1) {
    selectedFilesRef.value.splice(index, 1);
    node.input(inputValue());
    if (auto) {
      removeUploadedFile(file);
    }
  }
};
const removeGalleryFile = (file: FileObject) => {
  console.log("removing", file);
  if (!multiple) {
    clearInput();
  }
  const index = galleryFilesRef.value.indexOf(file);
  if (index !== -1) {
    galleryFilesRef.value.splice(index, 1);
    node.input(inputValue());
  }
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
const uploadMultipleFiles = async (request: FileCreateBulkRequest) => {
  if (!filesHandler) return;
  if (filesHandler.fileBulkCreate) {
    await resolveApiEndpoint(filesHandler.fileBulkCreate, apiClient, request);
    return;
  }

  if (filesHandler.fileCreate) {
    for (let i = 0; i < request.files.length; i++) {
      await resolveApiEndpoint(
        filesHandler.fileCreate,
        apiClient,
        request.files[i],
      );
    }
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
  let request = await createFileBulkRequestFromFiles(filesArr, bucketName);
  if (!request.files.length) return;
  if (!multiple) {
    await uploadSingleFile(request);
    node.input(inputValue());
    return;
  }
  await uploadMultipleFiles(request);
  node.input(inputValue());
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
            h("h2", JSON.stringify(galleryFilesRef.value)),
            selectedFilesRef.value.map((f) =>
              h(
                "div",
                {
                  class: "card",
                },
                [
                  h("img", {
                    width: "150px",
                    src: URL.createObjectURL(f),
                  }),
                  h(AppBtn, {
                    label: "remove",
                    icon: "trash",
                    action: () => removeSelectedFile(f),
                  }),
                ],
              ),
            ),
            galleryFilesRef.value.map((f) =>
              h(
                "div",
                {
                  class: "card",
                },
                [
                  h(AppImage, {
                    width: "150px",
                    src: f.name,
                  }),
                  h(AppBtn, {
                    label: "remove",
                    icon: "trash",
                    action: () => removeGalleryFile(f),
                  }),
                ],
              ),
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
                  await removeUploadedFile(selectedFilesRef.value);
                }
                galleryFilesRef.value = [];
                selectedFilesRef.value = [];
                node.input(inputValue());
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
