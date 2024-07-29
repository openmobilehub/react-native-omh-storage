import { StyleSheet, View } from 'react-native';

import { ActivityIndicator } from 'react-native-paper';

export const FullScreenLoadingIndicator = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
