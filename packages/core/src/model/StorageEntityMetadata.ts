import type { StorageEntity } from './StorageEntity';

export class StorageEntityMetadata {
  entity: StorageEntity;
  originalMetadata: any;

  constructor({
    entity,
    originalMetadata,
  }: {
    entity: StorageEntity;
    originalMetadata: any;
  }) {
    this.entity = entity;
    this.originalMetadata = originalMetadata;
  }
}
