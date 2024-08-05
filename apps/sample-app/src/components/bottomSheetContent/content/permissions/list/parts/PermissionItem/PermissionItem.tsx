import { Image, View } from 'react-native';

import { Button, Card } from 'react-native-paper';

import { DisplayRow } from '@/components/bottomSheetContent/content/parts/DisplayRow/DisplayRow.tsx';
import { DisplayPermission } from '@/components/bottomSheetContent/content/permissions/list/getDisplayData.ts';

import { styles } from './PermissionItem.styles.ts';

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
        <Image
          style={styles.image}
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
