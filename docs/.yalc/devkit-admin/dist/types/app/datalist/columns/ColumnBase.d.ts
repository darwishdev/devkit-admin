import { FormKitSchemaNode } from '@formkit/core';
import { ColumnSlots, ColumnProps } from 'primevue/column';
import { DatalistColumnClientSide, DatalistColumnServerSide, DatalistFilter, DatalistFilterInput, DatalistRouter } from '../types';
import { StringUnkownRecord } from '../../../pkg/types/types';
export declare class ColumnBase<TRecord extends Record<string, unknown>> {
    props: ColumnProps;
    columnName: keyof TRecord;
    router?: DatalistRouter<TRecord>;
    editInput?: FormKitSchemaNode;
    slots?: ColumnSlots;
    isGlobalFilter?: boolean;
    isSortable?: boolean;
    filters?: DatalistFilterInput<StringUnkownRecord>[] | DatalistFilter<StringUnkownRecord>[];
    constructor(name: keyof TRecord, params?: (DatalistColumnClientSide<StringUnkownRecord, StringUnkownRecord> | DatalistColumnServerSide<StringUnkownRecord, StringUnkownRecord>) & {
        isSortable?: boolean;
        isGlobalFilter?: boolean;
    });
}
