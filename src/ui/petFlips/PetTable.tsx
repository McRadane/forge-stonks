import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { rarityOrder, rarityOrderReverse } from '@shared/resources/items';
import { IPet } from '@shared/resources/pets';
import { IPetPrices } from '@shared/types/worker';
import { Rarity } from '@ui/components/Rarity';
import { FC } from 'react';

import { PetRow } from './PetRow';

interface IPetTableProps {
  petDefinition: IPet;
  petsPrices: IPetPrices[];
}

export const PetTable: FC<IPetTableProps> = ({ petDefinition, petsPrices }) => {
  const startingRarity = rarityOrder[petDefinition.minTier];
  const endingRarity = rarityOrder[petDefinition.tier.MYTHIC ? 'MYTHIC' : 'LEGENDARY'];

  const rarityRangeIndex = Array.from({ length: endingRarity - startingRarity + 1 }, (_, i) => startingRarity + i);

  const rarityRange = rarityRangeIndex.map((rarity) => rarityOrderReverse[rarity]);

  const rarityRangeIndexMinusLast = rarityRangeIndex.slice(0, -1);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            {rarityRange.map((rarity) => (
              <TableCell align="center" key={rarity}>
                <Rarity rarity={rarity} />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rarityRangeIndexMinusLast.map((rarity) => (
            <PetRow
              endingRarity={endingRarity}
              key={rarity}
              offset={rarity - startingRarity}
              petsPrices={petsPrices}
              startingRarity={rarity}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
