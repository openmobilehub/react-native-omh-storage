export type NativeStorageEntity = {
  type: string;
  id?: string;
  name?: string;
  createdTime?: string;
  modifiedTime?: string;
  parentId?: string;
  mimeType?: string;
  extension?: string;
  size?: number;
};

export interface NativeStorageClient {
  createStorageClient(): void;
  listFiles(folderId: string): Promise<NativeStorageEntity[]>;
}
