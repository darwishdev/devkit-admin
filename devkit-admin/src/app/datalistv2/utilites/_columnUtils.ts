import { ObjectKeys, StringUnkownRecord } from "devkit-apiclient"
import { DatalistColumnBase, DatalistColumnClientSide, DatalistColumnsBase, DatalistColumnsClientSide, DatalistColumnsServerSide, DatalistSlots } from "../types"
import { ColumnText } from "../columns/ColumnText"
import { ColumnNode, ColumnSlots } from "primevue"
import { VNode } from "vue"
// const _getBodySlot = <TReq extends StringUnkownRecord, TRecord extends StringUnkownRecord>
// 	(dataHeaderKey: keyof TRecord, currentDataHeader: DatalistColumnBase<TRecord>, slots: DatalistSlots<TReq, TRecord>) => {
// 	const slotKey = `column.${dataHeaderKey as string}`
// 	if (slotKey in slots) {
// 		const boduSlot = (slots[`column.${dataHeaderKey as string}`])
// 		return boduSlot
// 	}
// 	let columnSlots: Partial<ColumnSlots> | null = null
// 	if (typeof currentDataHeader.renderHtml == 'function') {
// 		const renderFunc = currentDataHeader.renderHtml
// 		columnSlots = {
// 			body: ({ data }) => [renderFunc(data)],
// 		}
// 		if (columnSlots) {
// 			return columnSlots.body
// 		}
// 	}
// 	return undefined

// }
export const _constructColumns = <TReq extends StringUnkownRecord, TRecord extends StringUnkownRecord>
	(record: TRecord,
		execludedKeys: (keyof TRecord)[] = [],
		slots: DatalistSlots<TReq, TRecord>): DatalistColumnsBase<TRecord> => {
	const datalistColumns: DatalistColumnsBase<TRecord> = {}
	for (const dataHeaderKey of ObjectKeys(record)) {
		const currentDataHeader = record[dataHeaderKey]
		if (!currentDataHeader || execludedKeys.includes(dataHeaderKey)) {
			continue
		}
		const currentColumn: DatalistColumnBase<TRecord> = new ColumnText(dataHeaderKey, { isSortable: true, isGlobalFilter: true })
		datalistColumns[dataHeaderKey] = currentColumn
	}

	return datalistColumns;
}
