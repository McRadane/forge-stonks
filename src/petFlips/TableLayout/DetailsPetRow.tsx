import Chip from '@mui/material/Chip';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import type { FC } from 'react';

import { Coin } from '../../components/Coin';
import { Item } from '../../components/Item';
import { useLanguage } from '../../resources/lang/LanguageContext';
import { IPetCraftMaterial } from '../../worker/type';
import { usePetItemPrice } from '../hook';

interface IDDetailsPetRowProps {
  material: IPetCraftMaterial;
}

export const DetailsPetRow: FC<IDDetailsPetRowProps> = ({ material }) => {

  const cost = usePetItemPrice(material.itemId);

  const { ui } = useLanguage();

  return (
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
  );
};
