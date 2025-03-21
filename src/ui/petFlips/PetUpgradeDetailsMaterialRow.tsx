import { Chip, TableCell, TableRow } from '@mui/material';
import { useLanguage } from '@shared/resources/lang/LanguageContext';
import { IPetCraftMaterial } from '@shared/types/worker';
import { Coin } from '@ui/components/Coin';
import { Item } from '@ui/components/Item';
import { FC } from 'react';

import { usePetItemPrice } from './hook';

export interface IPetUpgradeDetailsMaterialRowProps {
  material: IPetCraftMaterial;
}

export const PetUpgradeDetailsMaterialRow: FC<IPetUpgradeDetailsMaterialRowProps> = ({ material }) => {
  const cost = usePetItemPrice(material.itemId);

  const { ui } = useLanguage();

  return (
    <TableRow key={material.itemId}>
      <TableCell component="th" scope="row">
        <Item>{material.itemId}</Item> <Chip label={ui[material.source]} size="small" />
      </TableCell>
      <TableCell>{material.quantity}</TableCell>
      <TableCell align="right">
        <Coin amount={cost} />
      </TableCell>
      <TableCell align="right">
        <Coin amount={cost * material.quantity} />
      </TableCell>
    </TableRow>
  );
};
