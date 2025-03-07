<script setup lang="ts">
import { useI18n } from "vue-i18n";
import type { UserCreateUpdateRequest } from "@buf/ahmeddarwish_devkit-api.bufbuild_es/devkit/v1/accounts_user_pb";
import { AppForm } from "devkit-admin";
import type { AppFormSections } from "../../../devkit-admin/dist/types/pkg/types/types";
const { t } = useI18n()
const getYesterdayTodayTomorrow = () => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  return [yesterday, today, tomorrow];
}
const formSections: AppFormSections<any> = {
  'user_info': {
    isTitleHidden: true,
    isTransparent: true,
    inputs: [
      {
        $formkit: 'devkitMultiDropdown',
        options: 'cityListInput',
        filter: true,
        filterPlaceholder: 'search',
        prefixIcon: "tools",
        outerClass: "col-12 sm:col-6 md:col-5",
        responseOptionsKey: "options",
        name: "cityId",
        cacheKey: 'city',
        useLazy: true,
        debounceInMilliSeconds: 3000,
        placeholder: "city",
        label: t("city")
      },
      {
        $formkit: 'devkitMultiDropdown',
        options: 'locationListInput',
        filter: true,
        filterPlaceholder: 'search',
        dependsOn: "cityId",
        cacheKey: 'location',
        requestPropertyName: 'cityIds',
        prefixIcon: "tools",
        outerClass: "col-12 sm:col-6 md:col-5",
        name: "locationId",
        useLazy: true,
        debounceInMilliSeconds: 3000,
        placeholder: "locationName",
        createRoute: "/accounts/user/create",
        label: t("locationName")
      },
      {
        $formkit: 'devkitDatepicker',
        disabledDates: getYesterdayTodayTomorrow,
        name: "date",
        value: 20240302,
        convertToNumber: true,
        placeholder: "date",
        label: t("date")
      }

    ]
  }
}

</script>
<template>
  <AppForm
    :context="{ formKey: 'userCreateUdate', title: 'user create', submitHandler: { endpoint: 'userCreateUpdate' }, sections: formSections }">
  </AppForm>
</template>
