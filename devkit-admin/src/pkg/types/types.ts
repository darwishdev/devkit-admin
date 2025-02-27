
import type { FormKitSchemaNode } from '@formkit/core'
import type { IconFindRequest, IconFindResponse } from './api_types'
import type { RouteLocationRaw } from 'vue-router'
export type StringUnkownRecord = Record<string, unknown>
export type CacheOptions = {
	cacheKey: string
	bypassCache?: boolean
	cacheTimeout?: number
}
export type EndpointFunction<
	TReq extends Record<string, unknown> = {},
	TResp extends Record<string, unknown> = {}
> = ((req: TReq) => Promise<TResp>)

export type ApiEndpoint<
	TApi extends Record<string, Function>,
	TReq extends Record<string, unknown> = {},
	TResp extends Record<string, unknown> = {}
> = keyof TApi | EndpointFunction<TReq, TResp> | Promise<TResp>

export type DevkitAdminConfig<TApi extends Record<string, Function>> = {
	apiClient: TApi
	locales: string[]
	iconFindApi?: ApiEndpoint<TApi, IconFindRequest, IconFindResponse>
}

export type AppFormSections<TFormRequest> = Record<string, (AppFormSection<TFormRequest> | FormKitSchemaNode[])>
export type AppFormProps<
	TKey extends string,
	TFormRequest extends StringUnkownRecord = StringUnkownRecord,
	TApiRequest extends StringUnkownRecord = TFormRequest,
	TApiResponse extends StringUnkownRecord = StringUnkownRecord,
	TFindRequestPropName extends string | undefined = 'recordId',
	TFindResponsePropName extends string | undefined = 'request',
	TFindCallbakResponse = unknown,
	TCallbakResponse = unknown
> = {
	context: {
		title: string
		formKey: TKey,
		invalidateCaches?: string[]
		options?: AppFormOptions
		submitHandler: SubmitHandler<TFormRequest, TApiRequest, TApiResponse, TCallbakResponse>,
		findHandler?: FindHandler<TFindRequestPropName, TFindResponsePropName, TApiRequest, TFindCallbakResponse>,
		sections: AppFormSections<TFormRequest>
	}
}
export type SubmitHandlerFn<TApiRequest, TApiResponse> = (req: TApiRequest) => Promise<TApiResponse>
export type SubmitHandler<
	TFormRequest extends StringUnkownRecord = StringUnkownRecord,
	TApiRequest extends StringUnkownRecord = TFormRequest,
	TApiResponse extends StringUnkownRecord = StringUnkownRecord,
	TCallbakResponse = unknown> = {
		endpoint: SubmitHandlerFn<TApiRequest, TApiResponse> | string
		mapFunction?: (formReq: TFormRequest) => TApiRequest
		callback?: (formResp: TApiResponse) => TCallbakResponse
		redirectRoute?: string | RouteLocationRaw
	}

export type FindHandlerEndpointFn<TFindPropName extends string, TReq> = ((req: Record<TFindPropName, unknown>) => TReq)
export type FindHandlerEndpoint<TFindPropName extends string, TReq> = FindHandlerEndpointFn<TFindPropName, TReq> | string

export type FindHandlerFn<TFindRequestPropName extends string | undefined, TFindResponsePropName extends string | undefined, TApiRequest extends StringUnkownRecord> = TFindResponsePropName extends string
	? (req: Record<TFindRequestPropName extends string ? TFindRequestPropName : 'recordId', unknown>) => Promise<Record<TFindResponsePropName, TApiRequest>>
	: (req: Record<TFindRequestPropName extends string ? TFindRequestPropName : 'recordId', unknown>) => Promise<TApiRequest>;

export type FindHandler<TFindRequestPropName extends string | undefined, TFindResponsePropName extends string | undefined, TApiRequest extends StringUnkownRecord, TFindCallbakResponse> = {
	endpoint: FindHandlerFn<TFindRequestPropName, TFindRequestPropName, TApiRequest> | string
	requestPropertyName: TFindRequestPropName,
	responsePropertyName: TFindResponsePropName,
	requestValue?: unknown,
	routerParamName?: string,
	callback?: TFindResponsePropName extends string ? (formResp: Record<TFindResponsePropName, TApiRequest>) => TFindCallbakResponse : (formResp: TApiRequest) => TFindCallbakResponse
}

export type AppFormSection<TFormRequest = StringUnkownRecord> = {
	inputs: (FormKitSchemaNode & { name: keyof TFormRequest })[]
	isTitleHidden?: boolean
	isTransparent?: boolean
}

export type AppFormOptions = {
	isBulkCreateHidden?: boolean
	isHeaderSubmitHidden?: boolean
	successMessageSummary?: string
	successMessageDetail?: string
	isSuccessNotificationHidden?: boolean
	isFormTransparent?: boolean
}
