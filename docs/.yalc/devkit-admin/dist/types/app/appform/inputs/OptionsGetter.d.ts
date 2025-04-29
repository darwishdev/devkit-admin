import { DBDropdownOptions } from '../../../pkg/database/DbTypes';
import { StringUnkownRecord } from 'devkit-apiclient';
import { DropdownContext } from '../types';
import { CacheOptions } from '../../../pkg/types/types';
export type OptionGetterParams<TApi extends Record<string, Function>, TOptionsReq extends StringUnkownRecord, TOptionsResp extends StringUnkownRecord> = Pick<DropdownContext<TApi, TOptionsReq, TOptionsResp>, 'responseOptionsKey' | 'optionsMapper' | 'options' | 'bypassCache'> & {
    request?: TOptionsReq;
    apiClient?: TApi;
};
export declare const optionsErrorMessages: (key: string) => {
    not_array: Error;
    not_defined: Error;
};
export declare const fetchDropdownOptions: <TApi extends Record<string, Function>, TOptionsReq extends StringUnkownRecord, TOptionsResp extends StringUnkownRecord>({ options, optionsMapper, apiClient, request, responseOptionsKey }: OptionGetterParams<TApi, TOptionsReq, TOptionsResp>) => Promise<DBDropdownOptions>;
export declare const clearOptionsCache: (key: string) => void;
export declare const useDebouncedOptionsFetcher: <TApi extends Record<string, Function>, TOptionsReq extends StringUnkownRecord, TOptionsResp extends StringUnkownRecord>() => import('@vueuse/core').PromisifyFn<(fetchParams: OptionGetterParams<TApi, TOptionsReq, TOptionsResp>) => Promise<DBDropdownOptions>>;
export declare const fetchCachedDropdownOptions: <TApi extends Record<string, Function>, TOptionsReq extends StringUnkownRecord, TOptionsResp extends StringUnkownRecord>({ cacheKey, cacheTimeout, bypassCache }: Partial<CacheOptions>, fetchParams: OptionGetterParams<TApi, TOptionsReq, TOptionsResp>) => Promise<DBDropdownOptions>;
export declare const useMemoizedDropdownOptions: <TApi extends Record<string, Function>, TOptionsReq extends StringUnkownRecord, TOptionsResp extends StringUnkownRecord>() => import('@vueuse/core').UseMemoizeReturn<Promise<DBDropdownOptions>, [cacheKey: string | undefined, cacheTimeout: number, fetchParams: OptionGetterParams<TApi, TOptionsReq, TOptionsResp>]>;
