import { useCallback, useRef } from 'react';
import { Image } from 'react-native';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { OmhFile, OmhStorageEntity } from '@openmobilehub/storage-core';
import { IconButton, List } from 'react-native-paper';
import { Style } from 'react-native-paper/lib/typescript/components/List/utils';

import { BottomSheet } from '../bottomSheet';
import { BottomSheetContent } from '../bottomSheetContent';
import { styles } from './FileListItem.styles';
import { getIconForMimeType, URL_FOLDER } from './iconHelpers';

interface Props {
  file: OmhStorageEntity;
  onPress: (entity: OmhStorageEntity) => void;
}

export const FileListItem = ({ file, onPress }: Props) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const icon =
    file instanceof OmhFile ? getIconForMimeType(file.mimeType) : URL_FOLDER;

  const handleRightIconPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

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
        {<BottomSheetContent fileData={file} />}
      </BottomSheet>
    </>
  );
};
