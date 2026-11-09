import { Box, LinearProgress } from '@mui/material';
import { useDrawerOpen, useDrawerSetStatus } from '@ui/components/DrawerProvider';
import { MainContainer } from '@ui/components/MainContainer';
import { OptionsSwitcher } from '@ui/options/OptionsSwitcher';
import { useRNGPrices } from '@ui/rngFlips/hook';
import { RNGFlipsDashboard } from '@ui/rngFlips/RNGFlipsDashboard';
import { useAppSelector } from '@ui/store';
import { FC } from 'react';

import { IPageProps } from './types';

const RNGFlips: FC<IPageProps> = ({ path }) => {
  const open = useDrawerOpen(path);
  const { toggle } = useDrawerSetStatus(path);

  const { flips } = useRNGPrices();

  const loading = useAppSelector((state) => state.worker.loading);

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
