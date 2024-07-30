import React, { useCallback } from 'react';
import { FlatList, View } from 'react-native';

import { OmhFile, OmhStorageEntity } from '@openmobilehub/storage-core';
import { useNavigation, useRoute } from '@react-navigation/native';
import { type NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { FileListItem } from '@/components/FileListItem/FileListItem';
import { FullScreenEmptySpace } from '@/components/FullScreenEmptySpace';
import { FullScreenLoadingIndicator } from '@/components/FullScreenLoadingIndicator';
import { useRequireStorageClient } from '@/contexts/storage/useRequireStorageClient';
import { useFileListQuery } from '@/data/query/fileListQuery';
import { type RootStackParamList } from '@/navigation/RootNavigationContainer';

import { styles } from './FileViewerScreen.styles';

type Props = NativeStackScreenProps<RootStackParamList, 'FileViewer'>;
type SignedInRouteProp = Props['route'];
type SignedInNavigationProp = Props['navigation'];

export default function FileViewerScreen() {
  const insets = useSafeAreaInsets();

  const route = useRoute<SignedInRouteProp>();
  const navigation = useNavigation<SignedInNavigationProp>();

  const { folderId } = route.params;

  const storageClient = useRequireStorageClient();

  const fileListQuery = useFileListQuery(
    storageClient,
    folderId || storageClient.rootFolderId
  );

  const handleStorageEntityPress = (file: OmhStorageEntity) => {
    if (file instanceof OmhFile) {
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
      return <FullScreenLoadingIndicator />;
    }

    return <FullScreenEmptySpace />;
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
}
