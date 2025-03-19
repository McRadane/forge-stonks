import { Box, LinearProgress } from '@mui/material';
import { useSelector } from 'react-redux';

import { AuctionsAttributesContainer } from '../auctionsAttributes/AuctionsAttributesContainer';
import { useAuctionsAttributes } from '../auctionsAttributes/hook';
import { useDrawerOpen, useDrawerSetStatus } from '../components/DrawerProvider';
import { OptionsSwitcher } from '../options/OptionsSwitcher';
import { RootState } from '../store';

const AttributeSearch = () => {
  const open = useDrawerOpen('attribute');
  const { toggle } = useDrawerSetStatus('attribute');

  const { auctions } = useAuctionsAttributes();

  const loading = useSelector((state: RootState) => state.worker.loading);

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
