import { View } from 'react-native';

import { Avatar, Button, Card } from 'react-native-paper';

import { DisplayRow } from '@/components/bottomSheetContent/content/parts/DisplayRow/DisplayRow';
import { DisplayPermission } from '@/components/bottomSheetContent/content/permissions/list/getDisplayData';

import { styles } from './PermissionItem.styles';

interface Props {
  displayPermission: DisplayPermission;
  onDelete: (permissionId: string) => void;
  onUpdate: (permissionId: string) => void;
}

export const PermissionItem = ({
  displayPermission,
  onDelete,
  onUpdate,
}: Props) => {
  const { id, entries, userPhotoUri } = displayPermission;

  return (
    <Card style={styles.container}>
      {entries.map((entry) => {
        return <DisplayRow displayEntry={entry} key={entry.label} />;
      })}
      {userPhotoUri && (
        <Avatar.Image
          size={64}
          source={{
            uri: userPhotoUri,
          }}
        />
      )}
      <View style={styles.footer}>
        <Button
          mode="outlined"
          onPress={() => {
            onUpdate(id);
          }}
          testID="permission-add"
        >
          Update
        </Button>
        <Button
          mode="outlined"
          onPress={() => {
            onDelete(id);
          }}
          testID="permission-get-url"
        >
          Delete
        </Button>
      </View>
    </Card>
  );
};
