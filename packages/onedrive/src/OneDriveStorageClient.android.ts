import {
  BaseNativeStorageClient,
  type IStorageAuthClient,
  type IStorageClient,
} from '@openmobilehub/storage-core';

import { ROOT_FOLDER } from './data/constants/constants';
import NativeOneDriveStorageClient from './NativeOneDriveStorageClient';
import { OneDriveStorageClient as RestOneDriveStorageClient } from './OneDriveStorageClient.ios';

export class OneDriveStorageClient
  extends BaseNativeStorageClient
  implements IStorageClient
{
  constructor(_authClient: IStorageAuthClient) {
    // TODO: [Fallback]: Remove fallback client
    const fallbackStorageClient = new RestOneDriveStorageClient(_authClient);

    super(NativeOneDriveStorageClient, ROOT_FOLDER, fallbackStorageClient);
  }
}
