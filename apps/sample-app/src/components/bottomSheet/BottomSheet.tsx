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

const maximumDynamicContentSize = Dimensions.get('window').height * 0.9;

export const BottomSheet = forwardRef<BottomSheetModal, BottomSheetProps>(
  (
    {
      children,
      contentContainerStyle,
      snapPoints = ['50%', '90%'],
      enableDynamicSizing = true,
      maxDynamicContentSize = maximumDynamicContentSize,
      ...props
    },
    ref
  ) => {
    return (
      <BottomSheetModal
        {...props}
        ref={ref}
        snapPoints={snapPoints}
        backdropComponent={BottomSheetBackdrop}
        enableDynamicSizing={enableDynamicSizing}
        maxDynamicContentSize={maxDynamicContentSize}
      >
        <BottomSheetScrollView
          keyboardShouldPersistTaps="handled"
          style={[styles.contentContainer, contentContainerStyle]}
        >
          {children}
        </BottomSheetScrollView>
      </BottomSheetModal>
    );
  }
);
