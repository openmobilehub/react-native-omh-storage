import { View } from 'react-native';

import { StorageEntity } from '@openmobilehub/storage-core';
import Clipboard from '@react-native-clipboard/clipboard';
import { Button, Text } from 'react-native-paper';
import Toast from 'react-native-root-toast';

import { getDisplayData } from '@/components/bottomSheetContent/content/permissions/getDisplayData.ts';
import { PermissionItem } from '@/components/bottomSheetContent/content/permissions/parts/PermissionItem/PermissionItem.tsx';
import { FullScreenLoadingState } from '@/components/fullScreenLoadingState';
import { useRequireStorageClient } from '@/contexts/storage/useRequireStorageClient.ts';
import { useFilePermissionsQuery } from '@/data/query/filePermissionsQuery.ts';

import { BottomSheetContentWrapper } from '../../parts/BottomSheetContentWrapper/BottomSheetContentWrapper';
import { styles } from './PermissionsContent.styles';

interface Props {
  file: StorageEntity;
}

export const PermissionsContent = ({ file }: Props) => {
  const storageClient = useRequireStorageClient();

  const filePermissionsQuery = useFilePermissionsQuery(storageClient, file.id);

  if (filePermissionsQuery.isLoading) {
    return <FullScreenLoadingState />;
  }

  const permissions = filePermissionsQuery.data;

  if (permissions) {
    const displayData = getDisplayData(permissions);

    const handleAddPermission = () => {
      // TODO dn: implementation
    };

    const handleGetUrl = () => {
      storageClient.getWebUrl(file.id).then((webUrl) => {
        if (webUrl) {
          Clipboard.setString(webUrl);
          Toast.show('URL copied to clipboard');
        } else {
          Toast.show('There is no URL');
        }
      });
    };

    const handleDeletePermission = (permissionId: string) => {
      // TODO dn: implementation
      console.log(permissionId);
    };

    const handleUpdatePermission = (permissionId: string) => {
      // TODO dn: implementation
      console.log(permissionId);
    };

    return (
      <BottomSheetContentWrapper title="Permissions">
        <View style={styles.container}>
          <View style={styles.header}>
            <Text variant="labelLarge">{file.name}</Text>
            <Button
              style={styles.button}
              mode="contained"
              onPress={handleAddPermission}
              testID="permission-add"
            >
              Add permission
            </Button>
            <Button
              style={styles.button}
              mode="contained"
              onPress={handleGetUrl}
              testID="permission-get-url"
            >
              Get URL
            </Button>
          </View>
          <>
            {displayData.map((entry) => {
              return (
                <PermissionItem
                  key={entry.id}
                  displayPermission={entry}
                  onDelete={handleDeletePermission}
                  onUpdate={handleUpdatePermission}
                />
              );
            })}
          </>
        </View>
      </BottomSheetContentWrapper>
    );
  }

  return null;
};
