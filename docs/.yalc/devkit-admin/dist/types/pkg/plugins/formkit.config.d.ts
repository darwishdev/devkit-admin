import { FormKitPlugin } from '@formkit/core';
declare const formKitConfig: () => Partial<Omit<import('@formkit/core').FormKitContext, "config" | "children" | "hook" | "plugins"> & {
    config: Partial<import('@formkit/core').FormKitConfig>;
    props: Partial<import('@formkit/core').FormKitProps>;
    children: import('@formkit/core').FormKitNode[] | Set<import('@formkit/core').FormKitNode>;
    index?: number;
    sync: boolean;
    plugins: FormKitPlugin[];
    alias: string;
    schemaAlias: string;
}>;
export default formKitConfig;
