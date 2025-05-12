import { FormKitSchemaNode } from '@formkit/core';
import { AuthLoginProviderCallbackRequest, AuthLoginProviderRequest, AuthLoginProviderResponse, AuthLoginRequest, AuthLoginResponse, AuthResetPasswordEmailRequest, AuthResetPasswordEmailResponse, AuthResetPasswordRequest, AuthResetPasswordResponse, BucketCreateUpdateRequest, BucketListRequest, BucketListResponse, DeleteRequest, FileCreateBulkRequest, FileCreateRequest, FileCreateResponse, FileObject, GalleryListRequest, GalleryListResponse, IconFindRequest, IconFindResponse } from './api_types';
import { RouteLocationRaw } from 'vue-router';
import { ApiEndpoint } from 'devkit-apiclient';
import { BucketCreateUpdateResponse } from '@buf/ahmeddarwish_devkit-api.bufbuild_es/devkit/v1/public_storage_pb';
import { DatalistRecords } from '../../app/datalist';
export type StringUnkownRecord = Record<string, unknown>;
export type CacheOptions = {
    cacheKey: string;
    bypassCache?: boolean;
    cacheTimeout?: number;
};
export type AuthHandler<TApi extends Record<string, Function>> = {
    login: ApiEndpoint<TApi, AuthLoginRequest, AuthLoginResponse>;
    allowedProviders?: string[];
    providerLogin?: ApiEndpoint<TApi, AuthLoginProviderRequest, AuthLoginProviderResponse>;
    providerLoginCallback?: ApiEndpoint<TApi, AuthLoginProviderCallbackRequest, AuthLoginResponse>;
    resetPasswordEmail?: ApiEndpoint<TApi, AuthResetPasswordEmailRequest, AuthResetPasswordEmailResponse>;
    resetPassword?: ApiEndpoint<TApi, AuthResetPasswordRequest, AuthResetPasswordResponse>;
};
export type FilesHandler<TApi extends Record<string, Function>> = {
    bucketList: ApiEndpoint<TApi, BucketListRequest, BucketListResponse>;
    fileCreate: ApiEndpoint<TApi, FileCreateRequest, FileCreateResponse>;
    fileList: DatalistRecords<TApi, GalleryListRequest, FileObject, GalleryListRequest, GalleryListResponse>;
    fileBulkCreate?: ApiEndpoint<TApi, FileCreateBulkRequest, FileCreateResponse>;
    bucketCreateUpdate?: ApiEndpoint<TApi, BucketCreateUpdateRequest, BucketCreateUpdateResponse>;
    fileDelete?: ApiEndpoint<TApi, DeleteRequest<'records', string, 'bulk'>, any>;
    fileDeleteByBucket?: ApiEndpoint<TApi, {
        records: string[];
        bucketName: string;
    }, any>;
    bucketDelete?: ApiEndpoint<TApi, DeleteRequest<'records', string, 'bulk'>, any>;
};
export type DevkitAdminConfig<TApi extends Record<string, Function>> = {
    apiClient: TApi;
    locales: string[];
    iconFindApi?: ApiEndpoint<TApi, IconFindRequest, IconFindResponse>;
    filesHandler?: FilesHandler<TApi>;
    authHandler?: AuthHandler<TApi>;
};
export type AppFormSections<TFormRequest> = Record<string, (AppFormSection<TFormRequest> | (FormKitSchemaNode & {
    name: keyof TFormRequest;
})[])>;
export type AppFormProps<TApi extends Record<string, Function>, TFormRequest extends StringUnkownRecord = StringUnkownRecord, TApiRequest extends StringUnkownRecord = StringUnkownRecord, TApiResponse extends StringUnkownRecord = StringUnkownRecord, TFindRequestPropName extends string = 'recordId', TFindResponsePropName extends string = 'request', TFindCallbakResponse = unknown, TCallbakResponse = unknown> = {
    context: {
        title: string;
        formKey: string;
        useClear?: boolean;
        usePresist?: boolean;
        useReset?: boolean;
        resetOnSuccess?: boolean;
        syncWithUrl?: boolean;
        isLazy?: boolean;
        invalidateCachesOnChage?: string[];
        invalidateCaches?: string[];
        options?: AppFormOptions;
        submitHandler: SubmitHandler<TApi, TFormRequest, TApiRequest, TApiResponse, TCallbakResponse>;
        findHandler?: FindHandler<TApi, TFormRequest, TFindRequestPropName, TFindResponsePropName, TFindCallbakResponse>;
        sections: AppFormSections<TFormRequest>;
    };
};
export type SubmitHandlerFn<TApiRequest, TApiResponse> = (req: TApiRequest) => Promise<TApiResponse>;
export type SubmitHandler<TApi extends Record<string, Function>, TFormRequest extends StringUnkownRecord = StringUnkownRecord, TApiRequest extends StringUnkownRecord = TFormRequest, TApiResponse extends StringUnkownRecord = StringUnkownRecord, TCallbakResponse = unknown> = {
    endpoint: ApiEndpoint<TApi, TApiRequest, TApiResponse>;
    hideActions?: boolean;
    mapFunction?: (formReq: TFormRequest) => TApiRequest;
    callback?: (formResp: TApiResponse) => TCallbakResponse;
    redirectRoute?: string | RouteLocationRaw;
};
export type FindHandlerEndpointFn<TFindPropName extends string, TReq> = ((req: Record<TFindPropName, unknown>) => TReq);
export type FindHandlerEndpoint<TFindPropName extends string, TReq> = FindHandlerEndpointFn<TFindPropName, TReq> | string;
export type FindHandler<TApi extends Record<string, Function>, TFormRequest extends StringUnkownRecord, TFindRequestPropName extends string = 'recordId', TFindResponsePropName extends string = 'request', TFindCallbakResponse = unknown> = {
    endpoint: ApiEndpoint<TApi, Record<TFindRequestPropName, unknown>, Record<TFindResponsePropName, TFormRequest>>;
    requestPropertyName: TFindRequestPropName;
    responsePropertyName: TFindResponsePropName;
    requestValue?: unknown;
    routerParamName?: string;
    callback?: TFindResponsePropName extends string ? (formResp: Record<TFindResponsePropName, TApiRequest>) => TFindCallbakResponse : (formResp: TApiRequest) => TFindCallbakResponse;
};
export type AppFormSection<TFormRequest = StringUnkownRecord> = {
    inputs: (FormKitSchemaNode & {
        name: keyof TFormRequest;
    })[];
    isTitleHidden?: boolean;
    isTransparent?: boolean;
};
export type AppFormOptions = {
    isBulkCreateHidden?: boolean;
    isHeaderSubmitHidden?: boolean;
    successMessageSummary?: string;
    successMessageDetail?: string;
    isSuccessNotificationHidden?: boolean;
    isFormTransparent?: boolean;
};
