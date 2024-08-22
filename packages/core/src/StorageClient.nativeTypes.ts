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

export interface NativeStorageClient {
  initializeStorageClient(): void;
  listFiles(folderId: string): Promise<NativeStorageEntity[]>;
  downloadFile(fileId: string, filePath: string): Promise<void>;
  exportFile(fileId: string, mimeType: string, filePath: string): Promise<void>;
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
