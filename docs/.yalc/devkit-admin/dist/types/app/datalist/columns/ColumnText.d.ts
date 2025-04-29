import { ColumnBase } from './ColumnBase';
import { DatalistColumnBase } from '../types';
export declare class ColumnText<TRecord extends Record<string, unknown>> extends ColumnBase<TRecord> implements DatalistColumnBase<TRecord> {
    renderHtml: (value: TRecord) => import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
        [key: string]: any;
    }>;
}
