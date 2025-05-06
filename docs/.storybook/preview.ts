import { setup } from '@storybook/vue3';
import { createI18n } from 'vue-i18n'
import { apiClient } from '../src/api/apiClient';

import '../src/assets/css/app.css'
import 'devkit-base-components/style';
import router from '../src/routes';
import type { Preview } from '@storybook/vue3';

import formkitConfig from '../src/formkit.config'
import { plugin } from '@formkit/vue'
import PrimeVue from 'primevue/config';
import DevkitBaseComponentsPlugin, { type DevkitBaseConfig } from 'devkit-base-components';
import DevkitAdminPlugin, { DevkitAdminConfig } from 'devkit-admin';

import { DialogService } from 'primevue';
import { ToastService } from 'primevue';
import { createPinia } from 'pinia'
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query';
// Register PrimeVue globally
setup((app) => {

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
    locales: ['en', 'ar'],
    iconFindApi: 'iconFind',
    filesHandler: {
      fileList: 'galleryList',
      bucketList: 'bucketList',
      bucketCreateUpdate: 'bucketCreateUpdate',
      fileCreate: 'fileCreate',
      fileBulkCreate: 'fileCreateBulk'
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
  app.use(DialogService)
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
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
