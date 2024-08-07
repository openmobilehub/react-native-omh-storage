import { useState } from 'react';
import { View } from 'react-native';

import { Permission, StorageEntity } from '@openmobilehub/storage-core';

import { CreatePermission } from '@/components/bottomSheetContent/content/permissions/create/CreatePermission';
import { PermissionsList } from '@/components/bottomSheetContent/content/permissions/list/PermissionsList';
import { PermissionsContentTypes } from '@/components/bottomSheetContent/content/permissions/PermissionsContent.types';
import { UpdatePermission } from '@/components/bottomSheetContent/content/permissions/update/UpdatePermission';

interface Props {
  file: StorageEntity;
}

type PermissionContentState =
  | { view: PermissionsContentTypes.Add }
  | { view: PermissionsContentTypes.Edit; selectedPermission: Permission }
  | { view: PermissionsContentTypes.List };

export const PermissionsContent = ({ file }: Props) => {
  const [state, setState] = useState<PermissionContentState>({
    view: PermissionsContentTypes.List,
  });

  const openListView = () => {
    setState({ view: PermissionsContentTypes.List });
  };

  const openEditView = (permission: Permission) => {
    setState({
      view: PermissionsContentTypes.Edit,
      selectedPermission: permission,
    });
  };

  const openAddView = () => {
    setState({ view: PermissionsContentTypes.Add });
  };

  const renderContent = () => {
    switch (state.view) {
      case PermissionsContentTypes.Add:
        return (
          <CreatePermission
            file={file}
            onCancel={openListView}
            onSuccess={openListView}
          />
        );
      case PermissionsContentTypes.Edit:
        return (
          <UpdatePermission
            file={file}
            permission={state.selectedPermission}
            onCancel={openListView}
            onSuccess={openListView}
          />
        );
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
