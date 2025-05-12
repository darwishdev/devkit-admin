import { StringUnkownRecord } from '../../../pkg/types/types';
import { ColumnBase } from './ColumnBase';
import { DatalistColumnClientSide, DatalistColumnServerSide, DatalistColumnBase } from '../types';
export declare class ColumnCurrency<TRecord extends Record<string, unknown>> extends ColumnBase<TRecord> implements DatalistColumnBase<TRecord> {
    currency: string;
    constructor(name: keyof TRecord, currency: string, params?: (DatalistColumnClientSide<StringUnkownRecord, StringUnkownRecord> | DatalistColumnServerSide<StringUnkownRecord, StringUnkownRecord>) & {
        isSortable?: boolean;
        isGlobalFilter?: boolean;
    });
    renderHtml: (value: TRecord) => import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
        [key: string]: any;
    }>;
}
