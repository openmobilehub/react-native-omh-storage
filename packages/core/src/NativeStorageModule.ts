import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

import type { StorageEntity } from './model/StorageEntity';
import type { LocalFile } from './StorageClient.types';

export interface Spec extends TurboModule {
  listFiles(): Promise<string[]>;
  localFileUpload(file: LocalFile, folderId: string): Promise<StorageEntity>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('RNOmhStorageModule');
