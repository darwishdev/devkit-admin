<script setup lang="ts">
//import { useI18n } from "vue-i18n";
//import type {
//  AccountsSchemaUser,
//  UserListRequest,
//} from "@buf/ahmeddarwish_devkit-api.bufbuild_es/devkit/v1/accounts_user_pb";
//import { ColumnText, DatalistProps } from "@/devkit_admin";
//import { apiClient } from "@/apiClient";
//import Datalist from "@/app/datalist/Datalist.vue";
//import { AppFormSection } from "@/pkg/types/types";
//import { DatalistColumns } from "@/app/datalist/columns/_types";
//const { t } = useI18n();
//const columns: DatalistColumns<AccountsSchemaUser> = {
//  userId: new ColumnText<AccountsSchemaUser>("userId", {
//    isSortable: true,
//    isGlobalFilter: true,
//    //router: viewRoute
//  }),
//  //
//  userName: new ColumnText("userName", {
//    isSortable: true,
//    isGlobalFilter: true,
//    filters: [
//      {
//        matchMode: "contains",
//        input: {
//          $formkit: "text",
//          prefixIcon: "tools",
//          outerClass: "col-12 sm:col-6 md:col-3",
//          name: "userName",
//          placeholder: t("userName"),
//        },
//      },
//    ],
//  }),

//  createdAt: new ColumnText("createdAt", {
//    isSortable: true,
//    isGlobalFilter: true,
//  }),
//};

//const formSections: Record<string, AppFormSection> = {
//  user_info: {
//    isTitleHidden: true,
//    isTransparent: true,
//    inputs: [
//      {
//        $formkit: "text",
//        prefixIcon: "tools",
//        outerClass: "col-12 sm:col-6 md:col-5",
//        name: "userName",
//        validation: "required",
//        placeholder: t("userName"),
//        label: t("userName"),
//      },
//      {
//        $formkit: "text",
//        prefixIcon: "tools",
//        outerClass: "col-12 sm:col-6 md:col-5",
//        name: "userEmail",
//        validation: "required",
//        placeholder: t("userEmail"),
//        label: t("userEmail"),
//      },
//      {
//        $formkit: "text",
//        prefixIcon: "tools",
//        outerClass: "col-12 sm:col-6 md:col-5",
//        name: "userPhone",
//        placeholder: t("userPhone"),
//        label: t("userPhone"),
//      },
//      {
//        $formkit: "textarea",
//        prefixIcon: "text",
//        outerClass: "col-12 sm:col-6 md:col-7",
//        name: "userDescription",
//        placeholder: t("userDescription"),
//        label: t("userDescription"),
//      },
//      {
//        $formkit: "number",
//        prefixIcon: "text",
//        outerClass: "col-12 sm:col-6 md:col-7",
//        name: "userSecurityLevel",
//        number: "integer",
//        placeholder: t("securityLevel"),
//        label: t("userSecurityLevel"),
//      },
//    ],
//  },
//};

//const tableProps: DatalistProps<UserListRequest, AccountsSchemaUser> = {
//  context: {
//    datalistKey: "user",
//    title: "users",
//    rowIdentifier: "userId",
//    formSections,
//    filters: [
//      {
//        matchMode: "contains",
//        input: {
//          $formkit: "text",
//          prefixIcon: "tools",
//          outerClass: "col-12 sm:col-6 md:col-3",
//          name: "userName",
//          validation: "required",
//          placeholder: t("userName"),
//        },
//      },
//    ],
//    //columns,
//    execludedColumns: ["$typeName"],
//    records: "userList",
//    isServerside: false,
//    exportable: true,
//    displayType: "table",
//    useLazyFilters: true,
//    isActionsDropdown: true,
//    options: { title: "asd", description: "asd" },
//  },
//};
</script>
<template>
  <!-- <h2>asd</h2> -->
  <!-- <AppBtn label="asd" action="asd" /> -->
  <!-- <Datalist :context="tableProps.context"> -->
  <!--   <template #column.userName="{ data }"> -->
  <!--     {{ data.userName }} -->
  <!--   </template> -->
  <!-- </Datalist> -->
</template>
