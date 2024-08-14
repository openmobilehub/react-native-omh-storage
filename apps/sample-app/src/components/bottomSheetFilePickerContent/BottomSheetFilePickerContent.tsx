import { View } from 'react-native';

import { LocalFile } from '@openmobilehub/storage-core';
import { Divider, Menu } from 'react-native-paper';

import { usePickFile } from '@/hooks/usePickFile';

import { styles } from './BottomSheetFilePickerContent.styles';

interface BottomSheetFilePickerContentProps {
  onFilePick: (file: LocalFile) => void;
}

export const BottomSheetFilePickerContent = ({
  onFilePick,
}: BottomSheetFilePickerContentProps) => {
  const { pickFromFiles, pickFromPhotoGallery } = usePickFile();

  const handlePickFromFiles = async () => {
    try {
      const file = await pickFromFiles();

      if (file) {
        onFilePick(file);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handlePickFromPhotoGallery = async () => {
    try {
      const file = await pickFromPhotoGallery();

      if (file) {
        onFilePick(file);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <View style={styles.container}>
      <>
        <Divider />
        <Menu.Item
          onPress={handlePickFromFiles}
          title="Pick from Files"
          style={styles.menuItem}
        />
        <Divider />
        <Menu.Item
          onPress={handlePickFromPhotoGallery}
          title="Pick from Photo Gallery"
          style={styles.menuItem}
        />
        <Divider />
      </>
    </View>
  );
};
