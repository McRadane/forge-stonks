import { Paper, Table, TableBody, TableContainer } from '@mui/material';
import { useMemo, useState } from 'react';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { services } from '../services/hypixel';
import { RootState } from '../store';
import { Craft } from './Craft';
import { crafts } from '../resources/crafts';
import { useItemsWithCraftPrice } from './functions';
import { EnhancedTableHead, getComparator, Order } from '../components/Table/EnhancedTableHead';

export const Crafts: FC = () => {
  const includeAuctionsFlip = useSelector((state: RootState) => state.options.includeAuctionsFlip);
  const hotm = useSelector((state: RootState) => state.options.hotm);

  const craftsFiltered = useMemo(() => {
    let filtersCraft = crafts;
    if (!includeAuctionsFlip) {
      filtersCraft = filtersCraft.filter((craft) => craft.bazaarItem);
    }

    filtersCraft = filtersCraft.filter((craft) => craft.hotm <= hotm);

    return filtersCraft;
  }, [hotm, includeAuctionsFlip]);

  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<string>('id');

  const allCrafts = useItemsWithCraftPrice(craftsFiltered);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: string) => {
    if (orderBy === property) {
      setOrder(order === 'asc' ? 'desc' : 'asc');
    } else {
      if (property === 'id') {
        setOrder('asc');
      } else {
        setOrder('desc');
      }
      setOrderBy(property);
    }
  };

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
          <EnhancedTableHead
            headCells={[
              { id: 'id', label: 'Item', numeric: false, disablePadding: true },
              { id: 'sell', label: 'Sell price', numeric: true, disablePadding: false },
              { id: 'time', label: 'Time', numeric: true, disablePadding: false },
              { id: 'craft', label: 'Craft cost', numeric: true, disablePadding: false },
              { id: 'profit', label: 'Profit', numeric: true, disablePadding: false },
              { id: 'profitHourly', label: 'Profit/H', numeric: true, disablePadding: false }
            ]}
            onRequestSort={handleRequestSort}
            order={order}
            orderBy={orderBy}
          />
          <TableBody>
            {allCrafts.sort(getComparator(order, orderBy)).map((craft) => (
              <Craft key={craft.id} craft={craft} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
