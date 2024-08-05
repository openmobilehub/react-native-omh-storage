import { Platform, StyleSheet, ViewStyle } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    ...Platform.select<ViewStyle>({
      ios: {
        marginVertical: 10,
      },
    }),
  },
  label: {
    flex: 1,
    paddingRight: 8,
  },
  disabled: {
    opacity: 0.5,
  },
});
