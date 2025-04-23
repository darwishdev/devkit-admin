
import { defineStore, getActivePinia } from 'pinia'
import type { AppFormProps, StringUnkownRecord } from '@/pkg/types/types'
import type { AppFormOptions } from '@/pkg/types/types'

import { db } from '@/devkit_admin';
import { computed } from 'vue'
import { objectEntries, useDebounceFn } from '@vueuse/core'
import { RouteQueryAppend } from '@/pkg/utils/QueryUtils'
import { useFormKitContext, useFormKitContextById, useFormKitNodeById } from '@formkit/vue'
import { ObjectKeys } from 'devkit-apiclient'
import { FormKitNode } from '@formkit/core';
export const useAppFormStore = <
  TApi extends Record<string, Function>,
  TFormRequest extends StringUnkownRecord = StringUnkownRecord,
  TApiRequest extends StringUnkownRecord = StringUnkownRecord,
  TApiResponse extends StringUnkownRecord = StringUnkownRecord,
  TFindRequestPropName extends string = 'recordId',
  TFindResponsePropName extends string = 'request',
  TFindCallbakResponse = unknown,
  TCallbakResponse = unknown
>(
  { context }: AppFormProps<TApi,
    TFormRequest,
    TApiRequest,
    TApiResponse,
    TFindRequestPropName,
    TFindResponsePropName,
    TFindCallbakResponse,
    TCallbakResponse

  >
) => defineStore(`app-form-${context.formKey}` as string, () => {
  const initialFormValue: StringUnkownRecord = {}
  const formOptions: AppFormOptions = {}
  const debounceInMilliseconds = 1000
  const formElementContext = useFormKitContextById(context.formKey)
  const formElementNode = useFormKitNodeById(context.formKey)
  const debouncedRouteQueryAppend = useDebounceFn(() => {
    RouteQueryAppend(context.formKey, formValueString.value)
  }, debounceInMilliseconds)

  // watch(formValueRef.value, async () => {
  //   if (!context.syncWithUrl) return
  //   debouncedRouteQueryAppend()
  // })
  const resetForm = () => {
    if (!formElementNode.value) return
    formElementNode.value.reset()
  }
  const clearForm = () => {
    if (!formElementNode.value) return
    formElementNode.value.reset({})
  }
  const formValueString = computed(() => {
    if (!formElementNode.value) return ''
    if (!formElementNode.value.value) return ''
    try {
      const stringValue = JSON.stringify(formElementNode.value.value)
      if (stringValue == '{}') return ''
      return stringValue
    } catch (e) {
      console.error('error happened while converting value: ', e)
      return ''
    }
  })
  const setFormValue = async (value: StringUnkownRecord) => {
    if (!formElementNode.value) return
    formElementNode.value.reset(value)
  }
  const setInputValue = async (inputName: string, inputValue: unknown) => {
    if (!formElementNode.value) return
    const newInputObject: Record<string, unknown> = {}
    newInputObject[inputName] = inputValue
    formElementNode.value.reset({ ...formElementNode.value, ...newInputObject })
  }

  const refetchDropdownInput = async (inputName: string) => {
    if (!formElementNode.value) return
    const node = formElementNode.value.find(inputName, 'name')
    if (!node) return
    if ('forceReload' in node.props) {
      node.props.forceReload()
    }
  }

  const clearInput = async (inputName: string) => {
    setInputValue(inputName, null)
  }
  const presistForm = () => {
    if (!formElementNode.value) return
    localStorage.setItem(context.formKey, formValueString.value)
  }
  const formValue = computed(() => {
    const activeInputs: StringUnkownRecord = {}
    if (!formElementNode.value) return activeInputs
    if (!formElementNode.value._value) return activeInputs
    return formElementNode.value._value as StringUnkownRecord
  })


  const activeInputs = computed(() => {
    const activeInputs: StringUnkownRecord = {}
    console.log("formvalue", formValue.value)
    for (const [key, value] of objectEntries(formValue.value)) {
      console.log("formvalue", formValue.value)
      if (value) {
        activeInputs[key] = value
      }
    }
    return activeInputs
  })

  return {
    //state
    initialFormValue,
    setFormValue,
    formValue,
    presistForm,
    formValueString,
    clearInput,
    activeInputs,
    refetchDropdownInput,
    setInputValue,
    resetForm,
    formElementNode,
    formElementContext,
    debouncedRouteQueryAppend,
    clearForm,
    formOptions,
    //methos
  }

})
export const useAppFormStoreWithProps = <
  TApi extends Record<string, Function>,
  TFormRequest extends StringUnkownRecord = StringUnkownRecord,
  TApiRequest extends StringUnkownRecord = StringUnkownRecord,
  TApiResponse extends StringUnkownRecord = StringUnkownRecord,
  TFindRequestPropName extends string = 'recordId',
  TFindResponsePropName extends string = 'request',
  TFindCallbakResponse = unknown,
  TCallbakResponse = unknown
>(props: AppFormProps<
  TApi,
  TFormRequest,
  TApiRequest,
  TApiResponse,
  TFindRequestPropName,
  TFindResponsePropName,
  TFindCallbakResponse,
  TCallbakResponse
>
) => useAppFormStore<
  TApi,
  TFormRequest,
  TApiRequest,
  TApiResponse,
  TFindRequestPropName,
  TFindResponsePropName,
  TFindCallbakResponse,
  TCallbakResponse
>(props)()
export const useAppFormStoreWithKey = (formKey: string) => {
  const pinia = getActivePinia()
  if (!pinia) throw new Error('Pinia not installed')
  const isStoreDefined = `app-form-${formKey}` in pinia.state.value
  if (!isStoreDefined) throw new Error('store is not defined')
  return useAppFormStoreWithProps({ context: { sections: {}, formKey, title: `formKey`, submitHandler: { endpoint: '' } } })
}
