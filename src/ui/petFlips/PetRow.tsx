import { Link, TableCell, TableRow } from '@mui/material';
import { Rarities, rarityOrderReverse } from '@shared/resources/items';
import { useLanguage } from '@shared/resources/lang/LanguageContext';
import { IPetPrices } from '@shared/types/worker';
import { Coin } from '@ui/components/Coin';
import { FC, useCallback, useMemo, useState } from 'react';

import { PetUpgradeDetails } from './PetUpgradeDetails';

export interface IPetRowProps {
  endingRarity: number;
  offset: number;
  petsPrices: IPetPrices[];
  startingRarity: number;
}

const style = {
  borderLeft: '1px solid rgba(127, 127, 127, 0.5)',
  borderRight: '1px solid rgba(127, 127, 127, 0.5)'
};

export const PetRow: FC<IPetRowProps> = ({ endingRarity, offset, petsPrices, startingRarity }) => {
  const [open, setOpen] = useState<'' | Rarities>('');

  const { ui } = useLanguage();

  const onClose = useCallback(() => {
    setOpen('');
  }, []);

  const onOpen = useCallback(
    (rarity: Rarities) => () => {
      setOpen(rarity);
    },
    []
  );

  const { petsPricesList, petsStartingPrice, rarityRange } = useMemo(() => {
    const rarityRangeMemo = Array.from({ length: endingRarity - startingRarity + 1 }, (_, i) => startingRarity + i).map(
      (rarity) => rarityOrderReverse[rarity]
    );

    const petsStartingPriceMemo = petsPrices.find((pet) => pet.petBaseRarity === rarityOrderReverse[startingRarity]);

    const petsPricesListMemo: Array<IPetPrices | undefined> = rarityRangeMemo.map((rarity) =>
      petsPrices.find((pet) => pet.petUpgradedRarity === rarity)
    );

    return { petsPricesList: petsPricesListMemo, petsStartingPrice: petsStartingPriceMemo, rarityRange: rarityRangeMemo };
  }, [endingRarity, petsPrices, startingRarity]);

  const offsetRange = Array.from({ length: offset }, (_, i) => i);

  if (petsStartingPrice === undefined) {
    return null;
  }

  if (petsPricesList.length === 0 || petsPricesList.some((pet) => pet === undefined)) {
    return (
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        {offsetRange.map((key) => (
          <TableCell align="center" key={key} style={style}>
            -
          </TableCell>
        ))}
        <TableCell align="center" component="th" scope="row" style={style}>
          {ui.buy} : <Coin amount={petsStartingPrice?.petBasePrice ?? NaN} noNumberText="?" />
        </TableCell>
        <TableCell align="center" colSpan={rarityRange.length + offset} style={style}>
          {ui.noCraftingCost}
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      {offsetRange.map((key) => (
        <TableCell align="center" key={key} style={style}>
          -
        </TableCell>
      ))}
      {rarityRange.map((rarity, index) => {
        if (index === 0) {
          return (
            <TableCell align="center" component="th" key={rarity} scope="row" style={style}>
              {ui.buy} : <Coin amount={petsStartingPrice?.petBasePrice ?? NaN} noNumberText="?" />
            </TableCell>
          );
        }

        const petPricesListForThisRarity = petsPricesList.slice(1, index + 1) as IPetPrices[];

        const craftingCost = petPricesListForThisRarity.map((price) => price?.petUpgradedCost ?? 0);

        const lastPrice = petPricesListForThisRarity[petPricesListForThisRarity.length - 1];
        const sellPrice = lastPrice?.petUpgradedPrice ?? 0;

        const upgradeCost = craftingCost.reduce((acc, cost) => acc + cost, 0);

        const profit = sellPrice - upgradeCost - petsStartingPrice.petBasePrice;

        return (
          <TableCell align="center" key={rarity} style={style}>
            <Link onClick={onOpen(rarity)}>
              <Coin amount={profit} />
            </Link>
            <PetUpgradeDetails
              basePrice={petsStartingPrice}
              lastPrice={lastPrice}
              onClose={onClose}
              open={open === rarity}
              petPricesListForThisRarity={petPricesListForThisRarity}
              upgradeCost={upgradeCost}
            />
          </TableCell>
        );
      })}
    </TableRow>
  );
};
