import { NativeModules } from 'react-native';

export interface IClient {
  listFiles(): Promise<string[]>;
}

type AndroidClientConfig = {
  moduleName: string;
  packageName: string;
  turboModule: any;
};

export class AndroidClient implements IClient {
  private readonly nativeModule: any;

  constructor({ moduleName, packageName, turboModule }: AndroidClientConfig) {
    const LINKING_ERROR =
      `The package '${packageName}' doesn't seem to be linked. Make sure: \n\n` +
      '- You rebuilt the app after installing the package\n' +
      '- You are not using Expo Go\n';

    // @ts-expect-error
    const isTurboModuleEnabled = global.__turboModuleProxy != null;

    const nativeModule = isTurboModuleEnabled
      ? turboModule
      : NativeModules[moduleName];

    this.nativeModule =
      nativeModule ??
      new Proxy(
        {},
        {
          get() {
            throw new Error(LINKING_ERROR);
          },
        }
      );
  }

  listFiles(): Promise<string[]> {
    return this.nativeModule.listFiles();
  }
}
