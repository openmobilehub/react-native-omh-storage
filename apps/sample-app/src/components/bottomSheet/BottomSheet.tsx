import { forwardRef, ReactNode } from 'react';
import { Dimensions, ViewStyle } from 'react-native';

import {
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetScrollView,
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
    { children, contentContainerStyle, snapPoints = ['50%', '90%'], ...props },
    ref
  ) => {
    return (
      <BottomSheetModal
        {...props}
        ref={ref}
        snapPoints={snapPoints}
        backdropComponent={BottomSheetBackdrop}
        enableDynamicSizing
        maxDynamicContentSize={Dimensions.get('window').height * 0.9}
      >
        <BottomSheetScrollView
          style={[styles.contentContainer, contentContainerStyle]}
        >
          {children}
        </BottomSheetScrollView>
      </BottomSheetModal>
    );
  }
);
