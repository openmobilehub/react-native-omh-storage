import { useState } from 'react';
import { View } from 'react-native';

import { StorageEntity } from '@openmobilehub/storage-core';

import { BottomSheetContentType } from './BottomSheetContent.types';
import { MetadataContent } from './content/metadata/MetadataContent';
import { PermissionsContent } from './content/permissions/PermissionsContent';
import { UpdateContent } from './content/update/UpdateContent';
import { VersionsContent } from './content/versions/VersionsContent';
import { BottomSheetOptions } from './parts/bottomSheetOptions';

interface BottomSheetContentProps {
  file: StorageEntity;
  onUpdatePress?: () => void;
  onDeletePress?: () => void;
  onPermanentDeletePress?: () => void;
  closeBottomSheet: () => void;
}

export const BottomSheetContent: React.FC<BottomSheetContentProps> = ({
  file,
  onDeletePress,
  onPermanentDeletePress,
  closeBottomSheet,
}) => {
  const [view, setView] = useState<BottomSheetContentType>(
    BottomSheetContentType.Options
  );

  const renderContent = () => {
    switch (view) {
      case BottomSheetContentType.Metadata:
        return <MetadataContent file={file} />;
      case BottomSheetContentType.Permissions:
        return <PermissionsContent file={file} />;
      case BottomSheetContentType.Versions:
        return <VersionsContent file={file} />;
      case BottomSheetContentType.Update:
        return (
          <UpdateContent file={file} closeBottomSheet={closeBottomSheet} />
        );
      default:
        return (
          <BottomSheetOptions
            fileName={file.name}
            setView={setView}
            onDeletePress={onDeletePress}
            onPermanentDeletePress={onPermanentDeletePress}
          />
        );
    }
  };

  return <View>{renderContent()}</View>;
};
