import { FormKitNode } from '@formkit/core';
import { VNode } from 'vue';
export declare const renderErr: (node: FormKitNode) => VNode<import('vue').RendererNode, import('vue').RendererElement, {
    [key: string]: any;
}>[] | undefined;
export declare const renderLoading: (isLoading: boolean) => VNode<import('vue').RendererNode, import('vue').RendererElement, {
    [key: string]: any;
}> | undefined;
