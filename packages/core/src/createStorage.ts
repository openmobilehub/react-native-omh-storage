import NativeOmhStorageModule from './NativeOmhStorageModule';

export const createStorage = (reflectionPath: string) => {
  const clientId = NativeOmhStorageModule.createStorageClient(reflectionPath);

  return {
    listFiles: (folderId: string) =>
      NativeOmhStorageModule.listFiles(clientId, folderId),
  };
};
