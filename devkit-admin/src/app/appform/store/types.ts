import type { StringUnkownRecord } from "@/pkg/types/types"
import type { AppFormOptions, AppFormProps, SubmitHandler } from "../types"

import { type FormKitSchemaNode, type FormKitNode } from '@formkit/core'
import type { Ref } from "vue"
import type { Store } from "pinia"
export type AppFormState<TReq extends StringUnkownRecord> = {
  initialFormValue: StringUnkownRecord
  formOptions: AppFormOptions
  errorMessage: Ref<string>
}
export type AppFormGetters = {
}
export type AppFormActions<TKey extends string,
  TFormRequest extends StringUnkownRecord = StringUnkownRecord,
  TApiRequest extends StringUnkownRecord = StringUnkownRecord,
  TApiResponse extends StringUnkownRecord = StringUnkownRecord,
  TFindRequestPropName extends string | undefined = 'recordId',
  TFindResponsePropName extends string | undefined = 'request',
  TFindCallbakResponse = unknown,
  TCallbakResponse = unknown> = {
    submit: (formValue: TApiRequest, formNode: FormKitNode) => Promise<void>
    submitMutationFunntion: (props: AppFormProps<TKey, TFormRequest, TApiRequest, TApiResponse, TFindRequestPropName, TFindResponsePropName, TFindCallbakResponse, TCallbakResponse>, requestBody: TApiRequest) => Promise<TApiResponse>
    init: (porps: AppFormProps<TKey, TFormRequest, TApiRequest, TApiResponse, TFindRequestPropName, TFindResponsePropName, TFindCallbakResponse, TCallbakResponse>) => Promise<void>
  }

export type AppFormStore<
  TKey extends string,
  TFormRequest extends StringUnkownRecord = StringUnkownRecord,
  TApiRequest extends StringUnkownRecord = StringUnkownRecord,
  TApiResponse extends StringUnkownRecord = StringUnkownRecord,
  TFindRequestPropName extends string | undefined = 'recordId',
  TFindResponsePropName extends string | undefined = 'request',
  TFindCallbakResponse = unknown,
  TCallbakResponse = unknown
> = Store<
  string,
  Pick<AppFormState<TApiRequest>, keyof AppFormState<TApiRequest>>,
  Pick<AppFormGetters, keyof AppFormGetters>,
  Pick<AppFormActions<TKey, TFormRequest, TApiRequest, TApiResponse, TFindRequestPropName, TFindResponsePropName, TFindCallbakResponse, TCallbakResponse>, keyof AppFormActions<TKey, TFormRequest, TApiRequest, TApiResponse, TFindRequestPropName, TFindResponsePropName, TFindCallbakResponse, TCallbakResponse>>
>

