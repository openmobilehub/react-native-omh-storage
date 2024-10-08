import { useMemo, useState } from 'react';
import { View } from 'react-native';

import { Permission, StorageEntity } from '@openmobilehub/storage-core';
import { Button } from 'react-native-paper';

import {
  getDefaultRole,
  getRoleOptions,
  mapAddEditPermissionRoleToCore,
  mapCoreToAddEditPermissionRole,
} from '@/components/bottomSheetContent/content/permissions/model/AddEditPermissionRole';
import { BottomSheetContentWrapper } from '@/components/bottomSheetContent/parts/BottomSheetContentWrapper/BottomSheetContentWrapper';
import { FullScreenLoadingState } from '@/components/fullScreenLoadingState';
import Picker from '@/components/picker/Picker';
import { useAuthContext } from '@/contexts/auth/AuthContext.tsx';
import { useSnackbar } from '@/contexts/snackbar/SnackbarContent';
import { useRequireStorageClient } from '@/contexts/storage/useRequireStorageClient';
import { useUpdatePermissionMutation } from '@/data/mutation/useUpdatePermissionMutation';

import { styles } from './UpdatePermission.styles';

interface Props {
  file: StorageEntity;
  permission: Permission;
  onCancel: () => void;
  onSuccess: () => void;
}

export const UpdatePermission = ({
  file,
  permission,
  onCancel,
  onSuccess,
}: Props) => {
  const { provider } = useAuthContext();

  const [role, setRole] = useState(
    mapCoreToAddEditPermissionRole(permission.role) ?? getDefaultRole(provider)
  );

  const { showSnackbar } = useSnackbar();
  const storageClient = useRequireStorageClient();
  const updatePermissionMutation = useUpdatePermissionMutation(storageClient);

  const roleOptions = useMemo(() => {
    return getRoleOptions(provider);
  }, [provider]);

  const handleEditPermission = () => {
    updatePermissionMutation.mutate(
      {
        fileId: file.id,
        permissionId: permission.id,
        role: mapAddEditPermissionRoleToCore(role),
      },
      {
        onSuccess: () => {
          showSnackbar(`Permission edited`);
          onSuccess();
        },
      }
    );
  };

  if (updatePermissionMutation.isPending) {
    return <FullScreenLoadingState />;
  }

  return (
    <BottomSheetContentWrapper title="Edit Permission">
      <Picker
        value={role}
        label={'Role'}
        choices={roleOptions}
        onChange={setRole}
      />

      <View style={styles.footer}>
        <Button
          mode="contained"
          onPress={onCancel}
          testID="permission-edit-cancel"
        >
          Cancel
        </Button>
        <Button
          mode="contained"
          onPress={handleEditPermission}
          testID="permission-edit-create"
        >
          Save
        </Button>
      </View>
    </BottomSheetContentWrapper>
  );
};
