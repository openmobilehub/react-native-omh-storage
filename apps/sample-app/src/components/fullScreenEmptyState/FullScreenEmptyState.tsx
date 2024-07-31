import { View } from 'react-native';

import { Icon, Text } from 'react-native-paper';

import { styles } from './FullScreenEmptyState.styles';

export const FullScreenEmptyState = () => {
  return (
    <View style={styles.container}>
      <Icon source="folder-information-outline" size={64} />
      <Text variant="bodyLarge">No files found!</Text>
    </View>
  );
};
