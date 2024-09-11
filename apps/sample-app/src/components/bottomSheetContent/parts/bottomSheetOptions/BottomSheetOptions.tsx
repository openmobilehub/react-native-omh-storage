import { File, Folder, StorageEntity } from '@openmobilehub/storage-core';
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
  const isFolder = file instanceof Folder;

  const handleUpdatePress = () => {
    const isFolderUpdateSupported = provider === Provider.GOOGLEDRIVE;

    if (isFolder && !isFolderUpdateSupported) {
      showSnackbar('Updating folders is not supported by provider');
      return;
    }

    if (isFile) {
      const isGoogleWorkspaceFile = file?.mimeType?.includes(
        'application/vnd.google-apps'
      );
      if (isGoogleWorkspaceFile) {
        showSnackbar('Updating Google Workspace files is not supported');
        return;
      }
    }

    setView(BottomSheetContentType.Update);
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
        testID="bottom-sheet-options-metadata"
      />
      <Divider />
      <Menu.Item
        leadingIcon="share-variant"
        onPress={() => setView(BottomSheetContentType.Permissions)}
        title="Permissions"
        style={styles.menuItem}
        testID="bottom-sheet-options-permissions"
      />
      <Divider />
      {isFile && (
        <Menu.Item
          leadingIcon="history"
          onPress={() => setView(BottomSheetContentType.Versions)}
          title="Versions"
          style={styles.menuItem}
          testID="bottom-sheet-options-versions"
        />
      )}
      <Divider />
      <Menu.Item
        leadingIcon="pencil"
        onPress={handleUpdatePress}
        title="Update"
        style={styles.menuItem}
        testID="bottom-sheet-options-update"
      />
      <Divider />
      <Menu.Item
        leadingIcon="trash-can"
        onPress={onDeletePress}
        title="Delete"
        style={styles.menuItem}
        testID="bottom-sheet-options-delete"
      />
      <Divider />
      <Menu.Item
        leadingIcon={leadingIcon}
        onPress={onPermanentDeletePress}
        title="Permanently delete"
        style={styles.menuItem}
        titleStyle={styles.permanentDeleteItem}
        testID="bottom-sheet-options-permanent-delete"
      />
    </BottomSheetContentWrapper>
  );
};
