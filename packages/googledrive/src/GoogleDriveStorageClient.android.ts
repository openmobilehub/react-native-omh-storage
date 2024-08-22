import {
  BaseNativeStorageClient,
  type IStorageAuthClient,
  type IStorageClient,
} from '@openmobilehub/storage-core';

import { ROOT_FOLDER } from './data/constants/constants';
import { GoogleDriveStorageClient as RestGoogleDriveStorageClient } from './GoogleDriveStorageClient.ios';
import NativeGoogleDriveStorageClient from './NativeGoogleDriveStorageClient';

export class GoogleDriveStorageClient
  extends BaseNativeStorageClient
  implements IStorageClient
{
  constructor(_authClient: IStorageAuthClient) {
    //TODO: [Fallback]: Remove fallback client
    const fallbackStorageClient = new RestGoogleDriveStorageClient(_authClient);

    super(NativeGoogleDriveStorageClient, ROOT_FOLDER, fallbackStorageClient);
  }
}
