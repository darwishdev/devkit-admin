<script setup lang="ts">
import { useI18n } from "vue-i18n";
import Checkbox from 'primevue/checkbox';
import type { AccountsSchemaUser, UserListRequest } from "@buf/ahmeddarwish_devkit-api.bufbuild_es/devkit/v1/accounts_user_pb";
import { Datalist, type DatalistProps, ColumnText } from "devkit-admin";
import { apiClient } from "../api/apiClient";
import type { DatalistColumns } from "../../../devkit-admin/dist/types/app/datalist/columns/_types";
import type { AppFormSection } from "../../../devkit-admin/dist/types/pkg/types/types";
import { ref } from 'vue';

const { t } = useI18n()

const checked = ref(false);
const formSections: Record<string, AppFormSection> = {
  'user_info': {
    isTitleHidden: true,
    isTransparent: true,
    inputs: [
      {
        $formkit: 'text',
        prefixIcon: "tools",
        outerClass: "col-12 sm:col-6 md:col-5",
        name: "userName",
        validation: "required",
        placeholder: t("userName"),
        label: t("userName")
      },
    ]
  }
}
const columns: DatalistColumns<AccountsSchemaUser> = {
  userId: new ColumnText<AccountsSchemaUser>('userId', {
    isSortable: true,
    isGlobalFilter: true,
    //router: viewRoute
  }),
  //
  userName: new ColumnText('userName', {
    isSortable: true,
    isGlobalFilter: true,
    filters: [{
      matchMode: "contains",
      input: {
        $formkit: 'text',
        prefixIcon: "tools",
        outerClass: "col-12 sm:col-6 md:col-3",
        name: "userName",
        placeholder: t("userName")
      }
    }]
  }),

  createdAt: new ColumnText('createdAt', {
    isSortable: true,
    isGlobalFilter: true,
  }),
}


const tableProps: DatalistProps<UserListRequest, AccountsSchemaUser> = {
  context: {
    datalistKey: 'user',
    title: "users",
    rowIdentifier: "userId",
    filters: [{
      matchMode: "contains",
      input: {
        $formkit: 'text',
        prefixIcon: "tools",
        outerClass: "col-12 sm:col-6 md:col-3",
        name: "userName",
        placeholder: t("userName")
      }
    }],
    columns,
    records: apiClient.userList,
    isServerside: false,
    exportable: true,
    displayType: 'table',
    useLazyFilters: true,
    formSections,
    isActionsDropdown: true,
    options: { title: "asd", description: "asd" },
  }
}

</script>
<template>
  <h2>
    asd
  </h2>
  <Checkbox v-model="checked" label="asdasdasdasdasd" />
  <Datalist :context="tableProps.context">
  </Datalist>
</template>
