import React, { useEffect } from 'react';

import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { FullScreenLoadingIndicator } from '@/components/FullScreenLoadingIndicator';
import { useAuthContext } from '@/contexts/auth/AuthContext';
import FileViewerScreen from '@/screens/fileViewer/FileViewerScreen';
import { LoginScreen } from '@/screens/login/LoginScreen';

export type RootStackParamList = {
  Login: undefined;
  FileViewer: { folderId?: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

const RootStack = () => {
  const { retrieveAuthProvider, isInitializing, accessToken } =
    useAuthContext();

  useEffect(() => {
    retrieveAuthProvider();
  }, [retrieveAuthProvider]);

  if (isInitializing) {
    return <FullScreenLoadingIndicator />;
  }

  return (
    <Stack.Navigator>
      {!accessToken ? (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Sign in' }}
        />
      ) : (
        <Stack.Screen
          name="FileViewer"
          component={FileViewerScreen}
          options={{
            title: 'test',
          }}
          initialParams={{}}
        />
      )}
    </Stack.Navigator>
  );
};

export const RootNavigationContainer = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <RootStack />
    </NavigationContainer>
  );
};
