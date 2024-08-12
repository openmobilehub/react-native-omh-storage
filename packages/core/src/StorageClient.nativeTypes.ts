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
  initializeStorageClient(): void;
  listFiles(folderId: string): Promise<NativeStorageEntity[]>;
}

export type NativeStorageException = Error & {
  nativeStackAndroid: any[];
  userInfo: NativeStorageExceptionUserInfo;
};

export type NativeStorageExceptionUserInfo = {
  type: string;
  message: string;
  statusCode?: number;
};
