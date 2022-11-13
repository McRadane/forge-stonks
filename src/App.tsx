import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SettingsIcon from '@mui/icons-material/Settings';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

import { OptionsSwitcher } from './options/OptionsSwitcher';
import { useLanguage } from './resources/lang/LanguageContext';
import { RootState } from './store';
import { CraftsContainer } from './craft/CraftsContainer';
import { WorkerRunner, WorkerRunnerContext } from './worker/runWorker';
import { Logger } from './logger';

export const App = () => {
  const dispatch = useDispatch();
  const [worker, setWorker] = useState<WorkerRunner>();
  const workerInit = useRef(false);
  const loading = useSelector((state: RootState) => state.loading.loading);
  const [open, setOpen] = useState(false);
  const {
    ui: { title }
  } = useLanguage();

  const toggleDrawer = useCallback(() => {
    setOpen((status) => !status);
  }, []);

  useEffect(() => {
    // initWorkerRunner(dispatch);
    if (!workerInit.current) {
      Logger.log('Initializing WebWorker');
      workerInit.current = true;
      setWorker(new WorkerRunner(dispatch));
    }
  }, [dispatch]);

  if (!worker) {
    return <></>;
  }

  return (
    <WorkerRunnerContext.Provider value={{ instance: worker }}>
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
          <CraftsContainer />
        </Box>
      </Box>
    </WorkerRunnerContext.Provider>
  );
};
