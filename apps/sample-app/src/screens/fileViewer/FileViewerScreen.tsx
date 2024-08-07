import { useCallback, useEffect, useState } from 'react';
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
import { useRequireStorageClient } from '@/contexts/storage/useRequireStorageClient';
import { useFileListQuery } from '@/data/query/fileListQuery';
import { useDownloadFileQuery } from '@/data/query/useDownloadFileQuery';
import { useSearchFilesQuery } from '@/data/query/useSearchFilesQuery';
import { type RootStackParamList } from '@/navigation/RootNavigationContainer';

import { styles } from './FileViewerScreen.styles';
import { CreateFileBottomSheet } from './parts/CreateFileBottomSheet';

type Props = NativeStackScreenProps<RootStackParamList, 'FileViewer'>;
type SignedInRouteProp = Props['route'];
type SignedInNavigationProp = Props['navigation'];

export const FileViewerScreen = () => {
  const insets = useSafeAreaInsets();

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

  const [selectedFile, setSelectedFile] = useState<StorageEntity>();
  const downloadFileQuery = useDownloadFileQuery(storageClient, selectedFile);
  const searchFilesQuery = useSearchFilesQuery(
    storageClient,
    debouncedSearchQuery,
    debouncedSearchQuery.length > 0
  );

  useEffect(() => {
    if (downloadFileQuery.isSuccess) {
      setSelectedFile(undefined);
    }
  }, [downloadFileQuery.isSuccess]);

  const handleStorageEntityPress = (file: StorageEntity) => {
    if (file instanceof File) {
      setSelectedFile(file);
    } else {
      setSearchQuery('');
      navigation.push('FileViewer', {
        folderId: file.id,
        folderName: file.name,
      });
    }
  };

  const renderEmptyListComponent = useCallback(() => {
    if (fileListQuery.isLoading || searchFilesQuery.isLoading) {
      return <FullScreenLoadingState />;
    }

    return <FullScreenEmptyState />;
  }, [fileListQuery.isLoading, searchFilesQuery.isLoading]);

  const renderLoadingState = () => {
    if (downloadFileQuery.isLoading) {
      return (
        <Portal>
          <FullScreenLoadingState withBackground />
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
          style={styles.searchBar}
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
