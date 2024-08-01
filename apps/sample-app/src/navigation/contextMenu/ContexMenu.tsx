import { useRef, useState } from 'react';
import { Alert } from 'react-native';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { LocalFile } from '@openmobilehub/storage-core';
import { Divider, IconButton, Menu, Portal } from 'react-native-paper';

import { BottomSheet } from '@/components/bottomSheet';
import { FullScreenLoadingState } from '@/components/fullScreenLoadingState';
import { useAuthContext } from '@/contexts/auth/AuthContext';
import { useRequireStorageClient } from '@/contexts/storage/useRequireStorageClient';
import { useLocalFileUploadMutation } from '@/data/mutations/useLocalFileUploadMutation';

import { styles } from './ContextMenu.styles';
import { BottomSheetFilePickerContent } from './parts/bottomSheetFilePickerContent';

interface ContextMenuProps {
  folderId?: string;
}

export const ContextMenu = ({ folderId }: ContextMenuProps) => {
  const { logout } = useAuthContext();
  const storageClient = useRequireStorageClient();

  const {
    mutate: localFileUpload,

    isPending,
  } = useLocalFileUploadMutation(
    storageClient,
    folderId ?? storageClient.rootFolderId
  );
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [visible, setVisible] = useState(false);

  const handleMenuOpen = () => setVisible(true);

  const handleMenuClose = () => setVisible(false);

  const handleNotImplemented = () => {
    Alert.alert('Not implemented yet');
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
    await localFileUpload(file);
  };

  if (isPending) {
    return (
      <Portal>
        <FullScreenLoadingState withBackground />
      </Portal>
    );
  }
  return (
    <>
      <Menu
        visible={visible}
        onDismiss={handleMenuClose}
        anchor={
          <IconButton icon="dots-vertical" size={24} onPress={handleMenuOpen} />
        }
        style={styles.menu}
      >
        <Menu.Item onPress={handleFileUploadSheetOpen} title="Upload File" />
        <Menu.Item onPress={handleNotImplemented} title="Create File" />
        <Divider />
        <Menu.Item onPress={logout} title="Logout" />
      </Menu>
      <BottomSheet ref={bottomSheetRef}>
        <BottomSheetFilePickerContent onFileUpload={handleFileUpload} />
      </BottomSheet>
    </>
  );
};
