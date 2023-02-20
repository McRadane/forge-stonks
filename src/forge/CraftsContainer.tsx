import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';

import type { RootState } from '../store';

import { CraftsList } from './ListLayout/CraftsList';
import { CraftsTable } from './TableLayout/CraftsTable';
import { useItemsWithCraftPrice } from './functions';

export const CraftsContainer: FC = () => {
  const { maxCraftingCost } = useSelector((state: RootState) => state.options);

  const allCrafts = useItemsWithCraftPrice();

  const postFiltered = useMemo(() => {
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
