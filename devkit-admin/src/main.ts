import { createApp } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import './assets/css/app.css'
import PrimeVue from 'primevue/config';

import ToastService from 'primevue/toastservice';
import { rootClasses } from './formkit.theme'
import router from './routes';
import { createI18n } from 'vue-i18n'
import { QueryClient } from '@tanstack/vue-query'
import { DialogService } from 'primevue';
import { createPinia } from 'pinia'

import DevkitAdminPlugin, { DevkitAdminConfig } from '@/devkit_admin';
import 'devkit-base-components/style';
import { plugin } from '@formkit/vue'

import { formKitConfig } from '@/app/appform'
import App from './App.vue';
import { apiClient } from './apiClient';
import DevkitBaseComponentsPlugin, { DevkitBaseConfig } from 'devkit-base-components';
import { useDialog } from 'primevue';
import { create } from '@bufbuild/protobuf';
import { FileCreateBulkRequestSchema, FileCreateRequestSchema } from '@buf/ahmeddarwish_devkit-api.bufbuild_es/devkit/v1/public_storage_pb';
const pinia = createPinia()
const app = createApp(App)
app.use(router)

const adminConfig: DevkitAdminConfig<typeof apiClient> = {
	apiClient,
	locales: ['en', 'ar'],
	iconFindApi: 'iconFind',
	useDialog,
	authHandler: {
		login: 'authLogin',
		allowedProviders: ['google'],
		providerLogin: 'authLoginProvider',
		providerLoginCallback: 'authLoginProviderCallback',
		resetPasswordEmail: 'authResetPasswordEmail',
		resetPassword: 'authResetPassword'
	},
	filesHandler: {
		fileList: 'galleryList',
		fileDelete: 'fileDelete',
		uploadUrl: `${import.meta.env.VITE_API_URL}/upload`,
		bucketList: 'bucketList',
		bulkRequestMapper: (req) => create(FileCreateBulkRequestSchema, req),
		requestMapper: (req) => create(FileCreateRequestSchema, req),
		fileBulkCreate: 'fileCreateBulk',
		fileDeleteByBucket: 'fileDeleteByBucket',
		bucketCreateUpdate: 'bucketCreateUpdate',
		fileCreate: 'fileCreate',
	}
}
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
app.use(plugin, formKitConfig({}))
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
const baseImage = import.meta.env.VITE_BASE_IMAGE_URL;
const baseConfig: DevkitBaseConfig<typeof apiClient> = {
	apiClient,
	locales: ['en', 'ar'],
	baseImageUrl: baseImage,
	iconFindApi: 'iconFind'
}
app.use(PrimeVue, {
	theme: 'none'
}).use(i18n)
	.use(DevkitAdminPlugin, adminConfig)
	.use(DevkitBaseComponentsPlugin, baseConfig)
	.mount('#app')
