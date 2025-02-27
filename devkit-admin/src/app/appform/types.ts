import { DBDropdownOptions } from '@/pkg/database/DbTypes';
import { CacheOptions } from '@/pkg/types/types';
import { FormKitNode } from '@formkit/core';
import { ApiEndpoint, StringUnkownRecord } from 'devkit-apiclient';
import { SelectProps } from 'primevue';
export type FormKitInputContext = {
	node: FormKitNode
}
export type DropdownOption<TValue = string | number> = {
	label: string
	value: TValue
	note?: string
	disabled?: boolean
	icon?: string
}
export type DropdownOptions<TValue = string | number> = {
	options: DropdownOption<TValue>[]
}
export type DependantDropdown<TReq extends StringUnkownRecord> = {
	dependsOn: string
	hideUntilParentLoaded?: boolean
	requestMapper?: (value: unknown) => TReq
	requestPropertyName?: keyof TReq
}
export type DropdownContext<TApi extends Record<string, Function>, TOptionsReq extends StringUnkownRecord, TOptionsResp extends StringUnkownRecord = DropdownOptions> = SelectProps & FormKitInputContext & Partial<DependantDropdown<TOptionsReq>> & Partial<CacheOptions> & {
	options: ApiEndpoint<TApi, TOptionsReq, TOptionsResp> | StringUnkownRecord[]
	responseOptionsKey?: keyof TOptionsResp
	convertToFlat?: boolean
	hideReload?: boolean
	debounceInMilliSeconds?: number
	createRoute?: string
	useLazy?: boolean
	optionsMapper?: (options: TOptionsResp) => DBDropdownOptions;
}
export type InputDropdownProps<TApi extends Record<string, Function>, TOptionsReq extends StringUnkownRecord, TOptionsResp extends StringUnkownRecord = DropdownOptions> = {
	context: DropdownContext<TApi, TOptionsReq, TOptionsResp>
}
