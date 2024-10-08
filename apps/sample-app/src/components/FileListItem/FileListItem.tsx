import { useCallback, useRef } from 'react';
import { Alert, Image } from 'react-native';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { File, StorageEntity } from '@openmobilehub/storage-core';
import { IconButton, List } from 'react-native-paper';
import { Style } from 'react-native-paper/lib/typescript/components/List/utils';

import { useSnackbar } from '@/contexts/snackbar/SnackbarContent';
import { useRequireStorageClient } from '@/contexts/storage/useRequireStorageClient';
import { useDeleteFileMutation } from '@/data/mutation/useDeleteFileMutation';
import { usePermanentDeleteFileMutation } from '@/data/mutation/usePermanentDeleteFileMutation';

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

  const storageClient = useRequireStorageClient();

  const { showSnackbar } = useSnackbar();

  const handleSettled = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const deleteFileMutation = useDeleteFileMutation(
    storageClient,
    handleSettled
  );
  const permanentDeleteFileMutation = usePermanentDeleteFileMutation(
    storageClient,
    handleSettled
  );

  const icon =
    file instanceof File ? getIconForFileListItem(file.mimeType) : URL_FOLDER;

  const closeBottomSheet = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const handleRightIconPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleDeletePress = () => {
    deleteFileMutation.mutate(
      { fileId: file.id },
      {
        onSuccess: () => {
          showSnackbar('File deleted');
        },
        onError: () => {
          showSnackbar('Failed to delete file');
        },
      }
    );
  };

  const handlePermanentDeletePress = () => {
    Alert.alert(
      'Are you sure?',
      'This action cannot be undone. If you want to move file to trash, use regular delete.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            permanentDeleteFileMutation.mutate(
              { fileId: file.id },
              {
                onSuccess: () => {
                  showSnackbar('File permanently deleted');
                },
                onError: () => {
                  showSnackbar('Failed to permanently delete file');
                },
              }
            );
          },
        },
      ]
    );
  };

  const renderLeftIcon = useCallback(
    (props: { color: string; style: Style }) => {
      return (
        <Image
          resizeMode="contain"
          source={{ uri: icon }}
          style={[props.style, styles.leftIcon]}
          testID="file-list-item-icon"
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
          testID="file-list-item-options"
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
        testID="file-list-item"
        accessible={false}
      />
      <BottomSheet ref={bottomSheetModalRef}>
        {
          <BottomSheetContent
            file={file}
            onDeletePress={handleDeletePress}
            onPermanentDeletePress={handlePermanentDeletePress}
            closeBottomSheet={closeBottomSheet}
          />
        }
      </BottomSheet>
    </>
  );
};
