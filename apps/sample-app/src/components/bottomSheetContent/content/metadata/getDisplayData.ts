import { File, StorageEntityMetadata } from '@openmobilehub/storage-core';

import { DisplayEntry } from '@/components/bottomSheetContent/content/parts/DisplayRow/DisplayEntry.types.ts';

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
