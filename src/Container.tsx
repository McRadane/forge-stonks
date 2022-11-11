import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { App } from './App';
import { LanguageProvider } from './resources/lang/LanguageProvider';
import { persistor, store } from './store';

export const Container = () => {
  return (
    <LanguageProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </LanguageProvider>
  );
};
