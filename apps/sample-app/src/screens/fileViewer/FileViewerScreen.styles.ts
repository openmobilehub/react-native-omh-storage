import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 10,
    rowGap: 5,
  },
  userProfileContainer: {
    flexDirection: 'row',
  },
  userProfileImage: {
    width: 100,
    aspectRatio: 1,
  },
  userProfileContents: {
    justifyContent: 'space-between',
    marginHorizontal: 5,
  },
  actionButtons: {
    marginTop: 'auto',
    alignItems: 'flex-start',
    rowGap: 7.5,
  },
  label: {
    color: 'black',
  },
});
