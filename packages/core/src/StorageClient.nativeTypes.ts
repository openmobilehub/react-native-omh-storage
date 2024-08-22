import type { Double } from 'react-native/Libraries/Types/CodegenTypes';

export type NativeStorageEntity = {
  type: string;
  id: string;
  name: string;
  createdTime?: Double;
  modifiedTime?: Double;
  parentId?: string;
  mimeType?: string;
  extension?: string;
  size?: number;
};

export type NativeStorageEntityMetadata = {
  entity: NativeStorageEntity;
  originalMetadata: string;
};

export interface NativeStorageClient {
  initializeStorageClient(): void;
  listFiles(folderId: string): Promise<NativeStorageEntity[]>;
  getFileMetadata(fileId: string): Promise<NativeStorageEntityMetadata>;
  uploadFile(
    fileName: string,
    uri: string,
    folderId: string
  ): Promise<NativeStorageEntity>;
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
