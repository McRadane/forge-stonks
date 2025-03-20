import { Box, LinearProgress } from '@mui/material';
import { useSelector } from 'react-redux';

import { useDrawerOpen, useDrawerSetStatus } from '../components/DrawerProvider';
import { MainContainer } from '../components/MainContainer';
import { OptionsSwitcher } from '../options/OptionsSwitcher';
import { useRNGPrices } from '../rngFlips/functions';
import { RNGFlipsDashboard } from '../rngFlips/RNGFlipsDashboard';
import { RootState } from '../store';

const RNGFlips = () => {
  const open = useDrawerOpen('rng');
  const { toggle } = useDrawerSetStatus('rng');

  const { flips } = useRNGPrices();

  const loading = useSelector((state: RootState) => state.worker.loading);

  return (
    <>
      <Box component="aside">
        <OptionsSwitcher open={open} toggle={toggle} />
      </Box>
      <MainContainer>
        <Box sx={{ height: 8 }}>{loading && <LinearProgress />}</Box>
        <RNGFlipsDashboard flips={flips} />
      </MainContainer>
    </>
  );
};

/**
 * Needed for React.lazy
 */
export default RNGFlips;
