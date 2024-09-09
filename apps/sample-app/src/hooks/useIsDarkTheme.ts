import { useColorScheme } from 'react-native';

export function useIsDarkTheme(): boolean {
  return useColorScheme() === 'dark';
}

export default useIsDarkTheme;
