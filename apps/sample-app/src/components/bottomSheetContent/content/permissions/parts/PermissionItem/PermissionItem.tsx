import { View } from 'react-native';

import { Button, Card } from 'react-native-paper';

import { DisplayRow } from '@/components/bottomSheetContent/content/parts/DisplayRow/DisplayRow.tsx';
import { DisplayPermission } from '@/components/bottomSheetContent/content/permissions/getDisplayData.ts';

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
  return (
    <Card style={styles.container}>
      {displayPermission.entries.map((entry) => {
        return <DisplayRow displayEntry={entry} key={entry.label} />;
      })}
      <View style={styles.footer}>
        <Button
          style={styles.button}
          mode="outlined"
          onPress={() => {
            onUpdate(displayPermission.id);
          }}
          testID="permission-add"
        >
          Update
        </Button>
        <Button
          style={styles.button}
          mode="outlined"
          onPress={() => {
            onDelete(displayPermission.id);
          }}
          testID="permission-get-url"
        >
          Delete
        </Button>
      </View>
    </Card>
  );
};
