import { View, ViewStyle } from 'react-native';

import { ActivityIndicator } from 'react-native-paper';

import useIsDarkTheme from '@/hooks/useIsDarkTheme.ts';

import { styles } from './FullScreenLoadingState.styles';

interface FullScreenLoadingStateProps {
  containerStyles?: ViewStyle;
  overlay?: boolean;
}

export const FullScreenLoadingState = ({
  overlay = false,
}: FullScreenLoadingStateProps) => {
  const isDarkTheme = useIsDarkTheme();
  const backgroundOverlayStyle = isDarkTheme
    ? styles.backgroundBlack
    : styles.backgroundWhite;
  return (
    <View style={[styles.container, overlay && backgroundOverlayStyle]}>
      <ActivityIndicator size="large" />
    </View>
  );
};
