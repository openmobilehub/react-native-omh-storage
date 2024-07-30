import { useState } from 'react';

import { Divider, IconButton, Menu } from 'react-native-paper';

import { useAuthContext } from '@/contexts/auth/AuthContext';

import { styles } from './ContextMenu.styles';

export const ContextMenu = () => {
  const { logout } = useAuthContext();

  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={<IconButton icon="dots-vertical" size={24} onPress={openMenu} />}
      style={styles.menu}
    >
      <Menu.Item onPress={() => {}} title="Upload File" />
      <Menu.Item onPress={() => {}} title="Create File" />
      <Divider />
      <Menu.Item onPress={logout} title="Logout" />
    </Menu>
  );
};
