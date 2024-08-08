import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

type NativeStorageEntity = {
  id: string;
};

export interface Spec extends TurboModule {
  createStorageClient(reflectionPath: string): string;
  listFiles(clientId: string, folderId: string): Promise<NativeStorageEntity>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('RNOmhStorageCoreModule');
