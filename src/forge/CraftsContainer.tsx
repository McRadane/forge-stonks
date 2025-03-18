import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { type FC, useMemo } from 'react';
import { useSelector } from 'react-redux';

import type { RootState } from '../store';

import { useItemsWithCraftPrice } from './functions';
import { CraftsList } from './ListLayout/CraftsList';
import { CraftsTable } from './TableLayout/CraftsTable';

export const CraftsContainer: FC = () => {
  const { includePerfectGems, maxCraftingCost } = useSelector((state: RootState) => state.options);

  const allCrafts = useItemsWithCraftPrice();

  const postFiltered = useMemo(() => {
    let filtered = allCrafts.filter((craft) => craft.sell > 0);

    if ((maxCraftingCost as number | undefined) !== undefined && maxCraftingCost !== 0) {
      filtered = filtered.filter((craft) => craft.craft < maxCraftingCost);
    }

    if (!includePerfectGems) {
      filtered = filtered.filter((craft) => craft.category !== 'gemstone');
    }

    return filtered;
  }, [allCrafts, includePerfectGems, maxCraftingCost]);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  if (matches) {
    return <CraftsList crafts={postFiltered ?? []} />;
  }

  return <CraftsTable crafts={postFiltered ?? []} />;
};
