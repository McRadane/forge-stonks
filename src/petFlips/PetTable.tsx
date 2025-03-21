import { FC } from 'react';
import { IPetPrices } from '../worker/type';
import { IPet } from '../resources/pets';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { rarityOrder } from '../resources/items';

interface IPetTableProps {
  // petsPrices: IPetPrices[];
  petDefinition: IPet;
}

export const PetTable: FC<IPetTableProps> = ({ petDefinition }) => {
  const startingRarity = rarityOrder[petDefinition.minTier];
  const endingRarity = rarityOrder[petDefinition.tier.MYTHIC ? 'MYTHIC' : 'LEGENDARY'];

  const rarityRange = Array.from({ length: endingRarity - startingRarity }, (_, i) => startingRarity + i);

  console.log(petDefinition.name, { startingRarity, endingRarity, rarityRange });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row">
              cell1
            </TableCell>
            <TableCell align="right">cell2</TableCell>
            <TableCell align="right">cell3</TableCell>
            <TableCell align="right">cell4</TableCell>
            <TableCell align="right">cell5</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
