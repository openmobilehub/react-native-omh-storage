export class OmhStorageEntity {
  id: string;
  name: string;
  createdTime?: Date;
  modifiedTime?: Date;
  parentId?: string;

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
    this.id = id;
    this.name = name;
    this.createdTime = createdTime;
    this.modifiedTime = modifiedTime;
    this.parentId = parentId;
  }
}
