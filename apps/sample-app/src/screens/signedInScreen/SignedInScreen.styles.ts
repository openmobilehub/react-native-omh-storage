import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
  sheetContent: {
    flex: 1,
    padding: 16,
  },
  fileItem: {
    flex: 1,
    margin: 5,
    padding: 10,
    minHeight: 100,
    flexDirection: 'row',
    textAlign: 'center',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
  },
  itemContainer: {
    flex: 1 / 2,
  },
  list: {
    flexGrow: 1,
  },
});
