import React from 'react';

import { PaperProvider } from 'react-native-paper';
import { RootSiblingParent } from 'react-native-root-siblings';

import RootNavigationContainer from '@/app/navigation';
import SignedInProvider from '@/app/SignedInProvider';

export default function App() {
  return (
    <RootSiblingParent>
      <PaperProvider>
        <SignedInProvider>
          <RootNavigationContainer />
        </SignedInProvider>
      </PaperProvider>
    </RootSiblingParent>
  );
}
