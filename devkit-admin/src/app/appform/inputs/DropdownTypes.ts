import { DBDropdownOptions } from '@/pkg/database/DbTypes';
import { CacheOptions } from '@/pkg/types/types';
import { ApiEndpoint, StringUnkownRecord } from 'devkit-apiclient';
import { MultiSelectProps, SelectProps } from 'primevue';
import { FormKitInputContext } from '../types';
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
	requestMapper?: (value: unknown) => TReq
	requestPropertyName?: keyof TReq
}
export type DropdownContext<
	TApi extends Record<string, Function>,
	TOptionsReq extends StringUnkownRecord,
	TOptionsResp extends StringUnkownRecord = DropdownOptions,
	TComponentType extends 'single' | 'multi' = 'single'
> = (TComponentType extends 'multi' ? MultiSelectProps : SelectProps) & FormKitInputContext & Partial<DependantDropdown<TOptionsReq>> & Partial<CacheOptions> & {
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
	context: DropdownContext<TApi, TOptionsReq, TOptionsResp, 'single'>
}

export type InputMultiDropdownProps<TApi extends Record<string, Function>, TOptionsReq extends StringUnkownRecord, TOptionsResp extends StringUnkownRecord = DropdownOptions> = {
	context: DropdownContext<TApi, TOptionsReq, TOptionsResp, 'multi'>
}
