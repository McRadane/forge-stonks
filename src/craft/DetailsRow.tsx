import { TableCell, TableRow } from '@mui/material';
import { FC } from 'react';

import { ICraftMaterial } from '../resources/crafts';
import { Coin } from '../components/Coin';
import { useItemCraftPrice } from './functions';
import { Item } from '../components/Item';

export const DetailsRow: FC<{
  material: ICraftMaterial;
}> = ({ material }) => {
  const cost = useItemCraftPrice(material.id);

  return (
    <>
      <TableRow key={material.id}>
        <TableCell component="th" scope="row">
          <Item>{material.id}</Item>
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
