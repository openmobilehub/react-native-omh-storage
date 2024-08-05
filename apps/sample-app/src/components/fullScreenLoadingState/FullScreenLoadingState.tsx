import { View, ViewStyle } from 'react-native';

import { ActivityIndicator } from 'react-native-paper';

import { styles } from './FullScreenLoadingState.styles';

interface FullScreenLoadingStateProps {
  containerStyles?: ViewStyle;
  withBackground?: boolean;
}

export const FullScreenLoadingState = ({
  withBackground = false,
}: FullScreenLoadingStateProps) => {
  return (
    <View style={[styles.container, withBackground && styles.background]}>
      <ActivityIndicator size="large" />
    </View>
  );
};
