import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { App } from './App';
import { LanguageProvider } from './resources/lang/LanguageProvider';
import { persistor, store } from './store';

export const Container = () => {
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 400,
        md: 800,
        lg: 1200,
        xl: 1536
      }
    }
  });

  return (
    <LanguageProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </LanguageProvider>
  );
};
