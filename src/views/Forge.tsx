import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { useSelector } from 'react-redux';

import { useDrawerOpen, useDrawerSetStatus } from '../components/DrawerProvider';
import { CraftsContainer } from '../forge/CraftsContainer';
import { OptionsSwitcher } from '../forge/options/OptionsSwitcher';
import { Timers } from '../forge/timers/Timers';
import type { RootState } from '../store';

export const Forge = () => {
  const open = useDrawerOpen('forge');
  const { toggle } = useDrawerSetStatus('forge');

  const loading = useSelector((state: RootState) => state.worker.loading);

  return (
    <>
      <Box component="aside">
        <OptionsSwitcher open={open} toggle={toggle} />
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
    </>
  );
};
