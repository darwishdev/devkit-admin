<
<script lang="ts" setup generic="TApi extends Record<string, Function>">
import { FileCreateBulkRequest, FileObject } from "@/pkg/types/api_types";
import { resolveApiEndpoint } from "devkit-apiclient";
import { InputUploadProps } from "./types";
import FileUpload, {
  FileUploadRemoveUploadedFile,
  FileUploadSelectEvent,
  FileUploadSlots,
  FileUploadUploaderEvent,
} from "primevue/fileupload";
import { computed, h, inject, ref } from "vue";
import InputUploadDialog from "./InputUploadDialog.vue";
import { FilesHandler } from "@/pkg/types/types";
import { useDialog } from "primevue/usedialog";
import { AppBtn } from "devkit-base-components";
import { ProgressBar } from "primevue";
const { context } = defineProps<InputUploadProps>();
const { bucketName, auto, fileLimit, node, multiple } = context;
const slots = defineSlots<FileUploadSlots>();
const apiClient = inject<TApi>("apiClient");
const totalSize = ref(0);
const totalSizePercent = ref(0);
const files = ref<File[]>([]);
const dialog = useDialog();
const filesHandler = inject<FilesHandler<TApi>>("filesHandler");
const fileUploadElementRef = ref();
// Emit types
const emit = defineEmits<{ (e: "valueChange", value: unknown): void }>();
// When files are selected
const onSelectedFiles = (event: FileUploadSelectEvent): void => {
  if (!auto) {
    if (!multiple) {
      node.input(`${bucketName}/${event.files[0].name}`);
    } else {
      node.input(event.files.map((f: File) => `${bucketName}/${f.name}`));
    }
    createFileBulkRequest(event).then((req) => {
      if (node.parent) {
        console.log("createFileBulkRequest", node.parent.props.type);
        if (node.parent.props.type == "form") {
          node.parent.props.uploads = req;
        }
      }
    });
  }
  files.value = event.files as File[];
};

const baseImage = import.meta.env.VITE_BASE_IMAGE_URL;
const convertToFile = async (fileObject: FileObject): Promise<File> => {
  const fileUrl = `${baseImage}${fileObject.name}`;
  const response = await fetch(fileUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch file from ${fileUrl}`);
  }

  const blob = await response.blob();
  const lastModified = new Date(fileObject.updatedAt).getTime();

  return new File([blob], fileObject.name, {
    type: blob.type || "application/octet-stream",
    lastModified,
  });
};
const openGallery = () => {
  dialog.open(
    h(InputUploadDialog, {
      bucketName,
      isSelectionHidden: !multiple,
      onChoose: async (file) => {
        fileUploadElementRef.value.uploadedFiles.push(
          await convertToFile(file[0]),
        );
        console.log("choosen file is ", await convertToFile(file[0]));
      },
    }),
  );
};
// Upload action
const createFileRequest = async (file: File) => {
  console.log("filecalledis", file);
  const arrayBuffer = await file.arrayBuffer();
  return {
    path: `${file.name}`,
    bucketName: bucketName,
    reader: new Uint8Array(arrayBuffer),
    fileType: file.type,
  };
};

// Function to create the bulk file request
const createFileBulkRequest = async (
  event: FileUploadUploaderEvent,
): Promise<FileCreateBulkRequest> => {
  const inputFiles = Array.isArray(event.files) ? event.files : [event.files];
  const fileRequests = await Promise.all(
    inputFiles.map((file) => createFileRequest(file)),
  );
  return {
    files: fileRequests,
  };
};

const onRemoveUploadedFile = (event: FileUploadRemoveUploadedFile) => {
  if (!filesHandler) return;
  if (!filesHandler.fileDeleteByBucket) return;
  resolveApiEndpoint(filesHandler.fileDeleteByBucket, apiClient, {
    bucketName: bucketName,
    records: [`${event.file.name}`],
  });
};
// On successful upload
const uploader = async (e: FileUploadUploaderEvent) => {
  if (!filesHandler) return;
  if (!filesHandler.fileBulkCreate && !filesHandler.fileCreate) return;
  if (!e.files) return;
  if (Array.isArray(e.files) && e.files.length == 0) return;
  totalSizePercent.value = totalSize.value / 10;
  fileUploadElementRef.value.uploadedFiles.push(...files.value);
  let request = await createFileBulkRequest(e);
  if (!request.files.length) return;
  if (!multiple) {
    if (filesHandler.fileCreate) {
      await resolveApiEndpoint(
        filesHandler.fileCreate,
        apiClient,
        request.files[0],
      );
      node.input(`${bucketName}/${request.files[0].path}`);
      return;
    }
    if (filesHandler.fileBulkCreate) {
      await resolveApiEndpoint(filesHandler.fileBulkCreate, apiClient, request);
      node.input(`${bucketName}/${request.files[0].path}`);
    }
  }
  if (multiple) {
    if (filesHandler.fileBulkCreate) {
      await resolveApiEndpoint(filesHandler.fileBulkCreate, apiClient, request);
      node.input(
        fileUploadElementRef.value.uploadedFiles.map(
          (f: File) => `${bucketName}/${f.name}`,
        ),
      );
      return;
    }
    const inpuValue: string[] = [];
    await Promise.all(
      request.files.map((req) => {
        inpuValue.push(req.path);
        return resolveApiEndpoint(filesHandler.fileCreate, apiClient, req);
      }),
    );
    node.input(inpuValue);
    return;
  }
};
const renderFileUpload = () => {
  return h(
    FileUpload,
    {
      ...context,
      ref: (r) => (fileUploadElementRef.value = r),
      onSelect: onSelectedFiles,
      onUploader: uploader,
      onRemoveUploadedFile,
      fileLimit: !multiple ? 1 : fileLimit,
      customUpload: true,
    },
    {
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
              action: () => {
                clearCallback();
              },
            }),
          ],
        ),
      // content: ({
      //   removeUploadedFileCallback,
      //   removeFileCallback,
      // }: {
      //   files: File[];
      //   uploadedFiles: File[];
      //   removeUploadedFileCallback: (index: number) => void;
      //   removeFileCallback: (index: number) => void;
      // }) =>
      //   h(
      //     "div",
      //     {
      //       class: "flex",
      //     },
      //     [
      //       previews.value.map(({ file, url }) =>
      //         h(
      //           "div",
      //           {
      //             key: `${file.name}${file.size}${file.type}`,
      //           },
      //           [
      //             h("img", {
      //               src: url,
      //               width: "150px",
      //             }),
      //             h(AppBtn, {
      //               label: "delete",
      //               icon: "trash",
      //               action: () => {
      //                 removeFile(
      //                   file,
      //                   removeUploadedFileCallback,
      //                   removeFileCallback,
      //                 );
      //               },
      //             }),
      //           ],
      //         ),
      //       ),
      //     ],
      //   ),
    },
  );
};
</script>
<template>
  <component :is="renderFileUpload" />
</template>
