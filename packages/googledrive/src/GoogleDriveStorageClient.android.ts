import {
  BaseNativeStorageClient,
  type IStorageAuthClient,
  type IStorageClient,
} from '@openmobilehub/storage-core';

import { ROOT_FOLDER } from './data/constants/constants';
import NativeGoogleDriveStorageClient from './NativeGoogleDriveStorageClient';

export class GoogleDriveStorageClient
  extends BaseNativeStorageClient
  implements IStorageClient
{
  constructor(_authClient: IStorageAuthClient) {
    super(NativeGoogleDriveStorageClient, ROOT_FOLDER);
  }
}
