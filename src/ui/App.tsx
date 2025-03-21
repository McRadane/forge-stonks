import Box from '@mui/material/Box';
import { LanguageContext } from '@shared/resources/lang/LanguageContext';
import { useContext, useEffect, useRef } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Logger } from './logger';
import { useAppDispatch } from './store';
import { Layout } from './views/Layout';
import { routes } from './views/routes';
import { useWorker } from './worker/WorkerContext';

export const App = () => {
  const dispatch = useAppDispatch();
  const worker = useWorker();
  const workerInit = useRef(false);

  const languageContext = useContext(LanguageContext);
  const { userLanguageChange } = languageContext;

  useEffect(() => {
    if (!workerInit.current && worker) {
      Logger.log('Initializing WebWorker');
      workerInit.current = true;
      worker
        .getLanguage()
        .then((language) => {
          if (language) {
            const resultLanguage = userLanguageChange(language);
            if (resultLanguage !== language) {
              worker.setLanguage(resultLanguage);
            }
          }

          worker.initialize();
        })
        .catch((error) => {
          Logger.log('Error durring WebWorker initialization', error);
        });
    }
  }, [dispatch, languageContext, userLanguageChange, worker]);

  return (
    <Box sx={{ display: 'flex', paddingTop: '64px' }}>
      <Routes>
        <Route element={<Layout />} path="/">
          {routes.map((route) => (
            <Route element={route.element} index={route.index} key={route.path} path={route.index ? undefined : route.path} />
          ))}
        </Route>
      </Routes>
    </Box>
  );
};
