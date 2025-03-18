import { red } from '@mui/material/colors';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useMemo } from 'react';
import { Provider } from 'react-redux';

import { App } from './App';
import { NotificationProvider } from './notification/NotificationContext';
import { LanguageProvider } from './resources/lang/LanguageProvider';
import { store } from './store';
import { WorkerProvider } from './worker/WorkerContext';

export const Container = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(
    () =>
      createTheme({
        breakpoints: {
          values: {
            lg: 1200,
            md: 800,
            sm: 400,
            xl: 1350,
            xs: 0
          }
        },
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
          primary: {
            main: red[500]
          }
        }
      }),
    [prefersDarkMode]
  );

  return (
    <LanguageProvider>
      <Provider store={store}>
        <NotificationProvider>
          <WorkerProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <App />
            </ThemeProvider>
          </WorkerProvider>
        </NotificationProvider>
      </Provider>
    </LanguageProvider>
  );
};
