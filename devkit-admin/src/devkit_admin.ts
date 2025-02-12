import { type App, type Plugin } from 'vue'
import Datalist from './app/datalist/Datalist.vue';
import type { DatalistEmits, DatalistProps, DatalistSlots, PaginationParams } from './app/datalist/types';
import type { DevkitAdminConfig } from './pkg/types/types'
import * as adminTypes from './pkg/types/types';

import { createPinia } from 'pinia'
import * as datalistTypes from './app/datalist/types'
export type { DevkitAdminConfig, DatalistEmits, DatalistProps, DatalistSlots, PaginationParams }

import { ColumnText } from './app/datalist/columns/ColumnBase'
export { Datalist, datalistTypes, adminTypes, ColumnText }

const DevkitAdminPlugin: Plugin<DevkitAdminConfig<any>> = {
	install<TApi extends Record<string, Function>>(app: App, { apiClient, locales, iconFindApi }: DevkitAdminConfig<TApi>) {
		console.log("admin installed", app, apiClient, locales, iconFindApi)
	}
}
export default DevkitAdminPlugin

