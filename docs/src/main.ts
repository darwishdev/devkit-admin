import { createApp } from 'vue'
import './assets/css/app.css'
import App from './App.vue'

import { VueQueryPlugin } from '@tanstack/vue-query'
import PrimeVue from 'primevue/config';
import { createI18n } from 'vue-i18n'
import { apiClient } from './api/apiClient';
import router from './routes';
import { QueryClient } from '@tanstack/vue-query'
import { DialogService } from 'primevue';
import { ToastService } from 'primevue';
import { createPinia } from 'pinia'
import { plugin } from '@formkit/vue'
import formkitConfig from './formkit.config'
import DevkitAdminPlugin, { type DevkitAdminConfig } from 'devkit-admin';
import DevkitBaseComponentsPlugin, { type DevkitBaseConfig } from 'devkit-base-components';
import { useDialog } from 'primevue';
const app = createApp(App)


app.use(DialogService)

const pinia = createPinia()
const baseConfig: DevkitBaseConfig<typeof apiClient> = {
  apiClient,
  baseImageUrl: 'http://192.168.1.40:54321/storage/v1/object/public/',
  noImageUrl: 'http://192.168.1.40:54321/storage/v1/object/public/images/noimg.webp',
  locales: ['en', 'ar'],
  iconFindApi: 'iconFind'
}
const adminConfig: DevkitAdminConfig<typeof apiClient> = {
  apiClient,
  useDialog,
  locales: ['en', 'ar'],
  iconFindApi: 'iconFind',
  filesHandler: {
    fileList: 'galleryList',
    fileDelete: 'fileDelete',
    bucketList: 'bucketList',
    fileBulkCreate: 'fileCreateBulk',
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
app.use(pinia)
app.use(ToastService)
app.use(PrimeVue, {
  theme: 'none'
})
app.use(DevkitBaseComponentsPlugin, baseConfig)
app.use(plugin, formkitConfig())
const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: {
      "[internal] query has no destination for result data": "error from translation",
      "userName": "translated placeholder",
      hello: "hello"
    },
    ar: {
      hello: "اهلا"
    }
  }
})
app.use(i18n)
app.use(router)
  .use(DevkitAdminPlugin, adminConfig)
  .mount('#app')
