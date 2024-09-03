import { forwardRef, ReactNode, useMemo } from 'react';
import { Dimensions, ViewStyle } from 'react-native';

import {
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';

import useCreateAdaptiveTheme from '@/hooks/useCreateAdaptiveTheme.ts';

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
    const theme = useCreateAdaptiveTheme();
    const bottomSheetStyle = useMemo(
      () => ({
        backgroundColor: theme.colors.background,
      }),
      [theme.colors.background]
    );

    return (
      <BottomSheetModal
        {...props}
        ref={ref}
        snapPoints={snapPoints}
        backdropComponent={BottomSheetBackdrop}
        enableDynamicSizing={enableDynamicSizing}
        maxDynamicContentSize={maxDynamicContentSize}
        accessible={false}
      >
        <BottomSheetScrollView
          keyboardShouldPersistTaps="handled"
          style={[
            {
              ...bottomSheetStyle,
              ...styles.contentContainer,
            },
            contentContainerStyle,
          ]}
        >
          {children}
        </BottomSheetScrollView>
      </BottomSheetModal>
    );
  }
);
