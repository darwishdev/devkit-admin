import { type App, type Plugin } from 'vue'
import AppForm from './app/appform/AppForm.vue';
import Dropdown from './app/appform/inputs/Dropdown.vue';
import SelectButton from './app/appform/inputs/SelectButton.vue';

// import { useDatalistStoreWithKey } from "./app/datalist/store/DatalisStore";
import MultiDropdown from './app/appform/inputs/MultiDropdown.vue';
import Datalistv2 from './app/datalistv2/Datalist.vue';
import { useDatalistStoreWithKey , useDatalistStoreWithProps } from './app/datalistv2/store/DatalistStore'
import Datalist from './app/datalist/Datalist.vue';
import type { DatalistProps, DatalistSlots, PaginationParams } from './app/datalistv2/types';
import type { DevkitAdminConfig } from './pkg/types/types'
import * as adminTypes from './pkg/types/types';

// import { createPinia } from 'pinia'
import * as datalistTypes from './app/datalist/types'
import { DropdownContext, InputDropdownProps, InputDatepickerProps, DatepickerContext, InputMultiDropdownProps } from './app/appform/types';
export type { DropdownContext, InputDatepickerProps, DatepickerContext, InputDropdownProps, InputMultiDropdownProps, DevkitAdminConfig,  DatalistProps, DatalistSlots, PaginationParams }
import Datepicker from './app/appform/inputs/Datepicker.vue';
import { ColumnText } from './app/datalistv2/columns/ColumnText'
import { ColumnDate } from './app/datalistv2/columns/ColumnDate'
import DevkitAdminDB from './pkg/database/DB';
import { NumberToDate, DateToNumber } from './pkg/utils/DateUtils'

const db = new DevkitAdminDB()

export { db, ColumnDate,useDatalistStoreWithProps, Datalistv2, useDatalistStoreWithKey, NumberToDate, DateToNumber, SelectButton, Datepicker, Datalist, AppForm, Dropdown, MultiDropdown, datalistTypes, adminTypes, ColumnText }
const DevkitAdminPlugin: Plugin<DevkitAdminConfig<any>> = {
	install<TApi extends Record<string, Function>>(app: App, { apiClient, locales, iconFindApi }: DevkitAdminConfig<TApi>) {
		console.log("admin installed", app, apiClient, locales, iconFindApi)
	}
}
export default DevkitAdminPlugin

