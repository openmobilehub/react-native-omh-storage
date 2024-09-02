import { useMemo, useRef, useState } from 'react';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useFocusEffect } from '@react-navigation/native';
import { Button } from 'react-native-paper';

import { BottomSheet } from '@/components/bottomSheet';
import { BottomSheetContentWrapper } from '@/components/bottomSheetContent/parts/BottomSheetContentWrapper/BottomSheetContentWrapper';
import { BottomSheetTextInput } from '@/components/bottomSheetTextInput';
import Picker from '@/components/picker/Picker.tsx';
import { Provider } from '@/constants/provider.ts';
import { useAuthContext } from '@/contexts/auth/AuthContext.tsx';
import { useRequireStorageClient } from '@/contexts/storage/useRequireStorageClient';
import { useUIContext } from '@/contexts/ui/UIContext';
import { useCreateFileWithExtensionMutation } from '@/data/mutation/useCreateFileWithExtensionMutation.ts';
import { useCreateFileWithMimeTypeMutation } from '@/data/mutation/useCreateFileWithMimeTypeMutation';
import { useCreateFolderMutation } from '@/data/mutation/useCreateFolderMutation.ts';

import { FileType, getFileTypes } from './fileTypes';

interface Props {
  folderId?: string;
}

export const CreateFileBottomSheet = ({ folderId }: Props) => {
  const { setCurrentlyFocusedCreateFileBottomSheetRef } = useUIContext();
  const storageClient = useRequireStorageClient();
  const { provider } = useAuthContext();

  const bottomSheetModalRef = useRef<BottomSheetModal | null>(null);

  const createFileWithMimeTypeMutation =
    useCreateFileWithMimeTypeMutation(storageClient);

  const createFileWithExtensionMutation =
    useCreateFileWithExtensionMutation(storageClient);

  const createFolderMutation = useCreateFolderMutation(storageClient);

  const [fileName, setFileName] = useState('');
  const [selectedFileType, setSelectedFileType] = useState<FileType>('Folder');

  useFocusEffect(() => {
    setCurrentlyFocusedCreateFileBottomSheetRef(bottomSheetModalRef.current);
  });

  const fileTypes = useMemo(() => getFileTypes(provider), [provider]);
  const isGoogleDrive = useMemo(
    () => provider === Provider.GOOGLEDRIVE,
    [provider]
  );

  const handleCreateFilePress = () => {
    // Folder creation
    if (selectedFileType === 'Folder') {
      createFolderMutation.mutate(
        {
          name: fileName,
          parentId: folderId,
        },
        {
          onSuccess: () => {
            bottomSheetModalRef.current?.dismiss();
          },
        }
      );
      return;
    }

    const fileType = fileTypes[selectedFileType];

    // Google Drive file creation
    if (isGoogleDrive) {
      const mimeType = fileType.mimeType;
      if (!mimeType) {
        throw new Error('MimeType is required for Google Drive');
      }

      createFileWithMimeTypeMutation.mutate(
        {
          name: fileName,
          mimeType: mimeType,
          parentId: folderId,
        },
        {
          onSuccess: () => {
            bottomSheetModalRef.current?.dismiss();
          },
        }
      );
      return;
    }

    const extension = fileType.extension;

    // Extension for other providers cannot be null
    if (!extension) {
      throw Error('File extension is required by this provider');
    }

    // Other providers file creation
    createFileWithExtensionMutation.mutate(
      {
        name: fileName,
        fileExtension: extension,
        parentId: folderId,
      },
      {
        onSuccess: () => {
          bottomSheetModalRef.current?.dismiss();
        },
      }
    );
  };

  const resetState = () => {
    setFileName('');
    setSelectedFileType('Folder');
  };

  return (
    <BottomSheet
      ref={bottomSheetModalRef}
      onDismiss={resetState}
      keyboardBehavior="extend"
    >
      <BottomSheetContentWrapper title="Create file">
        <BottomSheetTextInput
          mode="outlined"
          label="Name"
          value={fileName}
          onChangeText={setFileName}
          testID="create-file-name-input"
        />
        <Picker
          value={selectedFileType}
          onChange={setSelectedFileType}
          label={'File type'}
          choices={Object.entries(fileTypes).map(([key, value]) => ({
            key: key,
            label: value.label,
            value: key as FileType,
          }))}
        />
        <Button
          onPress={handleCreateFilePress}
          mode="contained"
          loading={createFileWithMimeTypeMutation.isPending}
          testID="create-file-button"
        >
          Create File
        </Button>
      </BottomSheetContentWrapper>
    </BottomSheet>
  );
};
