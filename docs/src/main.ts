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
import 'devkit-base-components/style';
import { plugin, defaultConfig } from '@formkit/vue'
import { rootClasses } from './formkit.theme'
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
const formktiConfig = {
  config: {
    rootClasses,
  }
}
app.use(pinia)
app.use(ToastService)
app.use(DialogService)
app.use(DevkitBaseComponentsPlugin, baseConfig)
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
app.use(PrimeVue, {
  theme: 'none'
}).use(i18n)
app.use(router)
  .use(DevkitAdminPlugin, adminConfig)
  .mount('#app')
