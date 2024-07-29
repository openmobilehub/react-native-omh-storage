import type { IClient } from '@openmobilehub/storage-core';

export default class IOSClient implements IClient {
  async listFiles(): Promise<string[]> {
    return ['file1', 'file2'];
  }
}
