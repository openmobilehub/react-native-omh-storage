import {
  BaseNativeStorageClient,
  type IStorageClient,
  type StorageAuthClient,
} from '@openmobilehub/storage-core';

import { ROOT_FOLDER } from './data/constants/constants';
import NativeOneDriveStorageClient from './NativeOneDriveStorageClient';

export class OneDriveStorageClient
  extends BaseNativeStorageClient
  implements IStorageClient
{
  constructor(_authClient: StorageAuthClient) {
    super(NativeOneDriveStorageClient, ROOT_FOLDER);
  }
}
