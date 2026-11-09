import { Box, LinearProgress } from '@mui/material';
import { AuctionsAttributesContainer } from '@ui/auctionsAttributes/AuctionsAttributesContainer';
import { useAuctionsAttributes } from '@ui/auctionsAttributes/hook';
import { useDrawerOpen, useDrawerSetStatus } from '@ui/components/DrawerProvider';
import { OptionsSwitcher } from '@ui/options/OptionsSwitcher';
import { useAppSelector } from '@ui/store';
import { FC } from 'react';

import { IPageProps } from './types';

const AttributeSearch: FC<IPageProps> = ({ path }) => {
  const open = useDrawerOpen(path);
  const { toggle } = useDrawerSetStatus(path);

  const { auctions } = useAuctionsAttributes();

  const loading = useAppSelector((state) => state.worker.loading);

  return (
    <>
      <Box component="aside">
        <OptionsSwitcher open={open} toggle={toggle} />
      </Box>
      <Box component="main" sx={{ width: '100%' }}>
        <Box sx={{ height: 8 }}>{loading && <LinearProgress />}</Box>
        <AuctionsAttributesContainer auctions={auctions} />
      </Box>
    </>
  );
};

/**
 * Needed for React.lazy
 */
export default AttributeSearch;
