import { View } from 'react-native';

import { Divider, Icon, Menu, Text } from 'react-native-paper';

import { BottomSheetContentType } from '../../BottomSheetContent.types';
import { styles } from './BottomSheetOptions.styles';

interface BottomSheetOptionsProps {
  setView: React.Dispatch<React.SetStateAction<BottomSheetContentType>>;
  fileName: string;
}

export const BottomSheetOptions = ({
  setView,
  fileName,
}: BottomSheetOptionsProps) => {
  const leadingIcon = (props: any) => (
    <Icon {...props} source="trash-can" color="red" />
  );

  return (
    <View>
      <Text style={styles.fileName}>{fileName}</Text>
      <Divider />
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
      <Menu.Item
        leadingIcon="pencil"
        onPress={() => setView(BottomSheetContentType.Update)}
        title="Update"
        style={styles.menuItem}
      />
      <Divider />
      <Menu.Item
        leadingIcon="trash-can"
        onPress={() => setView(BottomSheetContentType.Delete)}
        title="Delete"
        style={styles.menuItem}
      />
      <Divider />
      <Menu.Item
        leadingIcon={leadingIcon}
        onPress={() => setView(BottomSheetContentType.PermanentDelete)}
        title="Permanently delete"
        style={styles.menuItem}
        titleStyle={styles.permanentDeleteItem}
      />
      <Divider />
    </View>
  );
};
