import type { DBDropdownOptions } from '@/pkg/database/DbTypes';
import { ApiEndpoint, resolveApiEndpoint, StringUnkownRecord } from 'devkit-apiclient';
import { db } from '@/devkit_admin';
import { DropdownContext } from '../types';
import { CacheOptions } from '@/pkg/types/types';
import { useDebounceFn, useMemoize } from '@vueuse/core';
export type OptionGetterParams<TApi extends Record<string, Function>, TOptionsReq extends StringUnkownRecord, TOptionsResp extends StringUnkownRecord> = Pick<DropdownContext<TApi, TOptionsReq, TOptionsResp>, 'responseOptionsKey' | 'optionsMapper'> & {
	options: ApiEndpoint<TApi, TOptionsReq, TOptionsResp>
	request?: TOptionsReq,
	apiClient?: TApi
}
export const fetchOptionsFromApi =
	<TApi extends Record<string, Function>, TOptionsReq extends StringUnkownRecord, TOptionsResp extends StringUnkownRecord>({
		options,
		optionsMapper,
		apiClient,
		request = {} as TOptionsReq,
		responseOptionsKey = 'options'
	}: OptionGetterParams<TApi, TOptionsReq, TOptionsResp>) => new Promise<DBDropdownOptions>((resolve, reject) => {

		console.log("fetching from api")
		resolveApiEndpoint<TApi, TOptionsReq, TOptionsResp>(options, apiClient, request)
			.then((response) => {
				if (optionsMapper) {
					return resolve(optionsMapper(response))
				}
				if (Array.isArray(response)) {
					return resolve(response)
				}
				if (responseOptionsKey in response) {
					if (Array.isArray(response[responseOptionsKey])) {
						return resolve(response[responseOptionsKey])
					}
					console.error(`the value of ${responseOptionsKey as string} Key inside the api response is not array`)
				}
				resolve([])
			}).catch(reject)
	})
export const optionsCacheDelete = (key: string) => {
	db.dropdownHelper.bulkDelete([key])
}
export const fetchOptionsFromDB = <TApi extends Record<string, Function>, TOptionsReq extends StringUnkownRecord, TOptionsResp extends StringUnkownRecord>(
	{ cacheKey, cacheTimeout = 100000 }: Partial<CacheOptions>,
	fetchParams: OptionGetterParams<TApi, TOptionsReq, TOptionsResp>
) => new Promise<DBDropdownOptions>((resolve, reject) => {
	console.log("fetching from db")
	if (!cacheKey) {
		return fetchOptionsFromApi(fetchParams)
			.then(resolve)
			.catch(reject);

	}
	db.dropdownHelper.find(cacheKey).then((options) => {
		if (options) {
			return resolve(options)
		}
		optionsCacheDelete(cacheKey)
		const apiFetcher = useDebouncedFetchOptionsFromApi<TApi, TOptionsReq, TOptionsResp>()
		apiFetcher(fetchParams).then((apiOptions) => {
			if (apiOptions.length) {
				db.dropdownHelper.create(cacheKey, apiOptions, cacheTimeout)
					.catch(err => console.warn("Failed to create cache entry", err));
			}
			return resolve(apiOptions)
		})
	}).catch((err) => {
		console.warn("Cache lookup failed, falling back to API", err);
		fetchOptionsFromApi(fetchParams)
			.then(resolve)
			.catch(reject);
	})
})

// Debounced version of fetchOptionsFromApi
export const useDebouncedFetchOptionsFromApi = <TApi extends Record<string, Function>, TOptionsReq extends StringUnkownRecord, TOptionsResp extends StringUnkownRecord>() => {
	const debouncedFetchOptions = useDebounceFn(
		(fetchParams: OptionGetterParams<TApi, TOptionsReq, TOptionsResp>) =>
			fetchOptionsFromApi(fetchParams),
		300 // 300ms debounce delay
	);

	return debouncedFetchOptions;
};
export const useMemoizedDropdownOptions = <TApi extends Record<string, Function>, TOptionsReq extends StringUnkownRecord, TOptionsResp extends StringUnkownRecord>() => {
	const memoizedFetchOptions = useMemoize(
		(cacheKey: string | undefined, cacheTimeout: number, fetchParams: OptionGetterParams<TApi, TOptionsReq, TOptionsResp>) =>
			fetchOptionsFromDB({ cacheKey, cacheTimeout }, fetchParams)
	);
	return memoizedFetchOptions;
};
