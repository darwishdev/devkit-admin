
import type { Store } from 'pinia'
import { StringUnkownRecord } from 'devkit-apiclient'
import { DatalistProps } from '../types';
export type DatalistStore<TApi extends Record<string, Function>,
	TReq extends Record<string, unknown>,
	TRecord extends Record<string, unknown>,
	TFiltersReq extends Record<string, unknown> | undefined = undefined,
	TApiResponse extends Record<string, unknown> | undefined = undefined,
	TFormSectionsRequest extends Record<string, unknown> | undefined = undefined> = Store<
		string,
		Pick<DatalistState<TApi, TReq, TRecord, TFiltersReq, TApiResponse, TFormSectionsRequest>, keyof DatalistState<TApi, TReq, TRecord, TFiltersReq, TApiResponse, TFormSectionsRequest>>,
		Pick<DatalistGetters<TRecord>, keyof DatalistGetters<TRecord>>,
		Pick<DatalistActions<TApi, TReq, TRecord, TFiltersReq, TApiResponse, TFormSectionsRequest>, keyof DatalistActions<TApi, TReq, TRecord, TFiltersReq, TApiResponse, TFormSectionsRequest>>
	>

export type DeleteRestoreVariant = {
	disabled: boolean;
	hasSelectedData: boolean;
	hasDeletedRecords: boolean;
	icon: string;
	label: string;
	empty: string;
	severity: 'secondary' | 'success' | 'info' | 'warn' | 'help' | 'danger' | 'contrast' | undefined;

}
export type DatalistState
	<TApi extends Record<string, Function>,
		TReq extends Record<string, unknown>,
		TRecord extends Record<string, unknown>,
		TFiltersReq extends Record<string, unknown> | undefined = undefined,
		TApiResponse extends Record<string, unknown> | undefined = undefined,
		TFormSectionsRequest extends Record<string, unknown> | undefined = undefined>
	= {
	};

export type DatalistGetters<TRecord extends StringUnkownRecord> = {
};
export type DatalistDeleteMutationRequest = {
}
export type DatalistActions<
	TApi extends Record<string, Function>,
	TReq extends Record<string, unknown>,
	TRecord extends Record<string, unknown>,
	TFiltersReq extends Record<string, unknown> | undefined = undefined,
	TApiResponse extends Record<string, unknown> | undefined = undefined,
	TFormSectionsRequest extends Record<string, unknown> | undefined = undefined> = {
	};
