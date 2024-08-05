import { Permission, StorageEntity } from '@openmobilehub/storage-core';
import { Text } from 'react-native-paper';

import { BottomSheetContentWrapper } from '@/components/bottomSheetContent/parts/BottomSheetContentWrapper/BottomSheetContentWrapper.tsx';

interface Props {
  file: StorageEntity;
  permission: Permission;
  onCancel: () => void;
  onSuccess: () => void;
}

export const EditPermission = ({ file }: Props) => {
  return (
    <BottomSheetContentWrapper title="Edit Permission">
      <Text>TODO dn: implementation</Text>
      <Text>{file.id}</Text>
    </BottomSheetContentWrapper>
  );
};
