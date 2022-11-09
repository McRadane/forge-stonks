import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useMemo } from 'react';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { services } from '../services/hypixel';
import { RootState } from '../store';
import { Craft } from './Craft';
import { crafts } from './crafts';

export const Crafts: FC = () => {
  const includeAuctionsFlip = useSelector((state: RootState) => state.options.includeAuctionsFlip);

  const craftsFiltered = useMemo(() => {
    if (includeAuctionsFlip) {
      return crafts;
    }

    return crafts.filter((craft) => craft.bazaarItem);
  }, [includeAuctionsFlip]);

  return (
    <>
      <h1>Crafts</h1>
      <button
        onClick={() => {
          services.refresh();
        }}
      >
        Refresh data
      </button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="Craft list">
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell align="right">Sell price</TableCell>
              <TableCell align="right">Time</TableCell>
              <TableCell align="right">Craft cost</TableCell>
              <TableCell align="right">Profit</TableCell>
              <TableCell align="right">Profit/H</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {craftsFiltered.map((craft) => (
              <Craft key={craft.id} id={craft.id} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
