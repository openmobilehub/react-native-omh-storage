import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

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

export interface Spec extends TurboModule {
  initializeStorageClient(): void;
  listFiles(folderId: string): Promise<NativeStorageEntity[]>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('StorageDropboxModule');
