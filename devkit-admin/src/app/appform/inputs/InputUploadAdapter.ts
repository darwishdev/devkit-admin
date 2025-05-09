import { FileObject } from "@/pkg/types/api_types";

export const createFileRequestFromFile = async (file: File , bucketName  :string) => {
  const arrayBuffer = await file.arrayBuffer();
  return {
    path: `${file.name}`,
    bucketName,
    reader: new Uint8Array(arrayBuffer),
    fileType: file.type,
  };
};
export const createFileBulkRequestFromFiles = async (files: File[] , bucketName  :string) => {
  const fileRequests = await Promise.all(
    files.map((file) => createFileRequestFromFile(file , bucketName)),
  );
  return {
    files: fileRequests,
  };
};
export const fileObjectFromFile = (file: File, bucketName  :string) : FileObject => {
  return {
    name: file.name,
    bucketId: bucketName,
    owner: '',
    id: '',
    updatedAt: '',
    createdAt: '',
    lastAccessedAt: ''

  };
}
export const fileObjectFromFiles = (files: File[] , bucketName  :string) : FileObject[] => {
  return files.map((file) => fileObjectFromFile(file , bucketName))
};

