import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';

import { useLanguage } from '../../resources/lang/LanguageContext';
import type { ICraft } from '../../resources/types';

import { DetailsRow } from './DetailsRow';

interface IDetailsTableProps {
  item: ICraft;
}

export const DetailsTable: FC<IDetailsTableProps> = ({ item }) => {
  const { ui } = useLanguage();

  return (
    <Box sx={{ margin: 1 }}>
      <Typography component="div" gutterBottom variant="h6">
        {ui.shoppingList}
      </Typography>
      <Table aria-label={ui.shoppingList} size="small">
        <TableHead>
          <TableRow>
            <TableCell>{ui.item}</TableCell>
            <TableCell align="right">{ui.itemPrice}</TableCell>
            <TableCell align="right">{ui.amount}</TableCell>
            <TableCell align="right">{ui.amount} x 5</TableCell>
            <TableCell align="right">{ui.totalPrice}</TableCell>
            <TableCell align="right">{ui.totalPrice} x 5</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {item.craftMaterial.map((material) => (
            <DetailsRow key={material.itemId} material={material} />
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};
