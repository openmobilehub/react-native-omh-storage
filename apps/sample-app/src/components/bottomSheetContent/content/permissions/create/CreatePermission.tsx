import { useState } from 'react';
import { View } from 'react-native';

import {
  PermissionRecipient,
  StorageEntity,
} from '@openmobilehub/storage-core';
import { Button } from 'react-native-paper';
import Toast from 'react-native-root-toast';

import {
  AddEditPermissionRole,
  mapAddEditPermissionRoleToCore,
  roleOptions,
} from '@/components/bottomSheetContent/content/permissions/model/AddEditPermissionRole.ts';
import {
  AddEditPermissionType,
  typeOptions,
} from '@/components/bottomSheetContent/content/permissions/model/AddEditPermissionType.ts';
import { BottomSheetContentWrapper } from '@/components/bottomSheetContent/parts/BottomSheetContentWrapper/BottomSheetContentWrapper.tsx';
import { BottomSheetTextInput } from '@/components/bottomSheetTextInput';
import { Checkbox } from '@/components/checkbox/Checkbox.tsx';
import { FullScreenLoadingState } from '@/components/fullScreenLoadingState';
import Picker from '@/components/picker/Picker.tsx';
import { useRequireStorageClient } from '@/contexts/storage/useRequireStorageClient.ts';
import { useCreatePermissionMutation } from '@/data/mutation/useCreatePermissionMutation.ts';

import { styles } from './CreatePermission.styles.ts';

interface Props {
  file: StorageEntity;
  onCancel: () => void;
  onSuccess: () => void;
}

export const CreatePermission = ({ file, onCancel, onSuccess }: Props) => {
  const [type, setType] = useState(AddEditPermissionType.USER);
  const [role, setRole] = useState(AddEditPermissionRole.READER);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sendNotification, setSendNotification] = useState(false);
  const [domain, setDomain] = useState('');

  const storageClient = useRequireStorageClient();
  const createPermissionMutation = useCreatePermissionMutation(storageClient);

  const getPermissionRecipient = (): PermissionRecipient => {
    switch (type) {
      case AddEditPermissionType.USER:
        return {
          type: 'user',
          email: email,
        };
      case AddEditPermissionType.GROUP:
        return {
          type: 'group',
          email: email,
        };
      case AddEditPermissionType.Domain:
        return {
          type: 'domain',
          domain: domain,
        };
      case AddEditPermissionType.Anyone:
        return {
          type: 'anyone',
        };
    }
  };

  const handleCreatePermission = () => {
    let recipient = getPermissionRecipient();
    const coreRole = mapAddEditPermissionRoleToCore(role);

    createPermissionMutation.mutate(
      {
        fileId: file.id,
        role: coreRole,
        recipient: recipient,
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

  if (createPermissionMutation.isPending) {
    return <FullScreenLoadingState />;
  }

  return (
    <BottomSheetContentWrapper title="Add Permission">
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
    </BottomSheetContentWrapper>
  );
};
