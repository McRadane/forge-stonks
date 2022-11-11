import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SettingsIcon from '@mui/icons-material/Settings';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

import { Crafts } from './craft/Crafts';
import { OptionsSwitcher } from './options/OptionsSwitcher';
import { useLanguage } from './resources/lang/LanguageContext';
import { services } from './services/hypixel';
import { RootState } from './store';

export const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.loading.loading);
  const [open, setOpen] = useState(false);
  const {
    ui: { title }
  } = useLanguage();

  const toggleDrawer = useCallback(() => {
    setOpen((status) => !status);
  }, []);

  useEffect(() => {
    services.dispatcher = dispatch;
    services.cacheDuration = 3_600_000;
  }, [dispatch]);

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
        <Crafts />
      </Box>
    </Box>
  );
};
