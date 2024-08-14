import { Fragment, useState } from 'react';

import { StorageEntity } from '@openmobilehub/storage-core';
import { ActivityIndicator, Divider, List, Text } from 'react-native-paper';

import { FullScreenLoadingState } from '@/components/fullScreenLoadingState';
import { useSnackbar } from '@/contexts/snackbar/SnackbarContent';
import { useRequireStorageClient } from '@/contexts/storage/useRequireStorageClient';
import { useDownloadFileVersionMutation } from '@/data/mutation/useDownloadFileVersionMutation';
import { useFileVersionsQuery } from '@/data/query/useFileVersionsQuery';

import { BottomSheetContentWrapper } from '../../parts/BottomSheetContentWrapper/BottomSheetContentWrapper';
import { styles } from './VersionsContent.styles';

interface Props {
  file: StorageEntity;
}

export const VersionsContent = ({ file }: Props) => {
  const { showSnackbar } = useSnackbar();
  const storageClient = useRequireStorageClient();

  const fileVersionsQuery = useFileVersionsQuery(storageClient, file.id);

  const downloadFileVersionMutation =
    useDownloadFileVersionMutation(storageClient);

  const [currentlyDownloadingVersions, setCurrentlyDownloadingVersions] =
    useState<Record<string, boolean>>({});

  const renderIdex = (index: number) => (
    <Text style={styles.index}>{index + 1}.</Text>
  );

  const renderDownloadIcon = (versionId: string) => {
    if (currentlyDownloadingVersions[versionId]) {
      return <ActivityIndicator size="small" />;
    }

    return <List.Icon icon="download" />;
  };

  const handlePress = (versionId: string) => {
    setCurrentlyDownloadingVersions((prev) => ({
      ...prev,
      [versionId]: true,
    }));

    downloadFileVersionMutation.mutate(
      { file, versionId },
      {
        onSuccess() {
          showSnackbar(`${file.name} file downloaded successfully!`);
        },
        onError() {
          showSnackbar(`Failed to download ${file.name} file`);
        },
        onSettled() {
          setCurrentlyDownloadingVersions((prev) => ({
            ...prev,
            [versionId]: false,
          }));
        },
      }
    );
  };

  if (fileVersionsQuery.isLoading) {
    return <FullScreenLoadingState />;
  }

  if (fileVersionsQuery.data) {
    return (
      <BottomSheetContentWrapper title="Versions">
        {fileVersionsQuery.data.map((version, index) => (
          <Fragment key={version.versionId}>
            <List.Item
              left={() => renderIdex(index)}
              title={version.lastModified.toISOString()}
              right={() => renderDownloadIcon(version.versionId)}
              onPress={() => handlePress(version.versionId)}
            />
            <Divider />
          </Fragment>
        ))}
      </BottomSheetContentWrapper>
    );
  }

  return null;
};
