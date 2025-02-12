<script setup lang="ts" generic="
  TKey extends string,
  TFormRequest extends StringUnkownRecord = StringUnkownRecord,
  TApiRequest extends StringUnkownRecord = StringUnkownRecord,
  TApiResponse extends StringUnkownRecord = StringUnkownRecord,
  TFindRequestPropName extends string | undefined = 'recordId',
  TFindResponsePropName extends string | undefined = 'request',
  TFindCallbakResponse = unknown,
  TCallbakResponse = unknown
">
import { AppFormProps } from '@/pkg/types/types';
import FormBase from './components/FormBase.vue'
import { StringUnkownRecord } from 'devkit-apiclient';
const props = defineProps<AppFormProps<TKey, TFormRequest, TApiRequest, TApiResponse, TFindRequestPropName, TFindResponsePropName, TFindCallbakResponse, TCallbakResponse>>()
</script>
<template>
  <Suspense>
    <template #default>
      <FormBase v-bind="props" />
    </template>
    <template #fallback>
      <div>Loading from app form...</div>
    </template>
  </Suspense>
</template>
