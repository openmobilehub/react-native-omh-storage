import { useCallback, useRef } from 'react';
import { Alert, Image } from 'react-native';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { File, StorageEntity } from '@openmobilehub/storage-core';
import { IconButton, List } from 'react-native-paper';
import { Style } from 'react-native-paper/lib/typescript/components/List/utils';

import { BottomSheet } from '../bottomSheet';
import { BottomSheetContent } from '../bottomSheetContent';
import { styles } from './FileListItem.styles';
import { getIconForFileListItem, URL_FOLDER } from './getIconForFileListItem';

interface Props {
  file: StorageEntity;
  onPress: (entity: StorageEntity) => void;
}

export const FileListItem = ({ file, onPress }: Props) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const icon =
    file instanceof File ? getIconForFileListItem(file.mimeType) : URL_FOLDER;

  const handleRightIconPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleUpdatePress = () => {
    Alert.alert('Not implemented', 'This feature is not implemented yet');
  };

  const handleDeletePress = () => {
    Alert.alert('Not implemented', 'This feature is not implemented yet');
  };

  const handlePermanentDeletePress = () => {
    Alert.alert('Not implemented', 'This feature is not implemented yet');
  };

  const renderLeftIcon = useCallback(
    (props: { color: string; style: Style }) => {
      return (
        <Image
          resizeMode="contain"
          source={{ uri: icon }}
          style={[props.style, styles.leftIcon]}
        />
      );
    },
    [icon]
  );

  const renderRightIcon = useCallback(
    (props: { color: string; style?: Style }) => {
      return (
        <IconButton
          {...props}
          icon="dots-vertical"
          onPress={handleRightIconPress}
        />
      );
    },
    [handleRightIconPress]
  );

  return (
    <>
      <List.Item
        onPress={() => onPress(file)}
        title={file.name}
        left={renderLeftIcon}
        right={renderRightIcon}
      />
      <BottomSheet ref={bottomSheetModalRef}>
        {
          <BottomSheetContent
            storageEntity={file}
            onUpdatePress={handleUpdatePress}
            onDeletePress={handleDeletePress}
            onPermanentDeletePress={handlePermanentDeletePress}
          />
        }
      </BottomSheet>
    </>
  );
};
