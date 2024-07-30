import { OmhStorageEntity } from './OmhStorageEntity';

export class OmhFolder extends OmhStorageEntity {
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
