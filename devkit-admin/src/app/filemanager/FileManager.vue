<script setup lang="ts" generic="
    TApi extends Record<string, Function>,
">
import { ref, inject } from "vue";
import Datalist, { useDatalistStoreWithProps, type DatalistProps } from '@/app/datalist/'
import { AppBtn } from "devkit-base-components";
import { bucketInput, bucketsForm } from "./schemas";
import { FilesHandler } from "@/pkg/types/types";
import {
	BucketCreateUpdateRequest,
	FileListRequest,
	FileObject, FileListResponse
} from "@/pkg/types/api_types";
import { resolveApiEndpoint, StringUnkownRecord } from "devkit-apiclient";

const fileInput = ref<HTMLInputElement | null>(null);
const apiClient = inject<TApi>('apiClient')
const filesHandler = inject<FilesHandler<TApi>>('filesHandler')
const datalistProps: DatalistProps<
	TApi,
	FileListRequest,
	FileObject,
	FileListRequest,
	FileListResponse,
	BucketCreateUpdateRequest
> | undefined = !filesHandler ? undefined : {
	context: {
		datalistKey: "files",
		hideShowDeleted: true,
		title: "files",
		formSections: bucketsForm,
		rowIdentifier: "id",
		filters: [bucketInput],
		records: filesHandler.fileList,
		isServerSide: true,
		isPresistFilters: true,
		displayType: "card",
		isLazyFilters: false,
		isActionsDropdown: true,
		options: { title: "asd", description: "asd" },
	},
}


const datalistStore = !datalistProps ? undefined : useDatalistStoreWithProps(datalistProps);
// Drag and drop handlers
// File upload function
const uploadFiles = async (files: FileList) => {
	if (!datalistStore || !filesHandler) return
	console.log("uploading", files);

		console.log("reader is ", datalistStore.filtersFormStore.formValue, filesHandler)
	try {
		const file = files[0];
		const filePath = file.name; // Adjust based on your needs
		const fileType = file.type;

		console.log("reader is ", datalistStore.filtersFormStore.formValue, filesHandler)
		const filtersFormValue = datalistStore.filtersFormStore.formValue;

		if (!filtersFormValue || !("bucketId" in filtersFormValue)) return;
		const bucketName = filtersFormValue.bucketId;

		console.log("reader is ", bucketName, filesHandler)
		if (!bucketName) return;
		const reader = new FileReader();

		console.log("reader is ", filesHandler)
		reader.onload = () => {
			if (reader.result instanceof ArrayBuffer) {
				console.log("reader is ", filesHandler)
				const fileRequest = {
					path: filePath,
					bucketName: bucketName as string,
					reader: new Uint8Array(reader.result),
					fileType: fileType,
				};
				resolveApiEndpoint(filesHandler.fileCreate, apiClient, fileRequest).then((response) => {
					datalistStore.datalistQueryResult.refetch();
					console.log("response", response);
				});
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
const createSubmitted = (value : StringUnkownRecord) => {
	if(!datalistStore) return
datalistStore.filtersFormStore.refetchDropdownInput('bucketId')
	console.log("submitted value is " , value)
}
</script>
<template>
	<div v-if="!filesHandler || !datalistProps"> files handler is not passed on config</div>
	<div v-else class="buckets">
		<input type="file" ref="fileInput" @change="handleFileChange" style="display: none" />
		<Datalist :context="datalistProps.context" @create:submited="createSubmitted">
			<template #card="{ data }">
				<AppImage :src="data.name" class="w-150" />
			</template>
			<template #globalActionsStartAppend>
				<AppBtn :action="openUploadDialog" label="upload" />
			</template>
		</Datalist>
	</div>
</template>
