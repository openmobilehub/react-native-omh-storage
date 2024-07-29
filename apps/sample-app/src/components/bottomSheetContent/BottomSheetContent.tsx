import React, { useState } from 'react';
import { Text, View } from 'react-native';

import { BottomSheetContentType } from './BottomSheetContent.types';
import { BottomSheetOptions } from './parts/bottomSheetOptions';

interface BottomSheetContentProps {
  fileData: any; // TODO: Define proper type for file data once fetching is implemented
}

export const BottomSheetContent: React.FC<BottomSheetContentProps> = ({
  fileData,
}) => {
  const [view, setView] = useState<BottomSheetContentType>(
    BottomSheetContentType.Options
  );

  //TODO: Implement proper views for metadata, permissions, update, and delete
  const renderContent = () => {
    switch (view) {
      case BottomSheetContentType.Metadata:
        return <Text>Metadata for {fileData.name}</Text>;
      case BottomSheetContentType.Permissions:
        return <Text>Permissions for {fileData.name}</Text>;
      case BottomSheetContentType.Update:
        return <Text>Update {fileData.name}</Text>;
      case BottomSheetContentType.Delete:
        return <Text>Delete {fileData.name}</Text>;
      case BottomSheetContentType.PermanentDelete:
        return <Text>Permanently Delete {fileData.name}</Text>;
      default:
        return (
          <BottomSheetOptions fileName={fileData?.name} setView={setView} />
        );
    }
  };

  return <View>{renderContent()}</View>;
};
