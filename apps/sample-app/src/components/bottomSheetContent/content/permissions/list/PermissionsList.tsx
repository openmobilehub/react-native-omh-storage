import { View } from 'react-native';

import { Permission, StorageEntity } from '@openmobilehub/storage-core';
import Clipboard from '@react-native-clipboard/clipboard';
import { Button, Text } from 'react-native-paper';
import Toast from 'react-native-root-toast';

import { getDisplayData } from '@/components/bottomSheetContent/content/permissions/list/getDisplayData.ts';
import { PermissionItem } from '@/components/bottomSheetContent/content/permissions/list/parts/PermissionItem/PermissionItem.tsx';
import { BottomSheetContentWrapper } from '@/components/bottomSheetContent/parts/BottomSheetContentWrapper/BottomSheetContentWrapper.tsx';
import { FullScreenLoadingState } from '@/components/fullScreenLoadingState';
import { useRequireStorageClient } from '@/contexts/storage/useRequireStorageClient.ts';
import { useDeletePermissionMutation } from '@/data/mutation/useDeletePermissionMutation.ts';
import { useFilePermissionsQuery } from '@/data/query/filePermissionsQuery.ts';

import { styles } from './PermissionsList.styles';

interface Props {
  file: StorageEntity;
  onEditPermission: (permission: Permission) => void;
  onAddPermission: () => void;
}

export const PermissionsList = ({
  file,
  onEditPermission,
  onAddPermission,
}: Props) => {
  const storageClient = useRequireStorageClient();

  const filePermissionsQuery = useFilePermissionsQuery(storageClient, file.id);

  const deletePermissionMutation = useDeletePermissionMutation(storageClient);

  if (filePermissionsQuery.isLoading || deletePermissionMutation.isPending) {
    return <FullScreenLoadingState />;
  }

  const permissions = filePermissionsQuery.data;

  if (permissions) {
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
      deletePermissionMutation.mutate(
        {
          fileId: file.id,
          permissionId: permissionId,
        },
        {
          onSuccess: () => {
            Toast.show(`Permission deleted`);
          },
        }
      );
    };

    return (
      <BottomSheetContentWrapper title="Permissions">
        <View style={styles.container}>
          <View style={styles.header}>
            <Text variant="labelLarge">{file.name}</Text>
            <Button
              style={styles.button}
              mode="contained"
              onPress={onAddPermission}
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
            {permissions.map((permission) => {
              let displayData = getDisplayData(permission);
              return (
                <PermissionItem
                  key={displayData.id}
                  displayPermission={displayData}
                  onDelete={handleDeletePermission}
                  onUpdate={() => {
                    onEditPermission(permission);
                  }}
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
