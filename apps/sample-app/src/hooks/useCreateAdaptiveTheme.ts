import { useColorScheme } from 'react-native';

import { MD3DarkTheme, MD3LightTheme, MD3Theme } from 'react-native-paper';

export function useCreateAdaptiveTheme(): MD3Theme {
  const isDark = useColorScheme() === 'dark';

  return isDark
    ? {
        ...MD3DarkTheme,
        colors: {
          ...MD3DarkTheme.colors,
          backdrop: '#424242',
          background: '#121212',
          onSurface: '#FFFFFF',
          onBackground: '#EFEFEF',
          primary: '#BB86FC',
        },
      }
    : {
        ...MD3LightTheme,
        colors: {
          ...MD3LightTheme.colors,
          primary: '#BB86FC',
        },
      };
}

export default useCreateAdaptiveTheme;
