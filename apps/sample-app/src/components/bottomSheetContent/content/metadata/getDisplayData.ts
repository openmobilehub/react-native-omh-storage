import { File, StorageEntityMetadata } from '@openmobilehub/storage-core';

export class DisplayEntry {
  constructor(
    public readonly label: string,
    public readonly value?: string
  ) {}
}

export const getDisplayData = (
  metadata: StorageEntityMetadata
): DisplayEntry[] => {
  let additionalEntries: DisplayEntry[] = [];

  const baseEntries = [
    new DisplayEntry('ID', metadata.entity.id),
    new DisplayEntry('Name', metadata.entity.name),
    new DisplayEntry('Created', metadata.entity.createdTime?.toString()),
    new DisplayEntry('Last Modified', metadata.entity.modifiedTime?.toString()),
    new DisplayEntry('Parent ID', metadata.entity.parentId),
  ];

  if (metadata.entity instanceof File) {
    additionalEntries = [
      new DisplayEntry('Mime Type', metadata.entity.mimeType),
      new DisplayEntry('Extension', metadata.entity.extension),
      new DisplayEntry('Size', metadata.entity.size?.toString()),
    ];
  }

  return [...baseEntries, ...additionalEntries];
};
