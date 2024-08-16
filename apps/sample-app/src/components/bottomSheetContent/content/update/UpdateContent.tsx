import { LocalFile, StorageEntity } from '@openmobilehub/storage-core';
import { Portal } from 'react-native-paper';

import { BottomSheetFilePickerContent } from '@/components/bottomSheetFilePickerContent';
import { FullScreenLoadingState } from '@/components/fullScreenLoadingState';
import { useSnackbar } from '@/contexts/snackbar/SnackbarContent';
import { useRequireStorageClient } from '@/contexts/storage/useRequireStorageClient';
import { useUpdateFileMutation } from '@/data/mutation/useUpdateFileMutation';

interface Props {
  file: StorageEntity;
  closeBottomSheet: () => void;
}

export const UpdateContent = ({ file, closeBottomSheet }: Props) => {
  const { showSnackbar } = useSnackbar();
  const storageClient = useRequireStorageClient();

  const fileUpdateMutation = useUpdateFileMutation(storageClient, {
    onSuccess: () => {
      showSnackbar(`${file.name} was successfully updated!`);
      closeBottomSheet();
    },
    onError: () => {
      showSnackbar('There was an error updating the file.');
    },
  });

  const handleFilePick = (localFile: LocalFile) => {
    fileUpdateMutation.mutate({ file: localFile, fileId: file.id });
  };

  if (fileUpdateMutation.isPending) {
    return (
      <Portal>
        <FullScreenLoadingState withBackground />
      </Portal>
    );
  }

  return <BottomSheetFilePickerContent onFilePick={handleFilePick} />;
};
