import { setup } from '@storybook/vue3';
import { createI18n } from 'vue-i18n'
import { apiClient } from '../src/api/apiClient';

import '../src/assets/css/app.css'
import 'devkit-base-components/style';
import router from '../src/routes';
import type { Preview } from '@storybook/vue3';
import PrimeVue from 'primevue/config';
import DevkitBaseComponentsPlugin, { type DevkitBaseConfig } from 'devkit-base-components';
// Register PrimeVue globally
setup((app) => {

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
  app.use(router).use(i18n).use(PrimeVue, { theme: 'none' }).use(DevkitBaseComponentsPlugin, baseConfig)
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
