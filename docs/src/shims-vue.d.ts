import { I18nGlobal } from 'vue-i18n';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $t: I18nGlobal['t'];
  }
}

