<script setup lang="ts">
import { apiClient } from "@/apiClient";
import AppForm, { AppFormProps } from "@/app/appform";
import FileManager from "@/app/filemanager/FileManager.vue";
import {
  PartialCreateUpdateRequest,
  PartialCreateUpdateResponse,
} from "@buf/ahmeddarwish_devkit-api.bufbuild_es/devkit/v1/tenant_partial_pb";
import { FormKit } from "@formkit/vue";
import { ref } from "vue";
const model = ref({});
const submit = (req) => {
  console.log("Req is", req);
};
const formProps: AppFormProps<
  typeof apiClient,
  PartialCreateUpdateRequest,
  PartialCreateUpdateRequest,
  PartialCreateUpdateResponse
> = {
  context: {
    formKey: "partial",
    title: "partial",
    submitHandler: {
      endpoint: "partialCreateUpdate",
    },
    sections: {
      partial_info: {
        isTitleHidden: true,
        isTransparent: true,
        inputs: [
          {
            $formkit: "text",
            prefixIcon: "edit",
            outerClass: "col-12 sm:col-6 md:col-4",
            name: "partialName",
            validation: "required",
            label: "partialName",
          },
          {
            $formkit: "devkitDropdown",
            prefixIcon: "list-ordered",
            options: "partialTypeListInput",
            optionValue: "value",
            optionLabel: "label",
            outerClass: "col-12 sm:col-6 md:col-4",
            name: "partialTypeId",
            validation: "required",
            label: "partialTypeId",
          },
          {
            $formkit: "devkitDropdown",
            prefixIcon: "list-ordered",
            options: apiClient.sectionListInpt,
            optionValue: "value",
            optionLabel: "label",
            outerClass: "col-12 sm:col-6 md:col-4",
            name: "sectionId",
            validation: "required",
            label: "sectionListInpt",
          },
          {
            $formkit: "devkitUpload",
            prefixIcon: "image",
            auto: false,
            outerClass: "col-12 sm:col-6 md:col-4",
            multiple: false,
            bucketName: "images",
            name: "partialImage",
            label: "partialImage",
          },

          {
            $formkit: "devkitUpload",
            prefixIcon: "image",
            auto: true,
            outerClass: "col-12 sm:col-6 md:col-4",
            bucketName: "images",
            name: "partialImages",
            label: "partialImages",
            multiple: true,
          },
          // Note: partialLinks is a map type and might need a custom component or different handling
        ],
      },
    },
  },
};
</script>
<template>
  <AppForm :context="formProps.context" />
  <!-- <FileManager /> -->
</template>
