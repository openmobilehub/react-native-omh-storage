import { ReactNode } from 'react';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import { RootSiblingParent } from 'react-native-root-siblings';

import { ContextsProvider } from '@/contexts/provider/ContextsProvider';
import { QueryClientProvider } from '@/data/client/QueryClientProvider';
import { RootNavigationContainer } from '@/navigation/RootNavigationContainer';

import { styles } from './App.styles';

interface ProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <RootSiblingParent>
      <GestureHandlerRootView style={styles.gestureHanlderContainer}>
        <PaperProvider>
          <BottomSheetModalProvider>{children}</BottomSheetModalProvider>
        </PaperProvider>
      </GestureHandlerRootView>
    </RootSiblingParent>
  );
};

export const App = () => {
  return (
    <ContextsProvider>
      <QueryClientProvider>
        <Providers>
          <RootNavigationContainer />
        </Providers>
      </QueryClientProvider>
    </ContextsProvider>
  );
};
