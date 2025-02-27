import { createApp } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
//import './assets/css/app.css'
import PrimeVue from 'primevue/config';

import ToastService from 'primevue/toastservice';
import { rootClasses } from './formkit.theme'
import router from './routes';
import { createI18n } from 'vue-i18n'
import { QueryClient } from '@tanstack/vue-query'
import { DialogService } from 'primevue';
import { createPinia } from 'pinia'
import 'devkit-base-components/style';
import { plugin, defaultConfig } from '@formkit/vue'
import App from './App.vue';
import { apiClient } from './apiClient';
import DevkitBaseComponentsPlugin, { DevkitBaseConfig } from 'devkit-base-components';
const pinia = createPinia()
const app = createApp(App)
app.use(router)
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 5 * 60 * 1000, // 5 minutes
		},

	},
})
app.use(VueQueryPlugin, {
	queryClient
})
const formktiConfig = {
	config: {
		rootClasses
	}
}
app.use(pinia)
app.use(ToastService)
app.use(DialogService)
app.use(plugin, defaultConfig(formktiConfig))
const i18n = createI18n({
	locale: 'en',
	fallbackLocale: 'en',
	messages: {
		en: {
			hello: "hello"
		},
		ar: {
			hello: "اهلا"
		}
	}
})
const baseConfig: DevkitBaseConfig<typeof apiClient> = {
	apiClient,
	locales: ['en', 'ar'],
	iconFindApi: 'iconFind'
}
app.use(PrimeVue, {
	theme: 'none'
}).use(i18n)
	.use(DevkitBaseComponentsPlugin, baseConfig)
	.mount('#app')
