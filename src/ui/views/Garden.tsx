import { Box, LinearProgress } from '@mui/material';
import { useDrawerOpen, useDrawerSetStatus } from '@ui/components/DrawerProvider';
import { MainContainer } from '@ui/components/MainContainer';
import { useGardenPrice } from '@ui/garden/functions';
import { GardenDashboard } from '@ui/garden/GardenDashboard';
import { OptionsSwitcher } from '@ui/options/OptionsSwitcher';
import { useAppSelector } from '@ui/store';
import { FC } from 'react';

import { IPageProps } from './types';

const Garden: FC<IPageProps> = ({ path }) => {
  const open = useDrawerOpen(path);
  const { toggle } = useDrawerSetStatus(path);

  const { fuels, organicMatters } = useGardenPrice();

  const loading = useAppSelector((state) => state.worker.loading);

  return (
    <>
      <Box component="aside">
        <OptionsSwitcher open={open} toggle={toggle} />
      </Box>
      <MainContainer>
        <Box sx={{ height: 8 }}>{loading && <LinearProgress />}</Box>
        <GardenDashboard fuels={fuels} organicMatters={organicMatters} />
      </MainContainer>
    </>
  );
};

/**
 * Needed for React.lazy
 */
export default Garden;
