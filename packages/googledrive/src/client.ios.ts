import type { IClient } from '@openmobilehub/storage-core';

export class Client implements IClient {
  async listFiles(): Promise<string[]> {
    return ['file1', 'file2'];
  }
}
