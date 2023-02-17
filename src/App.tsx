import Box from '@mui/material/Box';
import { useContext, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { Logger } from './logger';
import { LanguageContext } from './resources/lang/LanguageContext';
import { Layout } from './views/Layout';
import { routes } from './views/routes';
import { useWorker } from './worker/WorkerContext';

export const App = () => {
  const dispatch = useDispatch();
  const worker = useWorker();
  const workerInit = useRef(false);

  const languageContext = useContext(LanguageContext);
  const { userLanguageChange } = languageContext;

  useEffect(() => {
    if (!workerInit.current && worker) {
      Logger.log('Initializing WebWorker');
      workerInit.current = true;
      worker.getLanguage().then((language) => {
        if (language) {
          const resultLanguage = userLanguageChange(language);
          if (resultLanguage !== language) {
            worker.setLanguage(resultLanguage);
          }
        }

        worker.initialize();
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
