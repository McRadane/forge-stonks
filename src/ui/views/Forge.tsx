import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { useDrawerOpen, useDrawerSetStatus } from '@ui/components/DrawerProvider';
import { MainContainer } from '@ui/components/MainContainer';
import { CraftsContainer } from '@ui/forge/CraftsContainer';
import { ForgeOptionsSwitcher } from '@ui/forge/ForgeOptionsSwitcher';
import { Timers } from '@ui/forge/timers/Timers';
import { OptionsSwitcher } from '@ui/options/OptionsSwitcher';
import { useAppSelector } from '@ui/store';
import { FC } from 'react';

import { IPageProps } from './types';

const Forge: FC<IPageProps> = ({ path }) => {
  const open = useDrawerOpen(path);
  const { toggle } = useDrawerSetStatus(path);

  const loading = useAppSelector((state) => state.worker.loading);

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
