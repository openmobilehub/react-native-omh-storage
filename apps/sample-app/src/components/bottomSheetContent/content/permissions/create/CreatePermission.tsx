import { useMemo, useState } from 'react';
import { View } from 'react-native';

import {
  PermissionRecipient,
  StorageEntity,
} from '@openmobilehub/storage-core';
import { Button } from 'react-native-paper';

import {
  AddEditPermissionRole,
  getRoleOptions,
  mapAddEditPermissionRoleToCore,
} from '@/components/bottomSheetContent/content/permissions/model/AddEditPermissionRole';
import {
  AddEditPermissionType,
  getTypeOptions,
} from '@/components/bottomSheetContent/content/permissions/model/AddEditPermissionType';
import { BottomSheetContentWrapper } from '@/components/bottomSheetContent/parts/BottomSheetContentWrapper/BottomSheetContentWrapper';
import { BottomSheetTextInput } from '@/components/bottomSheetTextInput';
import { Checkbox } from '@/components/checkbox/Checkbox';
import { FullScreenLoadingState } from '@/components/fullScreenLoadingState';
import Picker from '@/components/picker/Picker';
import { useAuthContext } from '@/contexts/auth/AuthContext.tsx';
import { useSnackbar } from '@/contexts/snackbar/SnackbarContent';
import { useRequireStorageClient } from '@/contexts/storage/useRequireStorageClient';
import { useCreatePermissionMutation } from '@/data/mutation/useCreatePermissionMutation';

import { styles } from './CreatePermission.styles';

interface Props {
  file: StorageEntity;
  onCancel: () => void;
  onSuccess: () => void;
}

export const CreatePermission = ({ file, onCancel, onSuccess }: Props) => {
  const [type, setType] = useState(AddEditPermissionType.USER);
  const [role, setRole] = useState(AddEditPermissionRole.COMMENTER);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sendNotification, setSendNotification] = useState(false);
  const [domain, setDomain] = useState('');

  const storageClient = useRequireStorageClient();
  const createPermissionMutation = useCreatePermissionMutation(storageClient);
  const { showSnackbar } = useSnackbar();
  const { provider } = useAuthContext();

  const typeOptions = useMemo(() => {
    return getTypeOptions(provider);
  }, [provider]);

  const roleOptions = useMemo(() => {
    return getRoleOptions(provider);
  }, [provider]);

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
    const recipient = getPermissionRecipient();
    const coreRole = mapAddEditPermissionRoleToCore(role);

    createPermissionMutation.mutate(
      {
        fileId: file.id,
        role: coreRole,
        recipient: recipient,
        sendNotificationEmail: sendNotification,
        emailMessage: message || undefined,
      },
      {
        onSuccess: () => {
          showSnackbar(`Permission added`);
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
