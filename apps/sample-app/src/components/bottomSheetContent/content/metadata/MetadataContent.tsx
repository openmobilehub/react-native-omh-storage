import { useState } from 'react';

import { StorageEntity } from '@openmobilehub/storage-core';
import { Text } from 'react-native-paper';

import { DisplayRow } from '@/components/bottomSheetContent/content/parts/DisplayRow/DisplayRow';
import { Checkbox } from '@/components/checkbox/Checkbox';
import { FullScreenLoadingState } from '@/components/fullScreenLoadingState';
import { useRequireStorageClient } from '@/contexts/storage/useRequireStorageClient';
import { useFileMetadataQuery } from '@/data/query/fileMetadataQuery';

import { BottomSheetContentWrapper } from '../../parts/BottomSheetContentWrapper/BottomSheetContentWrapper';
import { getDisplayData } from './getDisplayData';

interface Props {
  file: StorageEntity;
}

export const MetadataContent = ({ file }: Props) => {
  const storageClient = useRequireStorageClient();

  const fileMetadataQuery = useFileMetadataQuery(storageClient, file.id);

  const [showOriginalMetadata, setShowOriginalMetadata] = useState(false);

  if (fileMetadataQuery.isLoading) {
    return <FullScreenLoadingState />;
  }

  if (fileMetadataQuery.data) {
    const displayData = getDisplayData(fileMetadataQuery.data);

    return (
      <BottomSheetContentWrapper title="Metadata">
        <>
          {displayData.map((entry) => {
            return <DisplayRow displayEntry={entry} key={entry.label} />;
          })}
          <Checkbox
            value={showOriginalMetadata}
            onValueChange={setShowOriginalMetadata}
            label="Show original metadata"
          />
          {showOriginalMetadata && (
            <Text>{JSON.stringify(fileMetadataQuery.data, null, 2)}</Text>
          )}
        </>
      </BottomSheetContentWrapper>
    );
  }

  return null;
};
