import { List } from 'react-native-paper';

import { File } from '../../../../../packages/googledrive/src/model/File';
import { StorageEntity } from '../../../../../packages/googledrive/src/model/StorageEntity';

interface Props {
  file: StorageEntity;
  onPress: (entity: StorageEntity) => void;
}

export const FileListItem = ({ file, onPress }: Props) => {
  if (file instanceof File) {
    return (
      <List.Item
        onPress={() => onPress(file)}
        title={file.name}
        left={(props) => <List.Icon {...props} icon="file" />}
      />
    );
  }
  return (
    <List.Item
      onPress={() => onPress(file)}
      title={file.name}
      left={(props) => <List.Icon {...props} icon="folder" />}
    />
  );
};
