import { useEffect } from 'react';

import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { FullScreenLoadingState } from '@/components/fullScreenLoadingState/FullScreenLoadingState';
import { useAuthContext } from '@/contexts/auth/AuthContext';
import { ContextMenu } from '@/navigation/contextMenu/ContexMenu';
import { FileViewerScreen } from '@/screens/fileViewer/FileViewerScreen';
import { LoginScreen } from '@/screens/login/LoginScreen';

export type RootStackParamList = {
  Login: undefined;
  FileViewer: { folderId?: string; folderName?: string };
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
  const { silentLogin, initializationStatus, accessToken, provider } =
    useAuthContext();

  useEffect(() => {
    if (initializationStatus === 'idle') {
      silentLogin();
    }
  }, [silentLogin, initializationStatus]);

  if (
    initializationStatus === 'initializing' ||
    initializationStatus === 'idle'
  ) {
    return <FullScreenLoadingState />;
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
          options={({ route }) => ({
            title: route.params.folderName || provider || 'File Viewer',
            headerRight: ContextMenu,
          })}
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
