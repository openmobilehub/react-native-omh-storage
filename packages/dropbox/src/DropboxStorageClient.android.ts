import {
  BaseNativeStorageClient,
  type IStorageAuthClient,
  type IStorageClient,
} from '@openmobilehub/storage-core';

import { ROOT_FOLDER } from './data/constants/constants';
import NativeDropboxStorageClient from './NativeDropboxStorageClient';

export class DropboxStorageClient
  extends BaseNativeStorageClient
  implements IStorageClient
{
  constructor(_authClient: IStorageAuthClient) {
    super(NativeDropboxStorageClient, ROOT_FOLDER);
  }
}
