<script setup lang="ts">
import Datalist, {
  ColumnText,
  type DatalistColumnsBase,
  type DatalistProps,
  ColumnImage,
} from "@/app/datalist";

import { AppFormSection, AppFormSections } from "@/app/appform";
import { useI18n } from "vue-i18n";
import { apiClient } from "@/apiClient";
import {
  type PartialCreateUpdateRequest,
  type PartialListRequest,
  type TenantsSchemaPartial,
} from "@buf/ahmeddarwish_devkit-api.community_timostamm-protobuf-ts/devkit/v1/tenant_partial_pb";
import LoginForm from "@/app/appform/components/LoginForm.vue";
import FileManager from "@/app/filemanager/FileManager.vue";
import { AppBtn } from "devkit-base-components";
const login = () => {
  apiClient
    .authLogin({
      userPassword: "123456",
      loginCode: "heba@abchotels-eg.com",
    })
    .then((r) => {
      console.log(r);
    });
};

const logout = () => {
  apiClient.authLogout({}).then((r) => {
    console.log(r);
  });
};
const refresh = () => {
  apiClient.authRefreshToken({}).then((r) => {
    console.log(r);
  });
};
const callCreate = () => {
  const reqss: Partial<PartialCreateUpdateRequest> = {
    partialId: 1,
    sectionId: 1,
    uploads: {
      // files: [{}],
    },
    partialTypeId: 1,
    partialName: "new",
  };
  apiClient.partialCreateUpdate(reqss).then(console.log);
};
const { t } = useI18n();
const formSections: AppFormSections<PartialCreateUpdateRequest> = {
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
        label: t("partialName"),
        placeholder: t("partialName"),
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
        label: t("partialTypeId"),
        placeholder: t("partialTypeId"),
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
        label: t("sectionListInpt"),
        placeholder: t("sectionListInpt"),
      },
      {
        $formkit: "devkitUpload",
        bucketName: "abchotels",
        outerClass: "col-12 sm:col-6 md:col-4",
        name: "partialImage",
        auto: false,
        label: t("partialImage"),
        placeholder: t("partialImage"),
      },
      {
        $formkit: "devkitUpload",
        prefixIcon: "image",
        auto: false,
        fileLimit: 3,
        bucketName: "abchotels",
        multiple: true,
        outerClass: "col-12 sm:col-6 md:col-4",
        name: "partialImages",
        label: t("partialImages"),
        placeholder: t("partialImages"),
      },
      // {
      //   $formkit: "devkitEditor",
      //   prefixIcon: "file-text",
      //   outerClass: "col-12 sm:col-6 md:col-4",
      //   name: "partialBrief",
      //   label: t("partialBrief"),
      //   placeholder: t("partialBrief"),
      // },
      // {
      //   $formkit: "devkitEditor",
      //   prefixIcon: "file-text",
      //   outerClass: "col-12 sm:col-6 md:col-4",
      //   name: "partialContent",
      //   label: t("partialContent"),
      //   placeholder: t("partialContent"),
      // },
      {
        $formkit: "text",
        prefixIcon: "tag",
        outerClass: "col-12 sm:col-6 md:col-4",
        name: "partialButtonLabel",
        label: t("partialButtonLabel"),
        placeholder: t("partialButtonLabel"),
      },
      {
        $formkit: "text",
        prefixIcon: "link",
        outerClass: "col-12 sm:col-6 md:col-4",
        name: "partialButtonLink",
        label: t("partialButtonLink"),
        placeholder: t("partialButtonLink"),
      },
      {
        $formkit: "text",
        prefixIcon: "map-pin",
        outerClass: "col-12 sm:col-6 md:col-4",
        name: "address",
        label: t("address"),
        placeholder: t("address"),
      },
      {
        $formkit: "text",
        prefixIcon: "link",
        outerClass: "col-12 sm:col-6 md:col-4",
        name: "partialLink",
        label: t("partialLink"),
        placeholder: t("partialLink"),
      },
      // Note: partialLinks is a map type and might need a custom component or different handling
    ],
  },
};

const columns: DatalistColumnsBase<TenantsSchemaPartial> = {
  partialId: new ColumnText("partialId", {
    isSortable: true,
  }),
  partialName: new ColumnText("partialName", {
    isSortable: true,
    isGlobalFilter: true,
    filters: [
      {
        isGlobal: true,
        matchMode: "contains",
        input: {
          $formkit: "text",
          prefixIcon: "search",
          outerClass: "col-12 sm:col-6 md:col-3",
          name: "partialName",
          label: t("partialName"),
          placeholder: t("partialName"),
        },
      },
    ],
  }),

  partialImage: new ColumnImage("partialImage", {}),
};

const rowIdentifier = "partialId" as const;

const tableProps: DatalistProps<
  typeof apiClient,
  PartialListRequest,
  TenantsSchemaPartial,
  undefined,
  undefined,
  PartialCreateUpdateRequest
> = {
  context: {
    datalistKey: "tenant-partials",
    title: t("tenantPartials"),
    rowIdentifier,
    columns,
    records: apiClient.partialList,
    filters: [
      {
        matchMode: "in",
        input: {
          $formkit: "devkitDropdown",
          prefixIcon: "list-ordered",
          multiple: true,
          options: "partialTypeListInput",
          optionValue: "value",
          optionLabel: "label",
          cacheKey: "partialTypeId",
          outerClass: "col-12 sm:col-6 md:col-4",
          name: "partialTypeId",
          label: t("partialTypeId"),
          placeholder: t("partialTypeId"),
        },
      },
    ],
    isLazyFilters: true,
    formSections,
    options: {
      title: t("tenantPartials"),
      description: t("Manage all tenant section partials"),
    },
  },
};
</script>

<template>
  <Datalist :context="tableProps.context" />

  <!-- <LoginForm /> -->
  <!-- <FileManager /> -->
  <!-- <AppBtn :action="login" label="re" /> -->
  <!-- <AppBtn :action="refresh" label="lo" /> -->
  <!-- <AppBtn :action="refresh" label="loo" /> -->
</template>
