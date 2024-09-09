import { useCallback, useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';

import { File, StorageEntity } from '@openmobilehub/storage-core';
import { useNavigation, useRoute } from '@react-navigation/native';
import { type NativeStackScreenProps } from '@react-navigation/native-stack';
import { Divider, Portal, Searchbar } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDebounce } from 'use-debounce';

import { FileListItem } from '@/components/FileListItem';
import { FullScreenEmptyState } from '@/components/fullScreenEmptyState';
import { FullScreenLoadingState } from '@/components/fullScreenLoadingState';
import { useSnackbar } from '@/contexts/snackbar/SnackbarContent';
import { useRequireStorageClient } from '@/contexts/storage/useRequireStorageClient';
import { useDownloadFileMutation } from '@/data/mutation/useDownloadFileMutation';
import { useFileListQuery } from '@/data/query/fileListQuery';
import { useSearchFilesQuery } from '@/data/query/useSearchFilesQuery';
import useCreateAdaptiveTheme from '@/hooks/useCreateAdaptiveTheme.ts';
import { type RootStackParamList } from '@/navigation/RootNavigationContainer';

import { styles } from './FileViewerScreen.styles';
import { CreateFileBottomSheet } from './parts/CreateFileBottomSheet';

type Props = NativeStackScreenProps<RootStackParamList, 'FileViewer'>;
type SignedInRouteProp = Props['route'];
type SignedInNavigationProp = Props['navigation'];

export const FileViewerScreen = () => {
  const insets = useSafeAreaInsets();

  const { showSnackbar } = useSnackbar();

  const route = useRoute<SignedInRouteProp>();
  const navigation = useNavigation<SignedInNavigationProp>();

  const { folderId } = route.params;

  const storageClient = useRequireStorageClient();

  const fileListQuery = useFileListQuery(
    storageClient,
    folderId || storageClient.rootFolderId
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);

  const downloadFileMutation = useDownloadFileMutation(storageClient);
  const searchFilesQuery = useSearchFilesQuery(
    storageClient,
    debouncedSearchQuery,
    debouncedSearchQuery.length > 0
  );

  const onDownloadFile = (file: StorageEntity) => {
    downloadFileMutation.mutate(
      { file },
      {
        onSuccess: () => {
          showSnackbar(`${file.name} file downloaded successfully!`);
        },
        onError: () => {
          showSnackbar(`Failed to download ${file.name} file!`);
        },
      }
    );
  };

  const handleStorageEntityPress = (file: StorageEntity) => {
    if (file instanceof File) {
      onDownloadFile(file);
    } else {
      setSearchQuery('');
      navigation.push('FileViewer', {
        folderId: file.id,
        folderName: file.name,
      });
    }
  };

  const theme = useCreateAdaptiveTheme();
  const searchBarStyle = useMemo(
    () => ({
      backgroundColor: theme.colors.background,
    }),
    [theme.colors.background]
  );

  const renderEmptyListComponent = useCallback(() => {
    if (fileListQuery.isLoading || searchFilesQuery.isLoading) {
      return <FullScreenLoadingState />;
    }

    return <FullScreenEmptyState />;
  }, [fileListQuery.isLoading, searchFilesQuery.isLoading]);

  const renderLoadingState = () => {
    if (downloadFileMutation.isPending) {
      return (
        <Portal>
          <FullScreenLoadingState overlay />
        </Portal>
      );
    }
  };

  const dataToShow = debouncedSearchQuery
    ? searchFilesQuery.data
    : fileListQuery.data;

  return (
    <>
      <View style={[styles.container, { paddingBottom: insets.bottom }]}>
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          style={searchBarStyle}
          value={searchQuery}
        />
        <Divider />
        <FlatList
          contentContainerStyle={styles.list}
          data={dataToShow}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={renderEmptyListComponent}
          onRefresh={fileListQuery.refetch}
          refreshing={fileListQuery.isFetching}
          renderItem={({ item }) => (
            <FileListItem file={item} onPress={handleStorageEntityPress} />
          )}
        />
      </View>
      <CreateFileBottomSheet folderId={folderId} />
      {renderLoadingState()}
    </>
  );
};
