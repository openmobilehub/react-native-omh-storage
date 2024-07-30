import type { IClient } from './client.types';
import NativeCore from './NativeCore';

export class Client implements IClient {
  listFiles(): Promise<string[]> {
    return NativeCore.listFiles();
  }
}
