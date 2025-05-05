<script setup lang="ts">
import { useI18n } from "vue-i18n";
import type {
  AccountsSchemaUser,
  UserListRequest,
} from "@buf/ahmeddarwish_devkit-api.bufbuild_es/devkit/v1/accounts_user_pb";
import Datalist, {
  DatalistColumnsBase,
  ColumnText,
  DatalistProps,
} from "@/app/datalist";
import { apiClient } from "@/apiClient";
import { AppFormSection } from "@/app/appform";
const { t } = useI18n();

const formSections: Record<string, AppFormSection> = {
  user_info: {
    isTitleHidden: true,
    isTransparent: true,
    inputs: [
      {
        $formkit: "text",
        prefixIcon: "tools",
        outerClass: "col-12 sm:col-6 md:col-5",
        name: "userName",
        validation: "required",
        placeholder: t("userName"),
        label: t("userName"),
      },
      {
        $formkit: "text",
        prefixIcon: "tools",
        outerClass: "col-12 sm:col-6 md:col-5",
        name: "userEmail",
        validation: "required",
        placeholder: t("userEmail"),
        label: t("userEmail"),
      },
      {
        $formkit: "text",
        prefixIcon: "tools",
        outerClass: "col-12 sm:col-6 md:col-5",
        name: "userPhone",
        placeholder: t("userPhone"),
        label: t("userPhone"),
      },
      {
        $formkit: "textarea",
        prefixIcon: "text",
        outerClass: "col-12 sm:col-6 md:col-7",
        name: "userDescription",
        placeholder: t("userDescription"),
        label: t("userDescription"),
      },
      {
        $formkit: "number",
        prefixIcon: "text",
        outerClass: "col-12 sm:col-6 md:col-7",
        name: "userSecurityLevel",
        number: "integer",
        placeholder: t("securityLevel"),
        label: t("userSecurityLevel"),
      },
    ],
  },
};
//const columns: DatalistColumns<AccountsSchemaUser> = {
//  userId: new ColumnText<AccountsSchemaUser>('userId', {
//    isSortable: true,
//    isGlobalFilter: true,
//    //router: viewRoute
//  }),
//  //
//  userName: new ColumnText('userName', {
//    isSortable: true,
//    isGlobalFilter: true,
//    filters: [{
//      matchMode: FilterMatchMode.CONTAINS,
//      input: {
//        $formkit: 'text',
//        prefixIcon: "tools",
//        outerClass: "col-12 sm:col-6 md:col-3",
//        name: "userName",
//        placeholder: t("userName")
//      }
//    }]
//  }),
//
//  createdAt: new ColumnText('createdAt', {
//    isSortable: true,
//    isGlobalFilter: true,
//    filters: [{
//      matchMode: FilterMatchMode.CONTAINS,
//      input: {
//        $formkit: 'text',
//        prefixIcon: "tools",
//        outerClass: "col-12 sm:col-6 md:col-3",
//        name: "userDescription",
//        placeholder: t("userDescription")
//      }
//    }]
//  }),
//}
const columns: DatalistColumnsBase<AccountsSchemaUser> = {
  userId: new ColumnText("userId", {}),
  userName: new ColumnText("userName", {}),
};

const tableProps: DatalistProps<
  typeof apiClient,
  UserListRequest,
  AccountsSchemaUser
> = {
  context: {
    datalistKey: "user",
    title: "users",
    rowIdentifier: "userId",
    //   columns,
    columns,
    records: apiClient.userList,
    isExportable: true,
    formSections,
    displayType: "table",
    options: { title: "asd", description: "asd" },
  },
};
</script>
<template>
  <Datalist :context="tableProps.context"> </Datalist>
</template>
