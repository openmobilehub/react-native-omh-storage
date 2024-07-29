import { StorageEntity } from './StorageEntity';

export class Folder extends StorageEntity {
  constructor({
    id,
    name,
    createdTime,
    modifiedTime,
    parentId,
  }: {
    id: string;
    name: string;
    createdTime?: Date;
    modifiedTime?: Date;
    parentId?: string;
  }) {
    super({ id, name, createdTime, modifiedTime, parentId });
  }
}
