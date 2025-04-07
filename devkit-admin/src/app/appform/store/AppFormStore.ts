
import { defineStore, getActivePinia } from 'pinia'
import type { AppFormProps, StringUnkownRecord } from '@/pkg/types/types'
import type { AppFormOptions } from '@/pkg/types/types'
import { computed, ref, watch } from 'vue'
import { objectEntries, useDebounceFn } from '@vueuse/core'
import { RouteQueryAppend } from '@/pkg/utils/QueryUtils'
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
  { context }: AppFormProps<TKey,
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
  const formValueRef = ref<StringUnkownRecord>({})
  const formElementRef = ref()
  const debouncedRouteQueryAppend = useDebounceFn(() => {
    RouteQueryAppend(context.formKey, formValueString.value)
  }, debounceInMilliseconds)

  watch(formValueRef.value, async () => {
    if (!context.syncWithUrl) return
    debouncedRouteQueryAppend()
  })
  const resetForm = () => {
    formElementRef.value.node.reset()
    formValueRef.value = formElementRef.value.node.value
  }
  const clearForm = () => {
    formElementRef.value.node.reset({})
    formValueRef.value = {}
  }
  const formValueString = computed(() => {
    if (!formValueRef.value) return ''
    try {
      const stringValue = JSON.stringify(formValueRef.value)
      if (stringValue == '{}') return ''
      return stringValue
    } catch (e) {
      console.error('error happened while converting value: ', e)
      return ''
    }
  })
  const setFormValue = async (value: StringUnkownRecord) => {
    if (formElementRef.value) {
      formElementRef.value.node.reset(value)
      formValueRef.value = formElementRef.value.node.value
    }
  }
  const setInputValue = async (inputName: string, inputValue: unknown) => {
    console.log('setInputValue', inputName, inputValue)
    if (formElementRef.value) {
      if (inputName in formElementRef.value.node.value) {
        const newInput: StringUnkownRecord = {}
        newInput[inputName] = inputValue
        formElementRef.value.node.reset({ ...formElementRef.value.node.value, ...newInput })
        formValueRef.value = formElementRef.value.node.value
      }
    }
  }
  const clearInput = async (inputName: string) => {
    if (formElementRef.value) {
      if (inputName in formElementRef.value.node.value) {
        const newInput: StringUnkownRecord = {}
        newInput[inputName] = undefined
        formElementRef.value.node.reset({ ...formElementRef.value.node.value, ...newInput })
        formValueRef.value = formElementRef.value.node.value
      }
    }
  }
  const presistForm = () => {
    localStorage.setItem(context.formKey, formValueString.value)
  }
  const activeInputs = computed(() => {
    const activeInputs: StringUnkownRecord = {}
    for (const [key, value] of objectEntries(formValueRef.value)) {
      if (value) {
        activeInputs[key] = value
      }
    }
    return activeInputs
  })

  const validate = () => {
    console.log("validat the form", formElementRef.value)
  }
  return {
    //state
    initialFormValue,
    validate,
    setFormValue,
    presistForm,
    formValueString,
    clearInput,
    activeInputs,
    setInputValue,
    resetForm,
    formElementRef,
    clearForm,
    formValueRef,
    formOptions,
    //methos
  }

})
export const useAppFormStoreWithProps = <
  TKey extends string,
  TFormRequest extends StringUnkownRecord = StringUnkownRecord,
  TApiRequest extends StringUnkownRecord = StringUnkownRecord,
  TApiResponse extends StringUnkownRecord = StringUnkownRecord,
  TFindRequestPropName extends string | undefined = 'recordId',
  TFindResponsePropName extends string | undefined = 'request',
  TFindCallbakResponse = unknown,
  TCallbakResponse = unknown
>(props: AppFormProps<TKey,
  TFormRequest,
  TApiRequest,
  TApiResponse,
  TFindRequestPropName,
  TFindResponsePropName,
  TFindCallbakResponse,
  TCallbakResponse
>
) => useAppFormStore<TKey, TFormRequest, TApiRequest, TApiResponse, TFindRequestPropName, TFindResponsePropName, TFindCallbakResponse, TCallbakResponse>(props)()
export const useAppFormStoreWithKey = (formKey: string) => {
  const pinia = getActivePinia()
  if (!pinia) throw new Error('Pinia not installed')
  const isStoreDefined = `app-form-${formKey}` in pinia.state.value
  if (!isStoreDefined) throw new Error('store is not defined')
  return useAppFormStoreWithProps({ context: { sections: {}, formKey, title: `formKey`, submitHandler: { endpoint: '' } } })
}
