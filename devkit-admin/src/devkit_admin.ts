import { type App, type Plugin } from 'vue'
import AppForm from './app/appform/AppForm.vue';
import Dropdown from './app/appform/inputs/Dropdown.vue';
import MultiDropdown from './app/appform/inputs/MultiDropdown.vue';
import Datalist from './app/datalist/Datalist.vue';
import type { DatalistEmits, DatalistProps, DatalistSlots, PaginationParams } from './app/datalist/types';
import type { DevkitAdminConfig } from './pkg/types/types'
import * as adminTypes from './pkg/types/types';

// import { createPinia } from 'pinia'
import * as datalistTypes from './app/datalist/types'
import { DropdownContext, InputDropdownProps, InputDatepickerProps, DatepickerContext, InputMultiDropdownProps } from './app/appform/types';
export type { DropdownContext, InputDatepickerProps, DatepickerContext, InputDropdownProps, InputMultiDropdownProps, DevkitAdminConfig, DatalistEmits, DatalistProps, DatalistSlots, PaginationParams }
import Datepicker from './app/appform/inputs/Datepicker.vue';
import { ColumnText } from './app/datalist/columns/ColumnBase'
import DevkitAdminDB from './pkg/database/DB';
import { NumberToDate, DateToNumber } from './pkg/utils/DateUtils'

const db = new DevkitAdminDB()

export { db, NumberToDate, DateToNumber, Datepicker, Datalist, AppForm, Dropdown, MultiDropdown, datalistTypes, adminTypes, ColumnText }
const DevkitAdminPlugin: Plugin<DevkitAdminConfig<any>> = {
	install<TApi extends Record<string, Function>>(app: App, { apiClient, locales, iconFindApi }: DevkitAdminConfig<TApi>) {
		console.log("admin installed", app, apiClient, locales, iconFindApi)
	}
}
export default DevkitAdminPlugin

