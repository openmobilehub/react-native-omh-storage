import { useMemo } from 'react';
import { View } from 'react-native';

import { Permission, StorageEntity } from '@openmobilehub/storage-core';
import Clipboard from '@react-native-clipboard/clipboard';
import { Button, Divider, Text } from 'react-native-paper';

import { getDisplayData } from '@/components/bottomSheetContent/content/permissions/list/getDisplayData';
import Accordion from '@/components/bottomSheetContent/content/permissions/list/parts/AccordionText/Accordion.tsx';
import { PermissionItem } from '@/components/bottomSheetContent/content/permissions/list/parts/PermissionItem/PermissionItem';
import { BottomSheetContentWrapper } from '@/components/bottomSheetContent/parts/BottomSheetContentWrapper/BottomSheetContentWrapper';
import { FullScreenLoadingState } from '@/components/fullScreenLoadingState';
import { Provider } from '@/constants/provider.ts';
import { PERMISSION_CAVEATS_DROPBOX } from '@/constants/text.ts';
import { useAuthContext } from '@/contexts/auth/AuthContext.tsx';
import { useSnackbar } from '@/contexts/snackbar/SnackbarContent';
import { useRequireStorageClient } from '@/contexts/storage/useRequireStorageClient';
import { useDeletePermissionMutation } from '@/data/mutation/useDeletePermissionMutation';
import { useFilePermissionsQuery } from '@/data/query/filePermissionsQuery';

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
  const { showSnackbar } = useSnackbar();
  const { provider } = useAuthContext();
  const storageClient = useRequireStorageClient();
  const filePermissionsQuery = useFilePermissionsQuery(storageClient, file.id);
  const deletePermissionMutation = useDeletePermissionMutation(storageClient);

  const caveatsText = useMemo(() => {
    switch (provider) {
      case Provider.GOOGLEDRIVE:
      case Provider.ONEDRIVE:
        return undefined;
      case Provider.DROPBOX:
        return PERMISSION_CAVEATS_DROPBOX;
    }
  }, [provider]);

  if (filePermissionsQuery.isLoading || deletePermissionMutation.isPending) {
    return <FullScreenLoadingState />;
  }

  const permissions = filePermissionsQuery.data;

  if (!permissions) {
    return null;
  }

  const handleGetUrl = async () => {
    const webUrl = await storageClient.getWebUrl(file.id);
    if (webUrl) {
      Clipboard.setString(webUrl);
      showSnackbar('URL copied to clipboard');
    } else {
      showSnackbar('There is no URL');
    }
  };

  const handleDeletePermission = (permissionId: string) => {
    deletePermissionMutation.mutate(
      {
        fileId: file.id,
        permissionId: permissionId,
      },
      {
        onSuccess: () => {
          showSnackbar(`Permission deleted`);
        },
      }
    );
  };

  const comparePermissions = (a: Permission, b: Permission): number => {
    return getPermissionOrder(a) - getPermissionOrder(b);
  };

  const getPermissionOrder = (permission: Permission): number => {
    switch (permission.role) {
      case 'owner':
        return 0;
      case 'writer':
        return 1;
      case 'commenter':
        return 2;
      case 'reader':
        return 3;
    }
  };

  return (
    <BottomSheetContentWrapper title="Permissions">
      <View style={styles.container}>
        <View style={styles.header}>
          {caveatsText && (
            <View style={styles.caveats}>
              <Accordion title="Caveats">
                <Text>{caveatsText}</Text>
              </Accordion>
              <Divider style={styles.divider} />
            </View>
          )}

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
          {permissions.sort(comparePermissions).map((permission) => {
            const displayData = getDisplayData(permission);
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
};
