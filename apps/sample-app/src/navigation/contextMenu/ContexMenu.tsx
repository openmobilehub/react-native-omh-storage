import { useRef, useState } from 'react';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { LocalFile } from '@openmobilehub/storage-core';
import { Divider, IconButton, Menu, Portal } from 'react-native-paper';

import { BottomSheet } from '@/components/bottomSheet';
import { BottomSheetFilePickerContent } from '@/components/bottomSheetFilePickerContent';
import { FullScreenLoadingState } from '@/components/fullScreenLoadingState';
import { useAuthContext } from '@/contexts/auth/AuthContext';
import { useSnackbar } from '@/contexts/snackbar/SnackbarContent';
import { useRequireStorageClient } from '@/contexts/storage/useRequireStorageClient';
import { useUIContext } from '@/contexts/ui/UIContext';
import { useLocalFileUploadMutation } from '@/data/mutation/useLocalFileUploadMutation';
import useCreateAdaptiveTheme from '@/hooks/useCreateAdaptiveTheme.ts';

import { styles } from './ContextMenu.styles';

interface ContextMenuProps {
  folderId?: string;
}

export const ContextMenu = ({ folderId }: ContextMenuProps) => {
  const { logout } = useAuthContext();
  const { currentlyFocusedCreateFileBottomSheetRef } = useUIContext();
  const { showSnackbar } = useSnackbar();

  const storageClient = useRequireStorageClient();

  const { mutate: localFileUpload, isPending } = useLocalFileUploadMutation(
    storageClient,
    folderId ?? storageClient.rootFolderId
  );
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [visible, setVisible] = useState(false);

  const theme = useCreateAdaptiveTheme();

  const handleMenuOpen = () => setVisible(true);

  const handleMenuClose = () => setVisible(false);

  const handleCreateFilePress = () => {
    currentlyFocusedCreateFileBottomSheetRef?.current?.present();
    handleMenuClose();
  };

  const handleFileUploadSheetOpen = () => {
    handleMenuClose();
    bottomSheetRef.current?.present();
  };

  const handleFileUploadSheetClose = () => {
    bottomSheetRef.current?.dismiss();
  };

  const handleFileUpload = async (file: LocalFile) => {
    handleFileUploadSheetClose();

    await localFileUpload(file, {
      onSuccess: () => {
        showSnackbar(`${file.name} was successfully uploaded!`);
      },
      onError: () => {
        showSnackbar('There was an error uploading the file.');
      },
    });
  };

  if (isPending) {
    return (
      <Portal>
        <FullScreenLoadingState overlay />
      </Portal>
    );
  }
  return (
    <>
      <Menu
        visible={visible}
        onDismiss={handleMenuClose}
        anchor={
          <IconButton
            iconColor={theme.colors.onSurface}
            icon="dots-vertical"
            size={24}
            onPress={handleMenuOpen}
          />
        }
        style={styles.menu}
      >
        <Menu.Item onPress={handleFileUploadSheetOpen} title="Upload File" />
        <Menu.Item onPress={handleCreateFilePress} title="Create File" />
        <Divider />
        <Menu.Item onPress={logout} title="Logout" />
      </Menu>
      <BottomSheet ref={bottomSheetRef}>
        <BottomSheetFilePickerContent onFilePick={handleFileUpload} />
      </BottomSheet>
    </>
  );
};
