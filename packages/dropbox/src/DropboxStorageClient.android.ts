import {
  BaseNativeStorageClient,
  type IStorageAuthClient,
  type IStorageClient,
} from '@openmobilehub/storage-core';

import { ROOT_FOLDER } from './data/constants/constants';
import { DropboxStorageClient as RestDropboxStorageClient } from './DropboxStorageClient.ios';
import NativeDropboxStorageClient from './NativeDropboxStorageClient';

export class DropboxStorageClient
  extends BaseNativeStorageClient
  implements IStorageClient
{
  constructor(_authClient: IStorageAuthClient) {
    //TODO: [Fallback]: Remove fallback client
    const fallbackClient = new RestDropboxStorageClient(_authClient);

    super(NativeDropboxStorageClient, ROOT_FOLDER, fallbackClient);
  }
}
