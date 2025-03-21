import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { useDrawerOpen, useDrawerSetStatus } from '@ui/components/DrawerProvider';
import { MainContainer } from '@ui/components/MainContainer';
import { Timers } from '@ui/forge/timers/Timers';
import { BinsOnlyOptionsSwitcher } from '@ui/options/BinsOnlyOptionsSwitcher';
import { OptionsSwitcher } from '@ui/options/OptionsSwitcher';
import { PetsFlipContainer } from '@ui/petFlips/PetsFlipContainer';
import { useAppSelector } from '@ui/store';
import { FC } from 'react';

import { IPageProps } from './types';

const PetsFlips: FC<IPageProps> = ({ path }) => {
  const open = useDrawerOpen(path);
  const { toggle } = useDrawerSetStatus(path);

  const loading = useAppSelector((state) => state.worker.loading);

  return (
    <>
      <Box component="aside">
        <OptionsSwitcher open={open} toggle={toggle}>
          <BinsOnlyOptionsSwitcher />
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
          <PetsFlipContainer />
        </Box>
      </MainContainer>
    </>
  );
};

/**
 * Needed for React.lazy
 */
export default PetsFlips;
