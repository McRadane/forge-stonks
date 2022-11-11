import { Chip, TableCell, TableRow } from '@mui/material';
import { FC } from 'react';

import { Coin } from '../components/Coin';
import { Item } from '../components/Item';
import { ICraftMaterial } from '../resources/crafts';
import { useLanguage } from '../resources/lang/LanguageContext';

import { useItemCraftPrice } from './functions';

export const DetailsRow: FC<{
  material: ICraftMaterial;
}> = ({ material }) => {
  const cost = useItemCraftPrice(material.id);

  const { ui } = useLanguage();

  return (
    <>
      <TableRow key={material.id}>
        <TableCell component="th" scope="row">
          <Item>{material.id}</Item> <Chip label={ui[material.source]} size="small" />
        </TableCell>
        <TableCell align="right">
          <Coin amount={cost} />
        </TableCell>
        <TableCell align="right">{material.quantity}</TableCell>
        <TableCell align="right">
          <Coin amount={material.quantity * cost} />
        </TableCell>
      </TableRow>
    </>
  );
};
