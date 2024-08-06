export class StorageEntity {
  id: string;
  name: string;
  createdTime?: Date;
  modifiedTime?: Date;
  parentId?: string;
  mimeType: string;

  constructor({
    id,
    name,
    createdTime,
    modifiedTime,
    parentId,
    mimeType,
  }: {
    id: string;
    name: string;
    createdTime?: Date;
    modifiedTime?: Date;
    parentId?: string;
    mimeType: string;
  }) {
    this.id = id;
    this.name = name;
    this.createdTime = createdTime;
    this.modifiedTime = modifiedTime;
    this.parentId = parentId;
    this.mimeType = mimeType;
  }
}
