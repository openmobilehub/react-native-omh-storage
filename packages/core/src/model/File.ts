import { StorageEntity } from './StorageEntity';

export class File extends StorageEntity {
  mimeType?: string;
  extension?: string;
  size?: number;

  constructor({
    id,
    name,
    createdTime,
    modifiedTime,
    parentId,
    mimeType,
    extension,
    size,
  }: {
    id: string;
    name: string;
    createdTime?: Date;
    modifiedTime?: Date;
    parentId?: string;
    mimeType?: string;
    extension?: string;
    size?: number;
  }) {
    super({ id, name, createdTime, modifiedTime, parentId });

    this.mimeType = mimeType;
    this.extension = extension;
    this.size = size;
  }
}
