import { VNode } from 'vue';
import { DatalistStore } from '../datalist';
import { GalleryListRequest, FileObject, GalleryListResponse } from '../../pkg/types/api_types';
declare const _default: <TApi extends Record<string, Function>>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_expose?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: __VLS_PrettifyLocal<Pick<Partial<{}> & Omit<{} & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps, never>, never> & {
        bucketName?: string;
    } & Partial<{}>> & import('vue').PublicProps;
    expose(exposed: import('vue').ShallowUnwrapRef<{}>): void;
    attrs: any;
    slots: Readonly<{
        card?: (props: {
            data: FileObject;
        }) => VNode[];
        actions?: (props: {
            data: FileObject;
        }) => VNode | VNode[];
        globalActions?: (props: {
            store: DatalistStore<TApi, GalleryListRequest, FileObject, GalleryListRequest, GalleryListResponse, GalleryListRequest>;
        }) => VNode[] | VNode;
    }> & {
        card?: (props: {
            data: FileObject;
        }) => VNode[];
        actions?: (props: {
            data: FileObject;
        }) => VNode | VNode[];
        globalActions?: (props: {
            store: DatalistStore<TApi, GalleryListRequest, FileObject, GalleryListRequest, GalleryListResponse, GalleryListRequest>;
        }) => VNode[] | VNode;
    };
    emit: {};
}>) => import('vue').VNode & {
    __ctx?: Awaited<typeof __VLS_setup>;
};
export default _default;
type __VLS_PrettifyLocal<T> = {
    [K in keyof T]: T[K];
} & {};
