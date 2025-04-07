
import type { FormKitSchemaNode } from '@formkit/core'
import { ColumnSlots, type ColumnProps } from 'primevue/column';
import {  DatalistColumnClientSide, DatalistColumnServerSide, DatalistFilter, DatalistFilterInput, DatalistRouter } from '../types';
import { StringUnkownRecord } from '@/pkg/types/types';

export class ColumnBase<TRecord extends Record<string, unknown>> {
	props: ColumnProps = {}
	columnName: keyof TRecord
	router?: DatalistRouter<TRecord>
	editInput?: FormKitSchemaNode
	slots?: ColumnSlots
	isGlobalFilter: boolean
	isSortable?: boolean
	filters?: DatalistFilterInput<StringUnkownRecord>[] | DatalistFilter<StringUnkownRecord>[]
	constructor(name: keyof TRecord, params: (DatalistColumnClientSide<StringUnkownRecord, StringUnkownRecord> | DatalistColumnServerSide<StringUnkownRecord, StringUnkownRecord>) & { isSortable?: boolean, isGlobalFilter?: boolean }) {
		this.columnName = name
		this.slots = params.slots
		this.editInput = params.editInput
		this.isSortable = params.isSortable
		this.props.sortable = params.isSortable
		this.props.field = this.props.field || name as string
		this.filters = params.filters
		this.props.header = this.props.header || name as string
		this.isGlobalFilter = params.isGlobalFilter ?? false
		this.router = params.router
	}
}

