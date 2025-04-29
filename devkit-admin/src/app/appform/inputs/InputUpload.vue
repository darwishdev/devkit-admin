< <script lang="ts" setup generic="
    TApi extends Record<string, Function>,
    TOptionsReq extends StringUnkownRecord,
    TOptionsResp extends StringUnkownRecord = DropdownOptions,
    TComponentType extends 'single' | 'multi' | 'button' = 'single'
  ">
  import { FileObject } from "@/pkg/types/api_types";
  import { StringUnkownRecord } from "devkit-apiclient";
  import { InputUploadProps, DropdownOptions } from "./types";
  import FileUpload, {
    FileUploadSelectEvent,
    FileUploadUploadEvent,
  } from "primevue/fileupload";
  import { h, inject, ref } from "vue";
  import { usePrimeVue } from "primevue/config";
  import Button from "primevue/button";
  import InputUploadDialog from "./InputUploadDialog.vue";
  import { useDialog } from "primevue";

  //const toast = useToast();

  const props = defineProps<InputUploadProps>();
  const totalSize = ref(0);
  const totalSizePercent = ref(0);
  const files = ref<File[]>([]);

  // Emit types
  const emit = defineEmits<{ (e: "valueChange", value: unknown): void }>();

  // Helper function to format file size
  const formatSize = (bytes: number): string => {
    const k = 1024;
    const dm = 3;
    const sizes: string[] = [""];

    if (bytes === 0) {
      return `0 ${sizes[0]}`;
    }

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

    return `${formattedSize} ${sizes[i]}`;
  };

  // Handle removing a file
  const onRemoveTemplatingFile = (
    file: File,
    removeFileCallback: (index: number) => void,
    index: number,
  ): void => {
    removeFileCallback(index);
    totalSize.value -= file.size;
    totalSizePercent.value = totalSize.value / 10;
  };

  // Clear all selected files
  const onClearTemplatingUpload = (clear: () => void): void => {
    clear();
    totalSize.value = 0;
    totalSizePercent.value = 0;
  };

  // When files are selected
  const onSelectedFiles = (event: FileUploadSelectEvent): void => {
    files.value = event.files as File[];
    files.value.forEach((file) => {
      totalSize.value += file.size;
    });
  };
  const dialog = useDialog();
  const openGallery = () => {
    console.log("should open gallery");
    dialog.open(
      h(InputUploadDialog, {
        onChoose: (file) => {
          console.log("choosen file is ", file);
        },
      }),
    );
    //dialog.open(h(FileManager));
  };
  // Upload action
  const uploadEvent = (callback: () => void): void => {
        totalSizePercent.value = totalSize.value / 10;
        callback();
        };

        // On successful upload
        const onTemplatedUpload = (event: FileUploadUploadEvent): void => {
        console.log("this is the upload evenet here", event);
        //toast.add({
        //severity: "info",
        //summary: "Success",
        //detail: "File Uploaded",
        //life: 3000,
        //});
        };
        </script>
        <template>
          <div class="card">
            <FileUpload name="demo[]" url="/api/upload" @upload="onTemplatedUpload($event)" :multiple="true"
              accept="image/*" :maxFileSize="1000000" @select="onSelectedFiles">
              <template #header="{ chooseCallback, uploadCallback, clearCallback, files }">
                <div class="flex flex-wrap justify-between items-center flex-1 gap-4">
                  <div class="flex gap-2">
                    <Button @click="chooseCallback()" icon="pi pi-images" rounded outlined severity="secondary"
                      label="choose file"></Button>
                    <!-- <AppBtn label="upload" :action="() => uploadEvent(uploadCallback)" icon="pi pi-cloud-upload" rounded -->
                    <!--   outlined severity="success" :disabled="!files || files.length === 0"></AppBtn> -->
                    <Button @click="clearCallback()" label="clear" icon="pi pi-times" rounded outlined severity="danger"
                      :disabled="!files || files.length === 0"></Button>

                    <Button @click="openGallery" icon="pi pi-times" rounded outlined severity="success">open from
                      gallery</Button>
                  </div>
                  <ProgressBar :value="totalSizePercent" :showValue="false" class="md:w-20rem h-1 w-full md:ml-auto">
                    <span class="whitespace-nowrap">{{ totalSize }}B / 1Mb</span>
                  </ProgressBar>
                </div>
              </template>
              <template #content="{
                files,
                uploadedFiles,
                removeUploadedFileCallback,
                removeFileCallback,
              }">
                <div class="flex flex-col gap-8 pt-4">
                  <div v-if="files.length > 0">
                    <h5>Pending</h5>
                    <div class="flex flex-wrap gap-4">
                      <div v-for="(file, index) of files" :key="file.name + file.type + file.size"
                        class="p-8 rounded-border flex flex-col border border-surface items-center gap-4">
                        <div>
                          <img role="presentation" :alt="file.name" :src="file.objectURL" width="100" height="50" />
                        </div>
                        <span class="font-semibold text-ellipsis max-w-60 whitespace-nowrap overflow-hidden">{{
                          file.name }}</span>
                        <div>{{ formatSize(file.size) }}</div>
                        <Badge value="Pending" severity="warn" />
                        <Button icon="pi pi-times" @click="
                          onRemoveTemplatingFile(file, removeFileCallback, index)
                          " outlined rounded severity="danger" />
                      </div>
                    </div>
                  </div>

                  <div v-if="uploadedFiles.length > 0">
                    <h5>Completed</h5>
                    <div class="flex flex-wrap gap-4">
                      <div v-for="(file, index) of uploadedFiles" :key="file.name + file.type + file.size"
                        class="p-8 rounded-border flex flex-col border border-surface items-center gap-4">
                        <div>
                          <img role="presentation" :alt="file.name" :src="file.objectURL" width="100" height="50" />
                        </div>
                        <span class="font-semibold text-ellipsis max-w-60 whitespace-nowrap overflow-hidden">{{
                          file.name }}</span>
                        <div>{{ formatSize(file.size) }}</div>
                        <Badge value="Completed" class="mt-4" severity="success" />
                        <Button icon="pi pi-times" @click="removeUploadedFileCallback(index)" outlined rounded
                          severity="danger" />
                      </div>
                    </div>
                  </div>
                </div>
              </template>
              <template #empty>
                <div class="flex items-center justify-center flex-col">
                  <i class="pi pi-cloud-upload !border-2 !rounded-full !p-8 !text-4xl !text-muted-color" />
                  <p class="mt-6 mb-0">Drag and drop files to here to upload.</p>
                </div>
              </template>
            </FileUpload>
          </div>
        </template>
