import { View } from 'react-native';

import { Button } from 'react-native-paper';

import { Provider } from '@/constants/provider';
import { useAuthContext } from '@/contexts/auth/AuthContext';

import { styles } from './LoginScreen.styles';

export const LoginScreen = () => {
  const { login } = useAuthContext();

  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        onPress={() => login(Provider.GOOGLEDRIVE)}
        testID="sign-in-googledrive"
      >
        Sign in to Google Drive
      </Button>
      <Button
        mode="contained"
        onPress={() => login(Provider.ONEDRIVE)}
        testID="sign-in-onedrive"
      >
        Sign in to OneDrive
      </Button>
      <Button
        mode="contained"
        onPress={() => login(Provider.DROPBOX)}
        testID="sign-in-dropbox"
      >
        Sign in to Dropbox
      </Button>
    </View>
  );
};
