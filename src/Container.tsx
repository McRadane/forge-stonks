import { red } from '@mui/material/colors';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useEffect, useMemo, useState } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { App } from './App';
import { LanguageProvider } from './resources/lang/LanguageProvider';
import { persistor, storage, store } from './store';
import { WorkerRunner, WorkerRunnerContext } from './worker/runWorker';

export const Container = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [worker, setWorker] = useState<WorkerRunner>();

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
          primary: {
            main: red[500]
          }
        },
        breakpoints: {
          values: {
            xs: 0,
            sm: 400,
            md: 800,
            lg: 1200,
            xl: 1536
          }
        }
      }),
    [prefersDarkMode]
  );

  useEffect(() => {
    const worker = new WorkerRunner();
    storage.worker = worker;
    setWorker(worker);
  }, []);

  if (!worker) {
    return <></>;
  }

  return (
    <WorkerRunnerContext.Provider value={{ instance: worker }}>
      <LanguageProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <App />
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </LanguageProvider>
    </WorkerRunnerContext.Provider>
  );
};
