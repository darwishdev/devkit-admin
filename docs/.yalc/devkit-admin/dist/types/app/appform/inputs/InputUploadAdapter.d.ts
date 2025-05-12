import { FileObject } from '../../../pkg/types/api_types';
export declare const createFileRequestFromFile: (file: File, bucketName: string) => Promise<{
    path: string;
    bucketName: string;
    reader: Uint8Array<ArrayBuffer>;
    fileType: string;
}>;
export declare const createFileBulkRequestFromFiles: (files: File[], bucketName: string) => Promise<{
    files: {
        path: string;
        bucketName: string;
        reader: Uint8Array<ArrayBuffer>;
        fileType: string;
    }[];
}>;
export declare const fileObjectFromFile: (file: File, bucketName: string) => FileObject;
export declare const fileObjectFromFiles: (files: File[], bucketName: string) => FileObject[];
