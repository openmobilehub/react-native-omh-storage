import { useRef, useState } from 'react';
import { Alert } from 'react-native';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Divider, IconButton, Menu } from 'react-native-paper';

import { BottomSheet } from '@/components/bottomSheet';
import { useAuthContext } from '@/contexts/auth/AuthContext';

import { styles } from './ContextMenu.styles';
import { BottomSheetFilePickerContent } from './parts/bottomSheetFilePickerContent';

interface ContextMenuProps {
  folderId?: string;
}

export const ContextMenu = ({ folderId }: ContextMenuProps) => {
  const { logout } = useAuthContext();

  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [visible, setVisible] = useState(false);

  const handleMenuOpen = () => setVisible(true);

  const handleMenuClose = () => setVisible(false);

  const handleNotImplemented = () => {
    Alert.alert('Not implemented yet');
  };

  const handlelocalFileUploadSheetOpen = () => {
    handleMenuClose();
    bottomSheetRef.current?.present();
  };

  const handlelocalFileUploadSheetClose = () => {
    bottomSheetRef.current?.dismiss();
  };

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
        <Menu.Item
          onPress={handlelocalFileUploadSheetOpen}
          title="Upload File"
        />
        <Menu.Item onPress={handleNotImplemented} title="Create File" />
        <Divider />
        <Menu.Item onPress={logout} title="Logout" />
      </Menu>
      <BottomSheet ref={bottomSheetRef} snapPoints={['20%']}>
        <BottomSheetFilePickerContent
          folderId={folderId}
          onClose={handlelocalFileUploadSheetClose}
        />
      </BottomSheet>
    </>
  );
};
