import {
  BaseNativeStorageClient,
  type IStorageClient,
} from '@openmobilehub/storage-core';

import { ROOT_FOLDER } from './data/constants/constants';
import NativeGoogleDriveStorageClient from './NativeGoogleDriveStorageClient';

export class GoogleDriveStorageClient
  extends BaseNativeStorageClient
  implements IStorageClient
{
  constructor() {
    console.warn('HERE');
    super(NativeGoogleDriveStorageClient, ROOT_FOLDER);
  }
}
