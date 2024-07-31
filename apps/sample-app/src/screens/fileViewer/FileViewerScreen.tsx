import { useCallback } from 'react';
import { FlatList, View } from 'react-native';

import { File, StorageEntity } from '@openmobilehub/storage-core';
import { useNavigation, useRoute } from '@react-navigation/native';
import { type NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { FileListItem } from '@/components/FileListItem';
import { FullScreenEmptyState } from '@/components/fullScreenEmptyState';
import { FullScreenLoadingState } from '@/components/fullScreenLoadingState';
import { useRequireStorageClient } from '@/contexts/storage/useRequireStorageClient';
import { useFileListQuery } from '@/data/query/fileListQuery';
import { type RootStackParamList } from '@/navigation/RootNavigationContainer';

import { styles } from './FileViewerScreen.styles';

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

  const handleStorageEntityPress = (file: StorageEntity) => {
    if (file instanceof File) {
      //TODO: Handle file press
    } else {
      navigation.push('FileViewer', {
        folderId: file.id,
        folderName: file.name,
      });
    }
  };

  const renderEmptyListComponent = useCallback(() => {
    if (fileListQuery.isLoading) {
      return <FullScreenLoadingState />;
    }

    return <FullScreenEmptyState />;
  }, [fileListQuery.isLoading]);

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <FlatList
        contentContainerStyle={styles.list}
        data={fileListQuery.data}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={renderEmptyListComponent}
        renderItem={({ item }) => (
          <FileListItem file={item} onPress={handleStorageEntityPress} />
        )}
      />
    </View>
  );
};
