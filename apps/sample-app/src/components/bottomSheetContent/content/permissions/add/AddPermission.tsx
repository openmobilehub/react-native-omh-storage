import { useMemo, useState } from 'react';
import { View } from 'react-native';

import { StorageEntity } from '@openmobilehub/storage-core';
import { Button, TextInput } from 'react-native-paper';

import { AddEditPermissionRole } from '@/components/bottomSheetContent/content/permissions/model/AddEditPermissionRole.ts';
import { AddEditPermissionType } from '@/components/bottomSheetContent/content/permissions/model/AddEditPermissionType.ts';
import { BottomSheetContentWrapper } from '@/components/bottomSheetContent/parts/BottomSheetContentWrapper/BottomSheetContentWrapper.tsx';
import { Checkbox } from '@/components/checkbox/Checkbox.tsx';
import Picker from '@/components/picker/Picker.tsx';

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

  const handleCreatePermission = () => {
    // TODO dn: implementation
    console.log(file.id);

    onSuccess();
  };

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
      <TextInput label="Email" value={email} onChangeText={setEmail} />
      <Checkbox
        value={sendNotification}
        onValueChange={setSendNotification}
        label={'Send notification email'}
      />
      <TextInput
        label="Optional email message"
        value={message}
        onChangeText={setMessage}
      />
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
