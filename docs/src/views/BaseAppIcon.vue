<script lang="ts" setup>
import { useI18n } from 'vue-i18n';


const schema = [
  {
    $formkit: 'text',
    label: "name",
    placeHolder: "hoelo",
    prefixIcon: "email"
  }
]
const submitHandler = () => null
const { t } = useI18n()
</script>

<template>
  <h2>hi : {{ t('hello') }}</h2>
  <FormKit type="form" :actions="true" :onsubmit="submitHandler" :submit-attrs="{
    inputClass: 'my-input-class',
    wrapperClass: 'my-wrapper-class',
    'data-theme': `dark`,
    help: 'My button help text',
    ignore: false
  }">
    <FormKitSchema :schema="schema" />
  </FormKit>
</template>
