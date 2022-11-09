import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { FC } from 'react';

import { ICraft } from '../resources/crafts';
import { DetailsRow } from './DetailsRow';

export const Details: FC<{
  item: ICraft;
}> = ({ item }) => {
  return (
    <Box sx={{ margin: 1 }}>
      <Typography variant="h6" gutterBottom component="div">
        Material
      </Typography>
      <Table size="small" aria-label="purchases">
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell align="right">Item Price</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Total price</TableCell>
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
