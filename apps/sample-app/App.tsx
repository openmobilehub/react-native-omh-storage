import { ReactNode } from 'react';

import { PaperProvider } from 'react-native-paper';
import { RootSiblingParent } from 'react-native-root-siblings';

import { RootNavigationContainer } from '@/app/RootNavigationContainer';
import { ContextsProvider } from '@/contexts/provider/ContextsProvider';
import { QueryClientProvider } from '@/data/client/QueryClientProvider';

interface ProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <RootSiblingParent>
      <PaperProvider>{children}</PaperProvider>
    </RootSiblingParent>
  );
};

const App = () => {
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

export default App;
