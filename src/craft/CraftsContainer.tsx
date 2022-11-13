import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useLiveQuery } from 'dexie-react-hooks';
import { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { crafts } from '../resources/crafts';
import { services } from '../services/hypixel';
import { RootState } from '../store';

import { CraftsList } from './ListLayout/CraftsList';
import { CraftsTable } from './TableLayout/CraftsTable';
import { useItemsWithCraftPrice } from './functions';

export const CraftsContainer: FC = () => {
  const { hotm, includeAuctionsFlip, maxCraftingCost } = useSelector((state: RootState) => state.options);

  const ready = useLiveQuery(() => services.bazaars.count());

  const preFiltered = useMemo(() => {
    if (!ready || ready === 0) {
      return [];
    }

    let filtersCraft = crafts;
    if (!includeAuctionsFlip) {
      filtersCraft = filtersCraft.filter((craft) => craft.bazaarItem);
    }

    filtersCraft = filtersCraft.filter((craft) => craft.hotm <= hotm);

    return filtersCraft;
  }, [ready, hotm, includeAuctionsFlip]);

  const allCrafts = useItemsWithCraftPrice(preFiltered);

  const postFiltered = useMemo(() => {
    //let filtered = allCrafts.filter((craft) => craft.profit >= 0 && craft.sell >= 0);
    let filtered = allCrafts.filter((craft) => craft.sell > 0);

    if (maxCraftingCost !== undefined && maxCraftingCost !== 0) {
      filtered = filtered.filter((craft) => craft.craft < maxCraftingCost);
    }

    return filtered;
  }, [allCrafts, maxCraftingCost]);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  if (matches) {
    return <CraftsList crafts={postFiltered ?? []} />;
  }

  return <CraftsTable crafts={postFiltered ?? []} />;
};
