import React from 'react';
import { Alert, View } from 'react-native';

import { Button } from 'react-native-paper';

import {
  getAuthProvider,
  PROVIDER_NAMES,
  SignedInProviderContext,
  type Providers,
} from '@/app/SignedInProvider';

import { styles } from './HomeScreen.styles';

export const HomeScreen = () => {
  const { signInWithProvider } = React.useContext(SignedInProviderContext);

  async function onSignIn(PROVIDER_NAME: Providers) {
    try {
      const authProvider = await getAuthProvider(PROVIDER_NAME);

      await authProvider.signIn();

      signInWithProvider(PROVIDER_NAME);
    } catch (error: any) {
      Alert.alert('Error', error?.message);
    }
  }

  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        onPress={() => onSignIn(PROVIDER_NAMES.GOOGLEDRIVE)}
        testID="sign-in-googledrive"
      >
        Sign in to Google Drive
      </Button>
      <Button
        mode="contained"
        onPress={() => onSignIn(PROVIDER_NAMES.ONEDRIVE)}
        testID="sign-in-onedrive"
      >
        Sign in to OneDrive
      </Button>
      <Button
        mode="contained"
        onPress={() => onSignIn(PROVIDER_NAMES.DROPBOX)}
        testID="sign-in-dropbox"
      >
        Sign in to Dropbox
      </Button>
    </View>
  );
};
