import { LocalFile, StorageEntity } from '@openmobilehub/storage-core';

import { BottomSheetFilePickerContent } from '@/components/bottomSheetFilePickerContent';
import { useRequireStorageClient } from '@/contexts/storage/useRequireStorageClient';
import { useUpdateFileMutation } from '@/data/mutation/useUpdateFileMutation';

interface Props {
  file: StorageEntity;
}

export const UpdateContent = ({ file }: Props) => {
  const storageClient = useRequireStorageClient();

  const fileUpdateMutation = useUpdateFileMutation(storageClient);

  const handleFilePick = (localFile: LocalFile) => {
    fileUpdateMutation.mutate({ file: localFile, fileId: file.id });
  };

  return <BottomSheetFilePickerContent onFilePick={handleFilePick} />;
};
