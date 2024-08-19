import { File, StorageEntity } from '@openmobilehub/storage-core';
import { Divider, Icon, Menu } from 'react-native-paper';

import { Provider } from '@/constants/provider';
import { useAuthContext } from '@/contexts/auth/AuthContext';
import { useSnackbar } from '@/contexts/snackbar/SnackbarContent';

import { BottomSheetContentType } from '../../BottomSheetContent.types';
import { BottomSheetContentWrapper } from '../BottomSheetContentWrapper/BottomSheetContentWrapper';
import { styles } from './BottomSheetOptions.styles';

interface BottomSheetOptionsProps {
  file: StorageEntity;
  setView: React.Dispatch<React.SetStateAction<BottomSheetContentType>>;
  onDeletePress?: () => void;
  onPermanentDeletePress?: () => void;
}

export const BottomSheetOptions = ({
  setView,
  file,
  onDeletePress,
  onPermanentDeletePress,
}: BottomSheetOptionsProps) => {
  const { showSnackbar } = useSnackbar();
  const { provider } = useAuthContext();

  const isFile = file instanceof File;

  const handleUpdatePress = () => {
    const isFolderUpdateSupported = provider === Provider.GOOGLEDRIVE;

    if (isFile || isFolderUpdateSupported) {
      setView(BottomSheetContentType.Update);
    } else {
      showSnackbar('Updating folders is not supported by provider');
    }
  };

  const leadingIcon = (props: any) => (
    <Icon {...props} source="trash-can" color="red" />
  );

  return (
    <BottomSheetContentWrapper title={file.name} titleVariant="titleSmall">
      <Menu.Item
        leadingIcon="information"
        onPress={() => setView(BottomSheetContentType.Metadata)}
        title="Metadata"
        style={styles.menuItem}
      />
      <Divider />
      <Menu.Item
        leadingIcon="share-variant"
        onPress={() => setView(BottomSheetContentType.Permissions)}
        title="Permissions"
        style={styles.menuItem}
      />
      <Divider />
      {isFile && (
        <Menu.Item
          leadingIcon="history"
          onPress={() => setView(BottomSheetContentType.Versions)}
          title="Versions"
          style={styles.menuItem}
        />
      )}

      <Divider />
      <Menu.Item
        leadingIcon="pencil"
        onPress={handleUpdatePress}
        title="Update"
        style={styles.menuItem}
      />
      <Divider />
      <Menu.Item
        leadingIcon="trash-can"
        onPress={onDeletePress}
        title="Delete"
        style={styles.menuItem}
      />
      <Divider />
      <Menu.Item
        leadingIcon={leadingIcon}
        onPress={onPermanentDeletePress}
        title="Permanently delete"
        style={styles.menuItem}
        titleStyle={styles.permanentDeleteItem}
      />
    </BottomSheetContentWrapper>
  );
};
