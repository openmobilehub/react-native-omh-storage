import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

import type { Double } from 'react-native/Libraries/Types/CodegenTypes';

type NativeStorageEntity = {
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

export interface Spec extends TurboModule {
  initializeStorageClient(): void;
  listFiles(folderId: string): Promise<NativeStorageEntity[]>;
  downloadFile(fileId: string): Promise<string>;
  exportFile(fileId: string, mimeType: string): Promise<string>;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'StorageGoogleDriveModule'
);
