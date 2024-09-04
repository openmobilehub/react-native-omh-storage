import { useColorScheme } from 'react-native';

import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  adaptNavigationTheme,
  MD3DarkTheme,
  MD3LightTheme,
} from 'react-native-paper';

export function useCreateAdaptiveTheme() {
  const isDark = useColorScheme() === 'dark';

  const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
  });

  return isDark
    ? {
        ...MD3DarkTheme,
        ...DarkTheme,
        colors: {
          ...MD3DarkTheme.colors,
          ...DarkTheme.colors,
          backdrop: '#424242',
          background: '#121212',
          onSurface: '#FFFFFF',
          onBackground: '#EFEFEF',
          primary: '#BB86FC',
          onPrimary: '#FFFFFF',
        },
      }
    : {
        ...MD3LightTheme,
        ...LightTheme,
        colors: {
          ...MD3LightTheme.colors,
          ...LightTheme.colors,
          primary: '#BB86FC',
          onPrimary: '#FFFFFF',
        },
      };
}

export default useCreateAdaptiveTheme;
