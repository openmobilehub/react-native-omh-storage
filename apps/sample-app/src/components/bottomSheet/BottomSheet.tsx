import React, { forwardRef, ReactNode } from 'react';
import { ViewStyle } from 'react-native';

import {
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

import { styles } from './BottomSheet.styles';
import { BottomSheetBackdrop } from './parts/BottomSheetBackdrop';

interface BottomSheetProps extends BottomSheetModalProps {
  children: ReactNode;
  contentContainerStyle?: ViewStyle;
  snapPoints?: (string | number)[];
}

export const BottomSheet = forwardRef<BottomSheetModal, BottomSheetProps>(
  (
    { children, contentContainerStyle, snapPoints = ['50%'], ...props },
    ref
  ) => {
    return (
      <BottomSheetModal
        {...props}
        ref={ref}
        snapPoints={snapPoints}
        backdropComponent={BottomSheetBackdrop}
      >
        <BottomSheetView
          style={[styles.contentContainer, contentContainerStyle]}
        >
          {children}
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);
