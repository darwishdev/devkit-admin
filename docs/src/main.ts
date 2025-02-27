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
const pinia = createPinia()
const app = createApp(App)

const baseConfig: DevkitBaseConfig<typeof apiClient> = {
  apiClient,
  locales: ['en', 'ar'],
  iconFindApi: 'iconFind'
}
const adminConfig: DevkitAdminConfig<typeof apiClient> = {
  apiClient,
  locales: ['en', 'ar'],
  iconFindApi: 'iconFind'
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
app.use(DialogService)
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
app.use(PrimeVue, {
  theme: 'none'
}).use(i18n)
app.use(router)
  .use(DevkitAdminPlugin, adminConfig)
  .mount('#app')
