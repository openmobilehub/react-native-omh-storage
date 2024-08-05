import { useMemo, useState } from 'react';
import { View } from 'react-native';

import {
  CreateAnyonePermission,
  CreateDomainPermission,
  CreateGroupPermission,
  CreatePermission,
  CreateUserPermission,
  StorageEntity,
} from '@openmobilehub/storage-core';
import { ActivityIndicator, Button } from 'react-native-paper';
import Toast from 'react-native-root-toast';

import {
  AddEditPermissionRole,
  mapAddEditPermissionRoleToCore,
} from '@/components/bottomSheetContent/content/permissions/model/AddEditPermissionRole.ts';
import { AddEditPermissionType } from '@/components/bottomSheetContent/content/permissions/model/AddEditPermissionType.ts';
import { BottomSheetContentWrapper } from '@/components/bottomSheetContent/parts/BottomSheetContentWrapper/BottomSheetContentWrapper.tsx';
import { BottomSheetTextInput } from '@/components/bottomSheetTextInput';
import { Checkbox } from '@/components/checkbox/Checkbox.tsx';
import Picker from '@/components/picker/Picker.tsx';
import { useRequireStorageClient } from '@/contexts/storage/useRequireStorageClient.ts';
import { useCreatePermissionMutation } from '@/data/mutation/useCreatePermissionMutation.ts';

import { styles } from './AddPermission.styles.ts';

interface Props {
  file: StorageEntity;
  onCancel: () => void;
  onSuccess: () => void;
}

export const AddPermission = ({ file, onCancel, onSuccess }: Props) => {
  const [type, setType] = useState(AddEditPermissionType.USER);
  const typeOptions = useMemo(() => {
    return Object.entries(AddEditPermissionType).map(([key, label]) => ({
      key,
      label,
      value: label,
    }));
  }, []);

  const [role, setRole] = useState(AddEditPermissionRole.READER);
  const roleOptions = useMemo(() => {
    return Object.entries(AddEditPermissionRole).map(([key, label]) => ({
      key,
      label,
      value: label,
    }));
  }, []);

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sendNotification, setSendNotification] = useState(false);

  const [domain, setDomain] = useState('');

  const storageClient = useRequireStorageClient();

  const createPermissionMutation = useCreatePermissionMutation(storageClient);

  const getCreatePermission = (): CreatePermission => {
    const permissionRole = mapAddEditPermissionRoleToCore(role);
    switch (type) {
      case AddEditPermissionType.USER:
        return new CreateUserPermission({
          role: permissionRole,
          emailAddress: email,
        });
      case AddEditPermissionType.GROUP:
        return new CreateGroupPermission({
          role: permissionRole,
          emailAddress: email,
        });
      case AddEditPermissionType.Domain:
        return new CreateDomainPermission({
          role: permissionRole,
          domain: domain,
        });
      case AddEditPermissionType.Anyone:
        return new CreateAnyonePermission({
          role: permissionRole,
        });
    }
  };

  const handleCreatePermission = () => {
    let createPermission = getCreatePermission();

    createPermissionMutation.mutate(
      {
        fileId: file.id,
        permission: createPermission,
        sendNotificationEmail: sendNotification,
        emailMessage: message,
      },
      {
        onSuccess: () => {
          Toast.show(`Permission added`);
          onSuccess();
        },
      }
    );
  };

  const renderLoading = () => {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  };

  const renderContent = () => {
    return (
      <>
        <Picker
          value={type}
          label={'Type'}
          choices={typeOptions}
          onChange={setType}
        />
        <Picker
          value={role}
          label={'Role'}
          choices={roleOptions}
          onChange={setRole}
        />

        {(type === AddEditPermissionType.USER ||
          type === AddEditPermissionType.GROUP) && (
          <View>
            <BottomSheetTextInput
              mode={'outlined'}
              label="Email"
              value={email}
              onChangeText={setEmail}
            />
            <Checkbox
              value={sendNotification}
              onValueChange={setSendNotification}
              label={'Send notification email'}
            />
            <BottomSheetTextInput
              mode={'outlined'}
              label="Optional email message"
              value={message}
              onChangeText={setMessage}
            />
          </View>
        )}

        {type === AddEditPermissionType.Domain && (
          <BottomSheetTextInput
            mode={'outlined'}
            label="Domain"
            value={domain}
            onChangeText={setDomain}
          />
        )}

        <View style={styles.footer}>
          <Button
            mode="contained"
            onPress={onCancel}
            testID="permission-add-cancel"
          >
            Cancel
          </Button>
          <Button
            mode="contained"
            onPress={handleCreatePermission}
            testID="permission-add-create"
          >
            Create
          </Button>
        </View>
      </>
    );
  };

  return (
    <BottomSheetContentWrapper title="Add Permission">
      {createPermissionMutation.isPending ? renderLoading() : renderContent()}
    </BottomSheetContentWrapper>
  );
};
