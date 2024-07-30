import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import { RootSiblingParent } from 'react-native-root-siblings';

import RootNavigationContainer from '@/app/navigation';
import SignedInProvider from '@/app/SignedInProvider';

import { styles } from './App.styles';

export default function App() {
  return (
    <RootSiblingParent>
      <GestureHandlerRootView style={styles.gestureHanlderContainer}>
        <PaperProvider>
          <BottomSheetModalProvider>
            <SignedInProvider>
              <RootNavigationContainer />
            </SignedInProvider>
          </BottomSheetModalProvider>
        </PaperProvider>
      </GestureHandlerRootView>
    </RootSiblingParent>
  );
}
