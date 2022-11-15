import SettingsIcon from '@mui/icons-material/Settings';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CraftsContainer } from './craft/CraftsContainer';
import { Logger } from './logger';
import { OptionsSwitcher } from './options/OptionsSwitcher';
import { LanguageContext } from './resources/lang/LanguageContext';
import type { RootState } from './store';
import { Timers } from './timers/Timers';
import { useWorker } from './worker/WorkerContext';

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
      <AppBar component="nav">
        <Toolbar>
          <Typography component="div" sx={{ flexGrow: 1 }} variant="h6">
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
        <Box
          sx={
            {
              /*height: 'calc(100vh - 110px)', overflow: 'scroll' */
            }
          }
        >
          <CraftsContainer />
        </Box>
      </Box>
    </Box>
  );
};
