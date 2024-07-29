import { Platform } from 'react-native';

import { AndroidClient } from '@openmobilehub/storage-core';

import IOSClient from './IOSClient';

export default function createModule() {
  const moduleName = 'GoogleDrive';
  const packageName = '@openmobilehub/storage-googledrive';

  return Platform.select({
    android: () =>
      new AndroidClient({
        moduleName,
        packageName,
        turboModule: require('./NativeGoogleDrive').default,
      }),
    ios: () => new IOSClient(),
    default: () => {
      throw new Error(`Module ${moduleName} is not available on this platform`);
    },
  })();
}
