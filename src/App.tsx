import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SettingsIcon from '@mui/icons-material/Settings';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

import { OptionsSwitcher } from './options/OptionsSwitcher';
import { LanguageContext } from './resources/lang/LanguageContext';
import { RootState } from './store';
import { CraftsContainer } from './craft/CraftsContainer';
import { useWorker } from './worker/runWorker';
import { Logger } from './logger';
import { Timers } from './timers/Timers';

export const App = () => {
  const dispatch = useDispatch();
  const worker = useWorker();
  const workerInit = useRef(false);
  const loading = useSelector((state: RootState) => state.worker.loading);
  const [open, setOpen] = useState(false);
  const languageContext = useContext(LanguageContext);
  const {
    dictionary: {
      ui: { title }
    },
    userLanguageChange
  } = languageContext;

  const toggleDrawer = useCallback(() => {
    setOpen((status) => !status);
  }, []);

  useEffect(() => {
    // initWorkerRunner(dispatch);
    if (!workerInit.current && worker) {
      Logger.log('Initializing WebWorker');
      workerInit.current = true;
      // const worker = new WorkerRunner(dispatch, languageContext);
      // setWorker(worker);
      worker.setup(dispatch, languageContext);
      worker.getLanguage().then((language) => {
        const resultLanguage = userLanguageChange(language);
        if (resultLanguage !== language) {
          worker.setLanguage(resultLanguage);
        }
        worker.initialize();
      });
    }
  }, [dispatch, languageContext, userLanguageChange, worker]);

  return (
    <Box sx={{ display: 'flex', paddingTop: '64px' /*minHeight: 'calc(100vh - 84px)'*/ }}>
      <AppBar component="nav">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <Button color="inherit" onClick={toggleDrawer}>
            <SettingsIcon />
          </Button>
        </Toolbar>
      </AppBar>
      <Box component="aside">
        <OptionsSwitcher open={open} toggle={toggleDrawer} />
      </Box>
      <Box component="main" sx={{ width: '100%' }}>
        <Box sx={{ height: 8 }}>{loading && <LinearProgress />}</Box>
        <Timers />
        <CraftsContainer />
      </Box>
    </Box>
  );
};
