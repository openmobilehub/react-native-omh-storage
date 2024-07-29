import React, { useRef, useState } from 'react';
import {
  Alert,
  Button,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { type OmhUserProfile } from '@openmobilehub/auth-core';
import { useRoute } from '@react-navigation/native';
import { type NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Adjust the import based on your icon library

import { type RootStackParamList } from '@/app/navigation';
import {
  getAuthProvider,
  SignedInProviderContext,
} from '@/app/SignedInProvider';
import { BottomSheet } from '@/components/bottomSheet';
import { BottomSheetContent } from '@/components/bottomSheetContent';

type Props = NativeStackScreenProps<RootStackParamList, 'SignedIn'>;
type SignedInRouteProp = Props['route'];

//TODO: Remove mock data once fetching is implemented
const mockFiles = [
  { id: '1', name: 'File 1' },
  { id: '2', name: 'File 2' },
  { id: '3', name: 'File 3' },
];

export default function SignedInScreen() {
  const insets = useSafeAreaInsets();
  const route = useRoute<SignedInRouteProp>();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [selectedFile, setSelectedFile] = useState<any>(null); //TODO: Define proper type for file data once fetching is implemented

  const handleBottomSheetOpen = () => {
    bottomSheetModalRef.current?.present();
  };
  const handleBottomSheetClose = () => {
    setSelectedFile(null);
  };

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

  //TODO: Define proper type for file data once fetching is implemented
  const handleFilePress = (file: any) => {
    setSelectedFile(file);
    bottomSheetModalRef.current?.present();
  };

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
      <FlatList
        data={mockFiles}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <View style={styles.fileItem}>
              <Text>{item.name}</Text>
              <Pressable onPress={() => handleFilePress(item)}>
                <Icon name="dots-vertical" size={16} />
              </Pressable>
            </View>
          </View>
        )}
      />
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
        <Button title="Open Bottom Sheet" onPress={handleBottomSheetOpen} />

        <Button onPress={onSignOut} title="Sign out" testID="sign-out" />
      </View>
      <BottomSheet ref={bottomSheetModalRef} onDismiss={handleBottomSheetClose}>
        {selectedFile && <BottomSheetContent fileData={selectedFile} />}
      </BottomSheet>
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
