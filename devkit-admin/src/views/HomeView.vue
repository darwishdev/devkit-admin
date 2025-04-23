<!-- <script setup lang="ts"> -->
<!-- import { useI18n } from "vue-i18n"; -->
<!-- import type { AccountsSchemaUser, UserCreateUpdateRequest, UserListInputResponse, UserListRequest, UserListResponse } from "@buf/ahmeddarwish_devkit-api.bufbuild_es/devkit/v1/accounts_user_pb"; -->
<!-- import { ColumnText } from "@/app/datalistv2/columns/ColumnText"; -->
<!-- import { ColumnDate } from "@/app/datalistv2/columns/ColumnDate"; -->
<!-- import { type DatalistProps } from "../devkit_admin"; -->
<!---->
<!-- import Datalistv2 from "../app/datalistv2/Datalist.vue"; -->
<!---->
<!-- import type { AppFormSections } from "../../../devkit-admin/dist/types/pkg/types/types"; -->
<!-- import type { DatalistColumnsBase } from "../../../devkit-admin/dist/types/app/datalistv2/types"; -->
<!-- import { ObjectKeys, type StringUnkownRecord } from "devkit-apiclient"; -->
<!-- import type { ApiResponseList } from "../../../devkit-admin/dist/types/app/datalist/utilities/_apiTypes"; -->
<!-- import { apiClient } from "@/apiClient"; -->
<!-- import { h } from "vue"; -->
<!-- import { TimestampToDateString } from "@/pkg/utils/DateUtils"; -->
<!---->
<!-- const { t } = useI18n() -->
<!---->
<!-- const formSections: AppFormSections<UserCreateUpdateRequest> = { -->
<!--   'user_info': { -->
<!--     isTitleHidden: true, -->
<!--     isTransparent: true, -->
<!--     inputs: [ -->
<!--       { -->
<!--         $formkit: 'text', -->
<!--         prefixIcon: "tools", -->
<!--         outerClass: "col-12 sm:col-6 md:col-5", -->
<!--         name: "userName", -->
<!--         validation: "required", -->
<!--         placeholder: t("userName"), -->
<!--         label: t("userName") -->
<!--       }, -->
<!--       { -->
<!--         $formkit: 'text', -->
<!--         prefixIcon: "tools", -->
<!--         outerClass: "col-12 sm:col-6 md:col-5", -->
<!--         name: "userEmail", -->
<!--         validation: "required", -->
<!--         placeholder: t("userEmail"), -->
<!--         label: t("userEmail") -->
<!--       }, -->
<!--       { -->
<!--         $formkit: 'devkitDropdown', -->
<!--         options: 'userTypeListInput', -->
<!---->
<!--         optionValue: 'value', -->
<!--         optionLabel: 'label', -->
<!--         prefixIcon: "tools", -->
<!--         outerClass: "col-12 sm:col-6 md:col-5", -->
<!--         name: "userTypeId", -->
<!--         validation: "required", -->
<!--         placeholder: t("userTypeId"), -->
<!--         label: t("userTypeId") -->
<!--       }, -->
<!--       { -->
<!--         $formkit: 'text', -->
<!--         prefixIcon: "tools", -->
<!--         outerClass: "col-12 sm:col-6 md:col-5", -->
<!--         name: "userPassword", -->
<!--         validation: "required", -->
<!--         placeholder: t("userPassword"), -->
<!--         label: t("userPassword") -->
<!--       }, -->
<!--       { -->
<!--         $formkit: 'text', -->
<!--         prefixIcon: "tools", -->
<!--         outerClass: "col-12 sm:col-6 md:col-5", -->
<!--         name: "userPhone", -->
<!--         validation: "required", -->
<!--         placeholder: t("userPhone"), -->
<!--         label: t("userPhone") -->
<!--       }, -->
<!---->
<!--     ] -->
<!--   } -->
<!-- } -->
<!-- const columns: DatalistColumnsBase<AccountsSchemaUser> = { -->
<!--   userId: new ColumnText('userId', { -->
<!--     isSortable: true, -->
<!--     isGlobalFilter: true, -->
<!--     //router: viewRoute -->
<!--   }), -->
<!--   // -->
<!--   userName: new ColumnText('userName', { -->
<!--     isSortable: true, -->
<!--     isGlobalFilter: true, -->
<!--     filters: [{ -->
<!--       isGlobal: true, -->
<!--       matchMode: "contains", -->
<!--       input: { -->
<!--         $formkit: 'text', -->
<!--         prefixIcon: "tools", -->
<!--         outerClass: "col-12 sm:col-6 md:col-3", -->
<!--         name: "userName", -->
<!--         validation: '', -->
<!--         label: "userName", -->
<!--         placeholder: t("userName") -->
<!--       } -->
<!--     }] -->
<!--   }), -->
<!--   createdAt: new ColumnDate('createdAt', {}), -->
<!---->
<!-- } -->
<!---->
<!-- const rowIdentifier = 'userId' as const -->
<!-- const tableProps: DatalistProps<typeof apiClient, UserListRequest, AccountsSchemaUser, undefined, undefined, UserCreateUpdateRequest> = { -->
<!--   context: { -->
<!--     datalistKey: 'user', -->
<!--     title: "users", -->
<!--     rowIdentifier, -->
<!--     columns, -->
<!--     records: apiClient.userList, -->
<!--     viewRouter: { -->
<!--       name: 'user_find', -->
<!--       paramName: 'id', -->
<!--       paramColumnName: rowIdentifier, -->
<!--     }, -->
<!--     isServerSide: false, -->
<!--     isPresistFilters: true, -->
<!--     isExportable: true, -->
<!--     displayType: 'card', -->
<!--     isLazyFilters: true, -->
<!--     formSections, -->
<!--     isActionsDropdown: true, -->
<!--     options: { title: "asd", description: "asd" }, -->
<!--   } -->
<!-- } -->
<!---->
<!-- </script> -->
<script setup lang="ts">
import { DropdownContext, DropdownOptions } from '@/app/appform';
import { ApiEndpoint, EndpointFunction, StringUnkownRecord } from 'devkit-apiclient';
import { ref } from 'vue';

const optionsGetter: ApiEndpoint<any, any, any> = async (req: StringUnkownRecord) => {
	return { options: [{ label: 'a1', value: 1 }, { label: 'a2', value: 2 }] }
}
// cast it in the template
const formModel = ref({})
</script>

<template>
	{{ formModel }}
	<FormKit v-model="formModel" type="form">
		<FormKit type="text" name="name" value="Asd" label="name" />
		<FormKit dependsOn="asd" :multiple="true" :virtualScrollerOptions="{ lazy: true, itemSize: 50 }" filter
			type="devkitDropdown" optionLabel="iconName" optionValue="iconName" responseOptionsKey="icons"
			label="icon" cacheKey="icon" name="icon" :useLazy="true" options="iconList">
			<template #option="{ option, selected }">
				<div class="flex items-center" :class="{ 'selected': selected }">
					<AppIcon v-if="option.iconName" :icon="option.iconName" />
				</div>
			</template>
			<template #value="{ placeholder, value }">
				<AppIcon v-if="value" v-for="icon in value" :icon="icon" />
				<span v-else>{{ placeholder }}</span>
			</template>
		</FormKit>
	</FormKit>
</template>
