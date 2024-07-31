import { useState } from 'react';
import { View } from 'react-native';

import { StorageEntity } from '@openmobilehub/storage-core';

import { BottomSheetContentType } from './BottomSheetContent.types';
import { MetadataContent } from './content/metadata/MetadataContent';
import { PermissionsContent } from './content/permissions/PermissionsContent';
import { BottomSheetOptions } from './parts/bottomSheetOptions';

interface BottomSheetContentProps {
  file: StorageEntity;
  onUpdatePress?: () => void;
  onDeletePress?: () => void;
  onPermanentDeletePress?: () => void;
}

export const BottomSheetContent: React.FC<BottomSheetContentProps> = ({
  file,
  onUpdatePress,
  onDeletePress,
  onPermanentDeletePress,
}) => {
  const [view, setView] = useState<BottomSheetContentType>(
    BottomSheetContentType.Options
  );

  const renderContent = () => {
    switch (view) {
      case BottomSheetContentType.Metadata:
        return <MetadataContent file={file} />;
      case BottomSheetContentType.Permissions:
        return <PermissionsContent />;
      default:
        return (
          <BottomSheetOptions
            fileName={file.name}
            setView={setView}
            onUpdatePress={onUpdatePress}
            onDeletePress={onDeletePress}
            onPermanentDeletePress={onPermanentDeletePress}
          />
        );
    }
  };

  return <View>{renderContent()}</View>;
};
