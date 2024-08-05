import { useState } from 'react';
import { View } from 'react-native';

import { Permission, StorageEntity } from '@openmobilehub/storage-core';
import { Button } from 'react-native-paper';
import Toast from 'react-native-root-toast';

import { styles } from '@/components/bottomSheetContent/content/permissions/create/CreatePermission.styles.ts';
import {
  AddEditPermissionRole,
  mapAddEditPermissionRoleToCore,
  mapCoreToAddEditPermissionRole,
  roleOptions,
} from '@/components/bottomSheetContent/content/permissions/model/AddEditPermissionRole.ts';
import { BottomSheetContentWrapper } from '@/components/bottomSheetContent/parts/BottomSheetContentWrapper/BottomSheetContentWrapper.tsx';
import { FullScreenLoadingState } from '@/components/fullScreenLoadingState';
import Picker from '@/components/picker/Picker.tsx';
import { useRequireStorageClient } from '@/contexts/storage/useRequireStorageClient.ts';
import { useUpdatePermissionMutation } from '@/data/mutation/useUpdatePermissionMutation.ts';

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
  const [role, setRole] = useState(
    mapCoreToAddEditPermissionRole(permission.role) ??
      AddEditPermissionRole.READER
  );

  const storageClient = useRequireStorageClient();
  const updatePermissionMutation = useUpdatePermissionMutation(storageClient);

  const handleEditPermission = () => {
    updatePermissionMutation.mutate(
      {
        fileId: file.id,
        permissionId: permission.id,
        role: mapAddEditPermissionRoleToCore(role),
      },
      {
        onSuccess: () => {
          Toast.show(`Permission edited`);
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
