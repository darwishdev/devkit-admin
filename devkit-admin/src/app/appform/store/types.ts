//import type { AppFormOptions, StringUnkownRecord } from "@/pkg/types/types"
//
//import type { ComputedRef, Ref } from "vue"
//import type { Store } from "pinia"
//export type AppFormState<TReq extends StringUnkownRecord> = {
//  formValueRef: Ref<StringUnkownRecord>
//  formElementRef: Ref<any>
//  initialFormValue: StringUnkownRecord
//  formOptions: AppFormOptions
//}
//export type AppFormGetters = {
//  formValueString: ComputedRef<string>
//}
//export type AppFormActions<TKey extends string,
//  TFormRequest extends StringUnkownRecord = StringUnkownRecord,
//  TApiRequest extends StringUnkownRecord = StringUnkownRecord,
//  TApiResponse extends StringUnkownRecord = StringUnkownRecord,
//  TFindRequestPropName extends string | undefined = 'recordId',
//  TFindResponsePropName extends string | undefined = 'request',
//  TFindCallbakResponse = unknown,
//  TCallbakResponse = unknown> = {
//    validate: () => void
//  }
//
//export type AppFormStore<
//  TKey extends string,
//  TFormRequest extends StringUnkownRecord = StringUnkownRecord,
//  TApiRequest extends StringUnkownRecord = StringUnkownRecord,
//  TApiResponse extends StringUnkownRecord = StringUnkownRecord,
//  TFindRequestPropName extends string | undefined = 'recordId',
//  TFindResponsePropName extends string | undefined = 'request',
//  TFindCallbakResponse = unknown,
//  TCallbakResponse = unknown
//> = Store<
//  string,
//  Pick<AppFormState<TApiRequest>, keyof AppFormState<TApiRequest>>,
//  Pick<AppFormGetters, keyof AppFormGetters>,
//  Pick<AppFormActions<TKey, TFormRequest, TApiRequest, TApiResponse, TFindRequestPropName, TFindResponsePropName, TFindCallbakResponse, TCallbakResponse>, keyof AppFormActions<TKey, TFormRequest, TApiRequest, TApiResponse, TFindRequestPropName, TFindResponsePropName, TFindCallbakResponse, TCallbakResponse>>
//>

