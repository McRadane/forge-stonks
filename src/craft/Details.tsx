import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { FC } from 'react';

import { ICraft } from '../resources/crafts';
import { useLanguage } from '../resources/lang/LanguageContext';

import { DetailsRow } from './DetailsRow';

export const Details: FC<{
  item: ICraft;
}> = ({ item }) => {
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
            <TableCell align="right">{ui.totalPrice}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {item.craftMaterial.map((material) => (
            <DetailsRow key={material.id} material={material} />
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};
