import { Divider, Icon, Menu } from 'react-native-paper';

import { BottomSheetContentType } from '../../BottomSheetContent.types';
import { BottomSheetContentWrapper } from '../BottomSheetContentWrapper/BottomSheetContentWrapper';
import { styles } from './BottomSheetOptions.styles';

interface BottomSheetOptionsProps {
  fileName: string;
  setView: React.Dispatch<React.SetStateAction<BottomSheetContentType>>;
  onDeletePress?: () => void;
  onPermanentDeletePress?: () => void;
}

export const BottomSheetOptions = ({
  setView,
  fileName,
  onDeletePress,
  onPermanentDeletePress,
}: BottomSheetOptionsProps) => {
  const leadingIcon = (props: any) => (
    <Icon {...props} source="trash-can" color="red" />
  );

  return (
    <BottomSheetContentWrapper title={fileName} titleVariant="titleSmall">
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
        leadingIcon="history"
        onPress={() => setView(BottomSheetContentType.Versions)}
        title="Versions"
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
