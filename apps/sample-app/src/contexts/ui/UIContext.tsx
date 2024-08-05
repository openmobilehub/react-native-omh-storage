import {
  createContext,
  MutableRefObject,
  ReactNode,
  useContext,
  useRef,
} from 'react';

import { BottomSheetModal } from '@gorhom/bottom-sheet';

type UIContextValue = {
  currentlyFocusedCreateFileBottomSheetRef: MutableRefObject<BottomSheetModal | null>;
  setCurrentlyFocusedCreateFileBottomSheetRef: (
    ref: BottomSheetModal | null
  ) => void;
} | null;

export const UIContext = createContext<UIContextValue>(null);

interface Props {
  children: ReactNode;
}

export const UIContextProvider = ({ children }: Props) => {
  const currentlyFocusedCreateFileBottomSheetRef =
    useRef<BottomSheetModal | null>(null);

  const setCurrentlyFocusedCreateFileBottomSheetRef = (
    ref: BottomSheetModal | null
  ) => {
    currentlyFocusedCreateFileBottomSheetRef.current = ref;
  };

  return (
    <UIContext.Provider
      value={{
        currentlyFocusedCreateFileBottomSheetRef,
        setCurrentlyFocusedCreateFileBottomSheetRef,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUIContext = () => {
  const context = useContext(UIContext);

  if (context == null) {
    throw new Error('useUIContext must be used within a UIContextProvider');
  }

  return context;
};
