import {
  BaseNativeStorageClient,
  type IStorageClient,
  type StorageAuthClient,
} from '@openmobilehub/storage-core';

import { ROOT_FOLDER } from './data/constants/constants';
import NativeDropboxStorageClient from './NativeDropboxStorageClient';

export class DropboxStorageClient
  extends BaseNativeStorageClient
  implements IStorageClient
{
  constructor(_authClient: StorageAuthClient) {
    super(NativeDropboxStorageClient, ROOT_FOLDER);
  }
}
