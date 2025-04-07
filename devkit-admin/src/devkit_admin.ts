import { type App, type Plugin } from 'vue'
import type { DevkitAdminConfig } from './pkg/types/types'
import * as adminTypes from './pkg/types/types';
export type { DevkitAdminConfig }
import Datepicker from './app/appform/inputs/Datepicker.vue';
import DevkitAdminDB from './pkg/database/DB';
import { NumberToDate, DateToNumber } from './pkg/utils/DateUtils'

const db = new DevkitAdminDB()

export { db,  NumberToDate, DateToNumber,  Datepicker,    adminTypes}
const DevkitAdminPlugin: Plugin<DevkitAdminConfig<Record<string, Function>>> = {
	install<TApi extends Record<string, Function>>(app: App, { apiClient, locales, iconFindApi }: DevkitAdminConfig<TApi>) {
		console.log("admin installed", app, apiClient, locales, iconFindApi)
	}
}
export default DevkitAdminPlugin

