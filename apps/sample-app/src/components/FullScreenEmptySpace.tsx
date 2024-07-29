import { StyleSheet, View } from 'react-native';

import { Icon, Text } from 'react-native-paper';

export const FullScreenEmptySpace = () => {
  return (
    <View style={styles.container}>
      <Icon source="folder-information-outline" size={64} />
      <Text variant="bodyLarge">No files found!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    rowGap: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
