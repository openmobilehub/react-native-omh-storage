import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Button } from 'react-native-paper';

import {
  getAuthProvider,
  PROVIDER_NAMES,
  SignedInProviderContext,
  type Providers,
} from '@/app/SignedInProvider';

export default function HomeScreen() {
  const { signInWithProvider } = React.useContext(SignedInProviderContext);

  async function onSignIn(PROVIDER_NAME: Providers) {
    try {
      const googleAuthProvider = await getAuthProvider(PROVIDER_NAME);

      await googleAuthProvider.signIn();

      signInWithProvider(PROVIDER_NAME);
    } catch (error: any) {
      Alert.alert('Error', error?.message);
    }
  }

  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        onPress={() => onSignIn(PROVIDER_NAMES.GOOGLE)}
        testID="sign-in-google"
      >
        Sign in with Google
      </Button>
      {/* <Button
        mode="contained"
        onPress={() => onSignIn(PROVIDER_NAMES.MICROSOFT)}
        testID="sign-in-microsoft"
      >
        Sign in with Microsoft
      </Button>
      <Button
        mode="contained"
        onPress={() => onSignIn(PROVIDER_NAMES.DROPBOX)}
        testID="sign-in-dropbox"
      >
        Sign in with Dropbox
      </Button> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 20,
  },
});
