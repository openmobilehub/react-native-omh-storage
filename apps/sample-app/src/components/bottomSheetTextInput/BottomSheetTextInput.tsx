import { forwardRef, useCallback, useEffect } from 'react';

import 'react-native';

import { TextInput as RNTextInput } from 'react-native';

import { useBottomSheetInternal } from '@gorhom/bottom-sheet';
import { TextInput, TextInputProps } from 'react-native-paper';

export const BottomSheetTextInput = forwardRef<RNTextInput, TextInputProps>(
  ({ onFocus, onBlur, ...rest }, ref) => {
    const { shouldHandleKeyboardEvents } = useBottomSheetInternal();

    useEffect(() => {
      return () => {
        shouldHandleKeyboardEvents.value = false;
      };
    }, [shouldHandleKeyboardEvents]);

    const handleOnFocus = useCallback(
      (args: any) => {
        shouldHandleKeyboardEvents.value = true;
        if (onFocus) {
          onFocus(args);
        }
      },
      [onFocus, shouldHandleKeyboardEvents]
    );
    const handleOnBlur = useCallback(
      (args: any) => {
        shouldHandleKeyboardEvents.value = false;
        if (onBlur) {
          onBlur(args);
        }
      },
      [onBlur, shouldHandleKeyboardEvents]
    );

    return (
      <TextInput
        ref={ref}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        {...rest}
      />
    );
  }
);
