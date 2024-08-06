import { useRef, useState } from 'react';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { LocalFile } from '@openmobilehub/storage-core';
import ReactNativeBlobUtil from 'react-native-blob-util';
import { Divider, IconButton, Menu, Portal } from 'react-native-paper';

import { BottomSheet } from '@/components/bottomSheet';
import { FullScreenLoadingState } from '@/components/fullScreenLoadingState';
import { useAuthContext } from '@/contexts/auth/AuthContext';
import { useRequireStorageClient } from '@/contexts/storage/useRequireStorageClient';
import { useUIContext } from '@/contexts/ui/UIContext';
import { useLocalFileUploadMutation } from '@/data/mutation/useLocalFileUploadMutation';

import { styles } from './ContextMenu.styles';
import { BottomSheetFilePickerContent } from './parts/bottomSheetFilePickerContent';

interface ContextMenuProps {
  folderId?: string;
}

export const ContextMenu = ({ folderId }: ContextMenuProps) => {
  const { logout } = useAuthContext();
  const { currentlyFocusedCreateFileBottomSheetRef } = useUIContext();

  const storageClient = useRequireStorageClient();

  const { mutate: localFileUpload, isPending } = useLocalFileUploadMutation(
    storageClient,
    folderId ?? storageClient.rootFolderId
  );
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [visible, setVisible] = useState(false);

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

    let data = '';
    ReactNativeBlobUtil.fs
      .readStream(
        // file path
        file.uri.replace('file://', ''),
        // encoding, should be one of `base64`, `utf8`, `ascii`
        'base64',
        // (optional) buffer size, default to 4096 (4095 for BASE64 encoded data)
        // when reading file in BASE64 encoding, buffer size must be multiples of 3.
        4095
      )
      .then((ifstream) => {
        ifstream.open();
        console.log('IFSTREAM', ifstream);
        ifstream.onData((chunk) => {
          // when encoding is `ascii`, chunk will be an array contains numbers
          // otherwise it will be a string
          console.log('CHUNK', chunk);
          data += chunk;
        });
        ifstream.onError((err) => {
          console.log('oops', err);
        });
        ifstream.onEnd(() => {
          console.log('EOF');
        });
      });
    // await localFileUpload(file);
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
        <Menu.Item onPress={handleCreateFilePress} title="Create File" />
        <Divider />
        <Menu.Item onPress={logout} title="Logout" />
      </Menu>
      <BottomSheet ref={bottomSheetRef}>
        <BottomSheetFilePickerContent onFileUpload={handleFileUpload} />
      </BottomSheet>
    </>
  );
};
