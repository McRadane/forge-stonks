import Chip from '@mui/material/Chip';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { FC } from 'react';

import { Coin } from '../../components/Coin';
import { Item } from '../../components/Item';
import { ICraftMaterial } from '../../resources/crafts';
import { useLanguage } from '../../resources/lang/LanguageContext';
import { useItemCraftPrice } from '../functions';

export const DetailsRow: FC<{
  material: ICraftMaterial;
}> = ({ material }) => {
  const cost = useItemCraftPrice(material.itemId);

  const { ui } = useLanguage();

  return (
    <>
      <TableRow key={material.itemId}>
        <TableCell component="th" scope="row">
          <Item>{material.itemId}</Item> <Chip label={ui[material.source]} size="small" />
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
