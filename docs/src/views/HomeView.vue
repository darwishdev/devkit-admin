<script setup lang="ts">
import type { AppFormSections } from "devkit-admin/form";
import Datalist, {
  ColumnText,
  type DatalistColumnsBase,
  type DatalistProps,
  ColumnImage,
} from "devkit-admin/datalist";

import { useI18n } from "vue-i18n";
import type {
  PartialCreateUpdateRequest,
  PartialListRequest,
  TenantsSchemaPartial,
} from "@buf/ahmeddarwish_devkit-api.bufbuild_es/devkit/v1/tenant_partial_pb";
import { apiClient } from "../api/apiClient";
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
        options: "sectionListInpt",
        optionValue: "value",
        optionLabel: "label",
        outerClass: "col-12 sm:col-6 md:col-4",
        name: "sectionId",
        validation: "required",
        label: t("sectionListInpt"),
        placeholder: t("sectionListInpt"),
      },
      // {
      //   $formkit: "devkitUpload",
      //   prefixIcon: "image",
      //   outerClass: "col-12 sm:col-6 md:col-4",
      //   name: "partialImage",
      //   label: t("partialImage"),
      //   placeholder: t("partialImage"),
      // },
      {
        $formkit: "file",
        prefixIcon: "image",
        multiple: true,
        outerClass: "col-12 sm:col-6 md:col-4",
        name: "partialImages",
        label: t("partialImage"),
        placeholder: t("partialImage"),
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
      // $formkit: "devkitEditor",
      // prefixIcon: "file-text",
      // outerClass: "col-12 sm:col-6 md:col-4",
      // name: "partialContent",
      // label: t("partialContent"),
      // placeholder: t("partialContent"),
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
          useButtons: true,
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
</template>
<style>
.p-datatable img {
  max-width: 200px !important;
}

.p-datatable-header .d-flex {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--gap);
}

.global-actions {
  display: flex;
  gap: var(--gap);
}
</style>
