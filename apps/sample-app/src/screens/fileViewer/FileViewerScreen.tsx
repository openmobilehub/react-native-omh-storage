import React, { useCallback } from 'react';
import { Button, FlatList, View } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import { type NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { type RootStackParamList } from '@/app/RootNavigationContainer';
import { FileListItem } from '@/components/FileListItem/FileListItem';
import { FullScreenEmptySpace } from '@/components/FullScreenEmptySpace';
import { FullScreenLoadingIndicator } from '@/components/FullScreenLoadingIndicator';
import { useAuthContext } from '@/contexts/auth/AuthContext';
import { useRequireStorageClient } from '@/contexts/storage/useRequireStorageClient';
import { useFileListQuery } from '@/data/query/fileListQuery';

import { File } from '../../../../../packages/googledrive/src/model/File';
import { StorageEntity } from '../../../../../packages/googledrive/src/model/StorageEntity';
import { styles } from './FileViewerScreen.styles';

type Props = NativeStackScreenProps<RootStackParamList, 'FileViewer'>;
type SignedInRouteProp = Props['route'];
type SignedInNavigationProp = Props['navigation'];

export default function FileViewerScreen() {
  const insets = useSafeAreaInsets();

  const route = useRoute<SignedInRouteProp>();
  const navigation = useNavigation<SignedInNavigationProp>();

  const { logout } = useAuthContext();

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
      <Button onPress={logout} title="Sign out" testID="sign-out" />
    </View>
  );
}
