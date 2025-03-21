import Chip from '@mui/material/Chip';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useLanguage } from '@shared/resources/lang/LanguageContext';
import type { IForgeCraftMaterial } from '@shared/resources/types';
import { Coin } from '@ui/components/Coin';
import { Item } from '@ui/components/Item';
import { useItemCraftPrice } from '@ui/forge/functions';
import type { FC } from 'react';

interface IDetailsRowProps {
  material: IForgeCraftMaterial;
  slots: number;
}

export const DetailsRow: FC<IDetailsRowProps> = ({ material, slots }) => {
  const cost = useItemCraftPrice(material.itemId);

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
      <TableCell align="right">{material.quantity * slots}</TableCell>
      <TableCell align="right">
        <Coin amount={material.quantity * cost} />
      </TableCell>
      <TableCell align="right">
        <Coin amount={material.quantity * cost * slots} />
      </TableCell>
    </TableRow>
  );
};
