import { useState } from 'react';
import { View } from 'react-native';

import { Permission, StorageEntity } from '@openmobilehub/storage-core';

import { CreatePermission } from '@/components/bottomSheetContent/content/permissions/create/CreatePermission.tsx';
import { PermissionsList } from '@/components/bottomSheetContent/content/permissions/list/PermissionsList.tsx';
import { PermissionsContentTypes } from '@/components/bottomSheetContent/content/permissions/PermissionsContent.types.ts';
import { UpdatePermission } from '@/components/bottomSheetContent/content/permissions/update/UpdatePermission.tsx';

interface Props {
  file: StorageEntity;
}

export const PermissionsContent = ({ file }: Props) => {
  const [view, setView] = useState<PermissionsContentTypes>(
    PermissionsContentTypes.List
  );

  const [selectedPermission, setSelectedPermission] = useState<
    Permission | undefined
  >(undefined);

  const openListView = () => {
    setView(PermissionsContentTypes.List);
  };

  const openEditView = (permission: Permission) => {
    setSelectedPermission(permission);
    setView(PermissionsContentTypes.Edit);
  };

  const openAddView = () => {
    setView(PermissionsContentTypes.Add);
  };

  const renderContent = () => {
    switch (view) {
      case PermissionsContentTypes.Add:
        return (
          <CreatePermission
            file={file}
            onCancel={openListView}
            onSuccess={openListView}
          />
        );
      case PermissionsContentTypes.Edit:
        if (selectedPermission) {
          return (
            <UpdatePermission
              file={file}
              permission={selectedPermission}
              onCancel={openListView}
              onSuccess={openListView}
            />
          );
        } else {
          return null;
        }
      case PermissionsContentTypes.List:
        return (
          <PermissionsList
            file={file}
            onAddPermission={openAddView}
            onEditPermission={openEditView}
          />
        );
    }
  };

  return <View>{renderContent()}</View>;
};
