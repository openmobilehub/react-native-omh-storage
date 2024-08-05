import React, { useCallback, useContext, useState } from 'react';

import { Snackbar } from 'react-native-paper';

type ButtonAction = () => void;

export type SnackbarContextType = {
  showSnackbar: (
    text: string,
    options?: {
      duration?: number;
      buttonLabel?: string;
      buttonAction: ButtonAction;
    }
  ) => void;
} | null;

export const SnackbarContext = React.createContext<SnackbarContextType>(null);

const DEFAULT_SNACKBAR_DURATION: number = 2800;

export type Props = { children: React.ReactNode };

export const SnackbarContextProvider = ({ children }: Props) => {
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState<string | null>(null);
  const [buttonLabel, setButtonLabel] = useState<string | null>(null);
  const [buttonAction, setButtonAction] = useState<ButtonAction | null>(null);
  const [duration, setDuration] = useState(DEFAULT_SNACKBAR_DURATION);
  const [key, setKey] = useState<number>(-1);

  const onDismissSnackBar = useCallback(() => {
    setVisible(false);
  }, []);

  return (
    <SnackbarContext.Provider
      value={{
        showSnackbar(newText, options) {
          setKey(Date.now());
          setText(newText);
          setButtonLabel(options?.buttonLabel ?? null);
          setButtonAction(options?.buttonAction ?? null);
          setDuration(options?.duration ?? DEFAULT_SNACKBAR_DURATION);
          setVisible(true);
        },
      }}
    >
      {children}

      <Snackbar
        key={key}
        visible={visible}
        onDismiss={onDismissSnackBar}
        duration={duration}
        action={{
          label: buttonLabel ?? 'Dismiss',
          onPress: () => {
            buttonAction?.();
            onDismissSnackBar();
          },
        }}
      >
        {text}
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);

  if (context == null) {
    throw new Error(
      'useSnackbarContext must be used within a SnackbarContextProvider'
    );
  }

  return context;
};
