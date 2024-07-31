import { File, StorageEntityMetadata } from '@openmobilehub/storage-core';

export class DisplayEntry {
  constructor(
    public readonly label: string,
    public readonly value?: string
  ) {}
}

export const getDisplayData = ({
  entity,
}: StorageEntityMetadata): DisplayEntry[] => {
  let additionalEntries: DisplayEntry[] = [];

  const baseEntries = [
    new DisplayEntry('ID', entity.id),
    new DisplayEntry('Name', entity.name),
    new DisplayEntry('Created', entity.createdTime?.toString()),
    new DisplayEntry('Last Modified', entity.modifiedTime?.toString()),
    new DisplayEntry('Parent ID', entity.parentId),
  ];

  if (entity instanceof File) {
    additionalEntries = [
      new DisplayEntry('Mime Type', entity.mimeType),
      new DisplayEntry('Extension', entity.extension),
      new DisplayEntry('Size', entity.size?.toString()),
    ];
  }

  return [...baseEntries, ...additionalEntries];
};
