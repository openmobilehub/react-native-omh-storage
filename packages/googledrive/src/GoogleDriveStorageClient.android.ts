import {
  BaseNativeStorageClient,
  type IStorageClient,
  type StorageAuthClient,
} from '@openmobilehub/storage-core';

import { ROOT_FOLDER } from './data/constants/constants';
import NativeGoogleDriveStorageClient from './NativeGoogleDriveStorageClient';

export class GoogleDriveStorageClient
  extends BaseNativeStorageClient
  implements IStorageClient
{
  constructor(_authClient: StorageAuthClient) {
    super(NativeGoogleDriveStorageClient, ROOT_FOLDER);
  }
}
