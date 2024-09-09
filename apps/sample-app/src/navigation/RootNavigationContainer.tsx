import { useEffect, useMemo } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { FullScreenLoadingState } from '@/components/fullScreenLoadingState/FullScreenLoadingState';
import { useAuthContext } from '@/contexts/auth/AuthContext';
import useCreateAdaptiveTheme from '@/hooks/useCreateAdaptiveTheme.ts';
import { ContextMenu } from '@/navigation/contextMenu/ContexMenu';
import { FileViewerScreen } from '@/screens/fileViewer/FileViewerScreen';
import { LoginScreen } from '@/screens/login/LoginScreen';

export type RootStackParamList = {
  Login: undefined;
  FileViewer: { folderId?: string; folderName?: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const headerRight = (folderId?: string) => <ContextMenu folderId={folderId} />;

const RootStack = () => {
  const { silentLogin, initializationStatus, authClient, provider } =
    useAuthContext();

  useEffect(() => {
    if (initializationStatus === 'idle') {
      silentLogin();
    }
  }, [silentLogin, initializationStatus]);

  const theme = useCreateAdaptiveTheme();

  const screenOptions = useMemo(
    () => ({
      contentStyle: {
        backgroundColor: theme.colors.background,
      },
      headerStyle: {
        backgroundColor: theme.colors.primary,
      },
    }),
    [theme.colors]
  );

  if (
    initializationStatus === 'initializing' ||
    initializationStatus === 'idle'
  ) {
    return <FullScreenLoadingState />;
  }

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      {!authClient ? (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            ...screenOptions,
            title: 'Sign in',
          }}
        />
      ) : (
        <Stack.Screen
          name="FileViewer"
          component={FileViewerScreen}
          options={({ route }) => ({
            ...screenOptions,
            title: route.params.folderName || provider || 'File Viewer',
            headerRight: () => headerRight(route.params.folderId),
          })}
          initialParams={{}}
        />
      )}
    </Stack.Navigator>
  );
};

export const RootNavigationContainer = () => {
  const theme = useCreateAdaptiveTheme();
  return (
    <NavigationContainer theme={theme}>
      <RootStack />
    </NavigationContainer>
  );
};
