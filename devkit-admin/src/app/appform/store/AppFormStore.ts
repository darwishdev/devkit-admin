
import { defineStore } from 'pinia'
import type { AppFormStore } from './types'
import type { StringUnkownRecord } from '@/pkg/types/types'
import type { AppFormOptions } from '@/pkg/types/types'
import { ref } from 'vue'
export const useAppFormStore = <
  TKey extends string,
  TFormRequest extends StringUnkownRecord = StringUnkownRecord,
  TApiRequest extends StringUnkownRecord = StringUnkownRecord,
  TApiResponse extends StringUnkownRecord = StringUnkownRecord,
  TFindRequestPropName extends string | undefined = 'recordId',
  TFindResponsePropName extends string | undefined = 'request',
  TFindCallbakResponse = unknown,
  TCallbakResponse = unknown
>(
  appFormKey: string) => defineStore(`app-form-${appFormKey}` as string, () => {
    const initialFormValue: StringUnkownRecord = {}
    const formOptions: AppFormOptions = {}
    const formValueRef = ref<StringUnkownRecord>({})
    return {
      //state
      initialFormValue,
      formValueRef,
      formOptions,
      //methos
    }

  })
export const useAppFormStoreWithKey = <
  TKey extends string,
  TFormRequest extends StringUnkownRecord = StringUnkownRecord,
  TApiRequest extends StringUnkownRecord = StringUnkownRecord,
  TApiResponse extends StringUnkownRecord = StringUnkownRecord,
  TFindRequestPropName extends string | undefined = 'recordId',
  TFindResponsePropName extends string | undefined = 'request',
  TFindCallbakResponse = unknown,
  TCallbakResponse = unknown
>(appFormKey: string): AppFormStore<TKey, TFormRequest, TApiRequest, TApiResponse, TFindRequestPropName, TFindResponsePropName, TFindCallbakResponse, TCallbakResponse> => useAppFormStore<TKey, TFormRequest, TApiRequest, TApiResponse, TFindRequestPropName, TFindResponsePropName, TFindCallbakResponse, TCallbakResponse>(appFormKey)()

