import {
  BottomSheetBackdrop as BaseBottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';

export const BottomSheetBackdrop = (props: BottomSheetBackdropProps) => (
  <BaseBottomSheetBackdrop
    {...props}
    disappearsOnIndex={-1}
    appearsOnIndex={0}
  />
);
