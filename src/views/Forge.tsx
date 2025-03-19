import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { useSelector } from 'react-redux';

import { useDrawerOpen, useDrawerSetStatus } from '../components/DrawerProvider';
import { MainContainer } from '../components/MainContainer';
import { CraftsContainer } from '../forge/CraftsContainer';
import { ForgeOptionsSwitcher } from '../forge/ForgeOptionsSwitcher';
import { Timers } from '../forge/timers/Timers';
import { OptionsSwitcher } from '../options/OptionsSwitcher';
import type { RootState } from '../store';

const Forge = () => {
  const open = useDrawerOpen('forge');
  const { toggle } = useDrawerSetStatus('forge');

  const loading = useSelector((state: RootState) => state.worker.loading);

  return (
    <>
      <Box component="aside">
        <OptionsSwitcher open={open} toggle={toggle}>
          <ForgeOptionsSwitcher />
        </OptionsSwitcher>
      </Box>
      <MainContainer>
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
      </MainContainer>
    </>
  );
};

/**
 * Needed for React.lazy
 */
export default Forge;
