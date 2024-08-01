import { useState } from 'react';
import { Alert } from 'react-native';

import { Divider, IconButton, Menu } from 'react-native-paper';

import { useAuthContext } from '@/contexts/auth/AuthContext';
import { useUIContext } from '@/contexts/ui/UIContext';

import { styles } from './ContextMenu.styles';

export const ContextMenu = () => {
  const { logout } = useAuthContext();
  const { currentlyFocusedCreateFileBottomSheetRef } = useUIContext();

  const [visible, setVisible] = useState(false);

  const handleMenuOpen = () => setVisible(true);

  const handleMenuClose = () => setVisible(false);

  const handleCreateFilePress = () => {
    currentlyFocusedCreateFileBottomSheetRef?.current?.present();
    handleMenuClose();
  };

  const handleNotImplemented = () => {
    Alert.alert('Not implemented yet');
  };

  return (
    <Menu
      visible={visible}
      onDismiss={handleMenuClose}
      anchor={
        <IconButton icon="dots-vertical" size={24} onPress={handleMenuOpen} />
      }
      style={styles.menu}
    >
      <Menu.Item onPress={handleNotImplemented} title="Upload File" />
      <Menu.Item onPress={handleCreateFilePress} title="Create File" />
      <Divider />
      <Menu.Item onPress={logout} title="Logout" />
    </Menu>
  );
};
