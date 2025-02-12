
import { ref, inject, type Ref } from 'vue'
import type { FormKitNode } from '@formkit/core'
import { defineStore } from 'pinia'
import type { AppFormStore } from './types'
import type { StringUnkownRecord } from '@/pkg/types/types'
import type { AppFormOptions, AppFormProps, FindHandlerFn, SubmitHandlerFn } from '@/pkg/types/types'
import { ObjectKeys } from 'devkit-apiclient'
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
    const errorMessage: Ref<string> = ref('')
    const apiClient = inject<Record<string, Function>>('apiClient')
    const submitMutationFunntion = (props: AppFormProps<TKey, TFormRequest, TApiRequest, TApiResponse, TFindRequestPropName, TFindResponsePropName, TFindCallbakResponse, TCallbakResponse>, requestBody: TApiRequest) => new Promise<TApiResponse>((resolve, reject) => {
      const handler = props.context.submitHandler
      if (typeof handler.endpoint == 'string' && !apiClient) {
        console.log("this should not be called")
        reject('apiclient is not provided')
        return
      }
      const endpoint = typeof handler.endpoint == 'string' ? apiClient![handler.endpoint] as SubmitHandlerFn<TApiRequest, TApiResponse> : handler.endpoint
      endpoint(requestBody as TApiRequest).then((response) => {
        if (props.context.submitHandler.callback) {
          console.log("ca;;omg the callback", response)
          props.context.submitHandler.callback(response)
        }
        resolve(response)
      }).catch((e: Error) => {
        reject(e.message)
        console.log("form error")
      })
      resolve({} as TApiResponse)
    })
    const submit = (formValue: TApiRequest, formNode: FormKitNode) => {
      return new Promise<void>((resolve) => {
        resolve()
      })
    }
    const init = (props: AppFormProps<TKey, TFormRequest, TApiRequest, TApiResponse, TFindRequestPropName, TFindResponsePropName, TFindCallbakResponse, TCallbakResponse>) => {
      return new Promise<void>((resolve) => {
        const findHandler = props.context.findHandler
        console.log("findHandler", findHandler)
        if (findHandler) {
          const findHandlerFn = typeof findHandler.endpoint == 'string' ? apiClient![findHandler.endpoint] as FindHandlerFn<TFindRequestPropName, TFindResponsePropName, TApiRequest> : findHandler.endpoint
          const findHandlerRequest: any = {}
          findHandlerRequest[findHandler.requestPropertyName] = 1
          console.log("findhandelrrequ", findHandlerRequest)
          // ObjectKeys(resp[propName]).forEach((k: string) => initialFormValue[k] = resp[k])

          findHandlerFn(findHandlerRequest).then((resp) => {

            if (findHandler.responsePropertyName) {
              const propName = findHandler.responsePropertyName as string
              if (propName in resp) {
                const va = resp[propName]
                if (typeof va == 'object' && va) {
                  ObjectKeys(va).forEach((k) => initialFormValue[k] = va[k])
                  console.log(resp, 'propname', propName, ObjectKeys(va))
                }
              }

              setTimeout(resolve, 300)
              return
            }

            // ObjectKeys(resp).forEach((k: string) => initialFormValue[k] = resp[k])
            setTimeout(resolve, 300)

          })
        }
      })
    }
    return {
      //state
      initialFormValue,
      formOptions,
      errorMessage,

      //methos
      submit,
      submitMutationFunntion,
      init
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

