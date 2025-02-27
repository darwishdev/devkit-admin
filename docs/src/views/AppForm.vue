<script setup lang="ts">
import { useI18n } from "vue-i18n";
import type { UserCreateUpdateRequest } from "@buf/ahmeddarwish_devkit-api.bufbuild_es/devkit/v1/accounts_user_pb";
import { AppForm } from "devkit-admin";
import type { AppFormSections } from "../../../devkit-admin/dist/types/pkg/types/types";
const { t } = useI18n()
const formSections: AppFormSections<any> = {
  'user_info': {
    isTitleHidden: true,
    isTransparent: true,
    inputs: [
      {
        $formkit: 'devkitDropdown',
        options: 'cityListInput',
        filter: true,
        filterPlaceholder: 'search',
        prefixIcon: "tools",
        outerClass: "col-12 sm:col-6 md:col-5",
        name: "cityId",
        cacheKey: 'city',
        useLazy: true,
        debounceInMilliSeconds: 3000,
        placeholder: "city",
        createRoute: "/properties/city/create",
        label: t("city")
      },
      {
        $formkit: 'devkitDropdown',
        options: 'locationListInput',
        filter: true,
        filterPlaceholder: 'search',
        dependsOn: "cityId",
        cacheKey: 'location',
        requestPropertyName: 'cityId',
        prefixIcon: "tools",
        outerClass: "col-12 sm:col-6 md:col-5",
        name: "locationId",
        useLazy: true,
        debounceInMilliSeconds: 3000,
        placeholder: "locationName",
        createRoute: "/accounts/user/create",
        label: t("locationName")
      },
    ]
  }
}

</script>
<template>
  <AppForm
    :context="{ formKey: 'userCreateUdate', title: 'user create', submitHandler: { endpoint: 'userCreateUpdate' }, sections: formSections }">
  </AppForm>
</template>
