import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { type FC, useMemo } from 'react';

import { usePetPrice } from './hook';
// import { CraftsList } from './ListLayout/CraftsList';
import { PetsTable } from './TableLayout/PetsTable';

export const PetsFlipContainer: FC = () => {
  const allPets = usePetPrice();

  const filteredPets = useMemo(
    () => allPets.filter((pet) => pet.petBasePrice !== 0 && pet.petUpgradedPrice !== 0 && pet.petUpgradedCost !== 0),
    [allPets]
  );

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  if (matches) {
    // return <CraftsList pets={allPets} />;
  }

  return <PetsTable pets={filteredPets} />;
};
