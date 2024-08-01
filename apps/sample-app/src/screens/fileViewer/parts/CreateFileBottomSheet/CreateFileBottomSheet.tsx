import { useRef, useState } from 'react';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Picker } from '@react-native-picker/picker';
import { useFocusEffect } from '@react-navigation/native';
import { Button } from 'react-native-paper';

import { BottomSheet } from '@/components/bottomSheet';
import { BottomSheetContentWrapper } from '@/components/bottomSheetContent/parts/BottomSheetContentWrapper/BottomSheetContentWrapper';
import { BottomSheetTextInput } from '@/components/bottomSheetTextInput';
import { useRequireStorageClient } from '@/contexts/storage/useRequireStorageClient';
import { useUIContext } from '@/contexts/ui/UIContext';
import { useCreateFileWithMimeTypeMutation } from '@/data/mutation/useCreateFileWithMimeTypeMutation';

import { FileType, fileTypes } from './fileTypes';

interface Props {
  folderId?: string;
}

export const CreateFileBottomSheet = ({ folderId }: Props) => {
  const { setCurrentlyFocusedCreateFileBottomSheetRef } = useUIContext();
  const storageClient = useRequireStorageClient();

  const bottomSheetModalRef = useRef<BottomSheetModal | null>(null);

  const createFileWithMimeTypeMutation =
    useCreateFileWithMimeTypeMutation(storageClient);

  const [fileName, setFileName] = useState('');
  const [selectedFileType, setSelectedFileType] = useState<FileType>('Folder');

  useFocusEffect(() => {
    setCurrentlyFocusedCreateFileBottomSheetRef(bottomSheetModalRef.current);
  });

  const handleCreateFilePress = () => {
    createFileWithMimeTypeMutation.mutate(
      {
        name: fileName,
        mimeType: fileTypes[selectedFileType].mimeType,
        parentId: folderId,
      },
      {
        onSuccess: () => {
          bottomSheetModalRef.current?.close();
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
        />
        <Picker
          selectedValue={selectedFileType}
          onValueChange={(itemValue) => setSelectedFileType(itemValue)}
        >
          {Object.entries(fileTypes).map(([key, value]) => (
            <Picker.Item key={key} label={value.label} value={key} />
          ))}
        </Picker>
        <Button
          onPress={handleCreateFilePress}
          mode="contained"
          loading={createFileWithMimeTypeMutation.isPending}
        >
          Create File
        </Button>
      </BottomSheetContentWrapper>
    </BottomSheet>
  );
};
