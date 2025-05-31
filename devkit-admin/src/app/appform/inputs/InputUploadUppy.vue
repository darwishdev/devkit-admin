<template>
  <div id="app">
    <AppBtn label="choose from gallery" :action="openGallery" />
    <Dashboard :uppy="uppy" :props="{
      metaFields: [
        { id: 'name', name: 'Name', placeholder: 'file name' },
        { id: 'objectName', name: 'objectName', placeholder: 'objectName' },
        {
          id: 'contentType',
          name: 'contentType',
          placeholder: 'contentType',
        },
        { id: 'bucketName', name: 'bucketName', placeholder: 'bucketName' },
        {
          id: 'caption',
          name: 'Caption',
          placeholder: 'describe what the image is about',
        },
      ],
    }" :plugins="['Webcam', 'ImageEditor']" />
  </div>
</template>

<script lang="ts" setup generic="TApi extends Record<string, Function>">
import { h, inject, onBeforeUnmount, onMounted } from "vue";
import { Dashboard } from "@uppy/vue";
import Uppy from "@uppy/core";
import Tus from "@uppy/tus";
import Webcam from "@uppy/webcam";
import ImageEditor from "@uppy/image-editor";

// Styles
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import "@uppy/webcam/dist/style.css";
import "@uppy/image-editor/dist/style.css";
import { InputUploadProps } from "./types";
import { FilesHandler } from "@/pkg/types/types";
import InputUploadDialog from "./InputUploadDialog.vue";
import { useDialog } from "primevue";
import { AppBtn } from "devkit-base-components";
import { resolveApiEndpoint } from "devkit-apiclient";
import { FileUploadUrlFindResponse } from "@/pkg/types/api_types";

const { context } = defineProps<InputUploadProps>();
// Retrieve token from local storage or another auth source
const filesHandler = inject<FilesHandler<TApi>>("filesHandler");
const apiClient = inject<TApi>("apiClient");
const urlFindResponse: FileUploadUrlFindResponse | undefined = !filesHandler
  ? undefined
  : await resolveApiEndpoint(filesHandler?.fileUploadUrlFind, apiClient);
const {
  multiple = false,
  fileLimit,
  auto,
  node,
  bucketName = filesHandler?.defauleBucketName || "",
} = context;
// Initialize Uppy instance

const dialog = useDialog();

onMounted(async () => {
  //  setTimeout(async () => {
  //    if (!node || !node._value) return;
  //    const initialFiles = Array.isArray(node._value)
  //      ? node._value
  //      : [node._value];
  //
  //    for (const path of initialFiles) {
  //      const [bucket, ...rest] = path.split("/");
  //      const fileName = rest.join("/");
  //
  //      const fileBlob = await fileFromFileObject(
  //        filesHandler!.uploadUrl.replace(
  //          "/upload/resumable",
  //          "object/public/abchotels",
  //        ),
  //        {
  //          name: fileName,
  //          bucketId: bucket,
  //          owner: "",
  //          id: "",
  //          createdAt: "",
  //          updatedAt: "",
  //          lastAccessedAt: "",
  //        },
  //      );
  //
  //      if (!fileBlob) continue;
  //
  //      try {
  //        const fileId = uppy.addFile({
  //          name: fileName,
  //          type: fileBlob.type,
  //          data: fileBlob,
  //          source: "initial",
  //          isRemote: false,
  //          meta: {
  //            bucketName: bucket,
  //            objectName: fileName,
  //            contentType: fileBlob.type,
  //          },
  //        });
  //
  //        uppy.setFileState(fileId, {
  //          progress: {
  //            uploadStarted: Date.now(),
  //            uploadComplete: true,
  //            percentage: 100,
  //            bytesUploaded: fileBlob.size,
  //            bytesTotal: fileBlob.size,
  //          },
  //          uploadURL: `${filesHandler?.uploadUrl.replace("/upload/resumable", "public/v1")}/${fileName}`,
  //          response: {
  //            status: 200,
  //            body: {},
  //            uploadURL: `${filesHandler?.uploadUrl.replace("/upload/resumable", "public/v1")}/${fileName}`,
  //          },
  //          isPaused: false,
  //        });
  //
  //        uppy.emit("upload-success", uppy.getFile(fileId), {
  //          uploadURL: `${filesHandler?.uploadUrl.replace("/upload/resumable", "public/v1")}/${fileName}`,
  //        });
  //      } catch (err) {
  //        console.error("Error injecting initial file:", err);
  //      }
  //    }
  //  }, 1000);
});
const openGallery = () => {
  dialog.open(
    h(InputUploadDialog, {
      bucketName,
      onChoose: async (files) => {
        for (const file of files) {
          //  // You must have a utility like fileFromFileObject to get the File/Blob
          //  const fileBlob = await fileFromFileObject(
          //    filesHandler!.uploadUrl.replace(
          //      "/upload/resumable",
          //      "object/public",
          //    ),
          //    file,
          //  );
          //  if (!fileBlob) continue;
          //
          //  try {
          //    const fileId = uppy.addFile({
          //      name: file.name,
          //      type: fileBlob.type,
          //      data: fileBlob,
          //      source: "gallery",
          //      isRemote: false,
          //      meta: {
          //        bucketName: file.bucketId,
          //        objectName: file.name,
          //        contentType: fileBlob.type,
          //      },
          //    });
          //
          //    // Mark the file as already uploaded
          //    uppy.setFileState(fileId, {
          //      progress: {
          //        uploadStarted: Date.now(),
          //        uploadComplete: true,
          //        percentage: 100,
          //        bytesUploaded: fileBlob.size,
          //        bytesTotal: fileBlob.size,
          //      },
          //      uploadURL: `${filesHandler?.uploadUrl.replace("/upload/resumable", "public/v1")}/${file.name}`,
          //      response: {
          //        status: 200,
          //        body: {},
          //        uploadURL: `${filesHandler?.uploadUrl.replace("/upload/resumable", "public/v1")}/${file.name}`,
          //      },
          //      isPaused: false,
          //    });
          //
          //    // Let Uppy/Dashboard know the file upload "succeeded"
          //    uppy.emit("upload-success", uppy.getFile(fileId), {
          //      uploadURL: `${filesHandler?.uploadUrl.replace("/upload/resumable", "public/v1")}/${file.name}`,
          //    });
          //  } catch (err) {
          //    console.error("Error adding already-uploaded file:", err);
          //  }
        }
      },
    }),
  );
};

const uppy = new Uppy({
  meta: {
    bucketName,
    objectName: "",
    contentType: "",
  },
  restrictions: {
    maxNumberOfFiles: multiple ? fileLimit : 1,
  },
  autoProceed: auto,
});
uppy.on("upload-success", (file) => {
  if (!file) return;
  const path = `${file.meta.bucketName}/${file.name}`;
  if (context.multiple) {
    const current = Array.isArray(node._value) ? node._value : [];
    node.input([...current, path]);
  } else {
    node.input(path);
  }
});

node.context!._uppyPrepareUpload = async () => {
  // Only proceed if there are files to upload
  if (!auto && uppy.getFiles().some((f) => !f.progress.uploadComplete)) {
    await uppy.upload();
  }
};
uppy.on("file-removed", (file) => {
  const path = `${file.meta.bucketName}/${file.name}`;
  if (context.multiple) {
    node.input(
      Array.isArray(node._value) ? node._value.filter((v) => v !== path) : [],
    );
  } else {
    node.input("");
  }
});
uppy.on("file-added", (file) => {
  uppy.setFileMeta(file.id, {
    bucketName: "abchotels",
    objectName: file.name!, // or a custom path
    contentType: file.type!,
  });
});
// Supabase TUS upload configuration
uppy.use(Tus, {
  endpoint: urlFindResponse ? urlFindResponse.uploadUrl : "",
  chunkSize: 6 * 1024 * 1024, // Required: 6MB chunks
  uploadDataDuringCreation: true,
  removeFingerprintOnSuccess: true,
  retryDelays: [0, 3000, 5000, 10000, 20000],
  headers: {
    Authorization: `Bearer ${urlFindResponse ? urlFindResponse.token : ""}`,
    "x-upsert": "true",
  },
  onProgress: (bytesUploaded, bytesTotal) => {
    const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
    console.log(`${bytesUploaded}/${bytesTotal} (${percentage}%)`);
  },
});

// Optional plugins
uppy.use(Webcam);
uppy.use(ImageEditor, { quality: 0.8 });

// Cleanup
onBeforeUnmount(() => {
  uppy.destroy();
});
</script>
