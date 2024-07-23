import React from 'react';
import { Alert, Button, Image, StyleSheet, Text, View } from 'react-native';

import { type OmhUserProfile } from '@openmobilehub/auth-core';
import { useRoute } from '@react-navigation/native';
import { type NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { type RootStackParamList } from '@/app/navigation';
import {
  getAuthProvider,
  SignedInProviderContext,
} from '@/app/SignedInProvider';

type Props = NativeStackScreenProps<RootStackParamList, 'SignedIn'>;
type SignedInRouteProp = Props['route'];

export default function SignedInScreen() {
  const insets = useSafeAreaInsets();
  const route = useRoute<SignedInRouteProp>();

  const { provider } = route.params;

  const { signInWithProvider } = React.useContext(SignedInProviderContext);
  const [accessToken, setAccessToken] = React.useState<string | undefined>();
  const [userProfile, setUserProfile] = React.useState<
    OmhUserProfile | undefined
  >();

  React.useEffect(() => {
    onGetAccessToken();
    onGetUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onGetAccessToken() {
    try {
      const authProvider = await getAuthProvider(provider);

      const currentAccessToken = await authProvider.getAccessToken();

      setAccessToken(currentAccessToken);
    } catch (error: any) {
      Alert.alert('Error', error?.message);
    }
  }

  async function onGetUser() {
    try {
      const authProvider = await getAuthProvider(provider);

      const currentUserProfile = await authProvider.getUser();

      setUserProfile(currentUserProfile);
    } catch (error: any) {
      Alert.alert('Error', error?.message);
    }
  }

  async function onRefreshAccessToken() {
    try {
      const authProvider = await getAuthProvider(provider);

      const currentAccessToken = await authProvider.refreshAccessToken();

      setAccessToken(currentAccessToken);
    } catch (error: any) {
      Alert.alert('Error', error?.message);
    }
  }

  async function onRevokeAccessToken() {
    try {
      const authProvider = await getAuthProvider(provider);

      await authProvider.revokeAccessToken();
    } catch (error: any) {
      Alert.alert('Error', error?.message);
    }
  }

  async function onSignOut() {
    try {
      const authProvider = await getAuthProvider(provider);

      await authProvider.signOut();

      signInWithProvider(null);
    } catch (error: any) {
      Alert.alert('Error', error?.message);
    }
  }

  const profileImage =
    userProfile?.profileImage ??
    'https://www.btklsby.go.id/images/placeholder/avatar.png';

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View style={styles.userProfileContainer}>
        <Image
          style={styles.userProfileImage}
          source={{ uri: profileImage }}
          testID="profile-image"
        />

        <View style={styles.userProfileContents}>
          <Text style={styles.label} testID="name">
            Name: {userProfile?.name}
          </Text>

          <Text style={styles.label} testID="surname">
            Surname: {userProfile?.surname}
          </Text>

          <Text style={styles.label} testID="email">
            Email: {userProfile?.email}
          </Text>

          <Text style={styles.label}>Token:</Text>
        </View>
      </View>

      <Text style={styles.label} testID="token" numberOfLines={10}>
        {accessToken}
      </Text>

      <View style={styles.actionButtons}>
        <Button
          onPress={onGetAccessToken}
          title="Get access token"
          testID="get-access-token"
        />

        <Button onPress={onGetUser} title="Get user" testID="get-user" />

        <Button
          onPress={onRefreshAccessToken}
          title="Refresh access token"
          testID="refresh-access-token"
        />

        <Button
          onPress={onRevokeAccessToken}
          title="Revoke access token"
          testID="revoke-access-token"
        />

        <Button onPress={onSignOut} title="Sign out" testID="sign-out" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
