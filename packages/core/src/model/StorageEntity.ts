export class StorageEntity {
  id: string;
  name: string;
  mimeType?: string;
  createdTime?: Date;
  modifiedTime?: Date;
  parentId?: string;
  extension?: string;

  constructor({
    id,
    name,
    mimeType,
    createdTime,
    modifiedTime,
    parentId,
    extension,
  }: {
    id: string;
    name: string;
    mimeType?: string;
    createdTime?: Date;
    modifiedTime?: Date;
    parentId?: string;
    extension?: string;
  }) {
    this.id = id;
    this.name = name;
    this.mimeType = mimeType;
    this.createdTime = createdTime;
    this.modifiedTime = modifiedTime;
    this.parentId = parentId;
    this.extension = extension;
  }
}
