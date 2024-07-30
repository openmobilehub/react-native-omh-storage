import React from 'react';

import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  SignedInProviderContext,
  type Providers,
} from '@/app/SignedInProvider';
import { HomeScreen } from '@/screens/homeScreen';
import { SignedInScreen } from '@/screens/signedInScreen';

export type RootStackParamList = {
  Home: undefined;
  SignedIn: { provider: Providers };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

function RootStack() {
  const { signedInProvider } = React.useContext(SignedInProviderContext);

  return (
    <Stack.Navigator>
      {!signedInProvider ? (
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Sign in' }}
        />
      ) : (
        <Stack.Screen
          name="SignedIn"
          component={SignedInScreen}
          options={{
            title: signedInProvider,
          }}
          initialParams={{ provider: signedInProvider }}
        />
      )}
    </Stack.Navigator>
  );
}

export default function RootNavigationContainer() {
  return (
    <NavigationContainer theme={MyTheme}>
      <RootStack />
    </NavigationContainer>
  );
}
