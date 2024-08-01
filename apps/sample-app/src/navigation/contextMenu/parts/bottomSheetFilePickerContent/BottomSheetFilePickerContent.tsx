import { useEffect } from 'react';
import { View } from 'react-native';

import { ActivityIndicator, Divider, Menu, Text } from 'react-native-paper';

import { useRequireStorageClient } from '@/contexts/storage/useRequireStorageClient';
import { useLocalFileUploadMutation } from '@/data/mutations/useLocalFileUploadMutation';
import { usePickFile } from '@/hooks/usePickFile';

import { styles } from './BottomSheetFilePickerContent.styles';

interface BottomSheetFilePickerContentProps {
  folderId?: string;
  onClose: () => void;
}

export const BottomSheetFilePickerContent = ({
  folderId,
  onClose,
}: BottomSheetFilePickerContentProps) => {
  const { pickFromFiles, pickFromPhotoGallery } = usePickFile();
  const storageClient = useRequireStorageClient();

  const {
    mutate: localFileUpload,
    isSuccess,
    isPending,
  } = useLocalFileUploadMutation(
    storageClient,
    folderId ?? storageClient.rootFolderId
  );

  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess, onClose]);

  const handlePickFromFiles = async () => {
    try {
      const file = await pickFromFiles();

      if (file) {
        localFileUpload(file);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handlePickFromPhotoGallery = async () => {
    try {
      const file = await pickFromPhotoGallery();

      if (file) {
        localFileUpload(file);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const renderContent = () => {
    if (isPending) {
      return (
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            animating={true}
            style={styles.activityIndicator}
          />
          <Text>Uploading...</Text>
        </View>
      );
    }
    return (
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
    );
  };

  return <View style={styles.container}>{renderContent()}</View>;
};
