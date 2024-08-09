import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    columnGap: 8,
  },
  labelText: {
    marginTop: 2, // Added some margin, so label will be properly aligned with value text
  },
  valueText: {
    flex: 1,
    flexWrap: 'wrap',
  },
});
