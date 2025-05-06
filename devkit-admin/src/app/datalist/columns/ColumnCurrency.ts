import { h } from "vue"
import { StringUnkownRecord } from '@/pkg/types/types';
import { ColumnBase } from "./ColumnBase"
import { DatalistColumnClientSide, DatalistColumnServerSide, DatalistColumnBase } from "../types"
import { FormateCurrency } from "@/pkg/utils/CurrencyUtils";
export class ColumnCurrency<TRecord extends Record<string, unknown>> extends ColumnBase<TRecord> implements DatalistColumnBase<TRecord> {
	currency: string = ''
	constructor(
		name: keyof TRecord,
		currency: string,
		params?: (DatalistColumnClientSide<StringUnkownRecord, StringUnkownRecord> | DatalistColumnServerSide<StringUnkownRecord, StringUnkownRecord>) & { isSortable?: boolean, isGlobalFilter?: boolean }
	) {
		super(name, params)
		this.currency = currency
	}
	renderHtml = (value: TRecord) => {
		try {
			if (this.columnName in value) {
				const currentValue = value[this.columnName]
				if (typeof currentValue == 'string' || typeof currentValue == 'number') {
					return h('span', `${FormateCurrency(currentValue, this.currency)}`)
				}
			}
			return h('span', '')
		} catch (e) {
			return h('span', 'error_parsing_date')
		}
	}
}

