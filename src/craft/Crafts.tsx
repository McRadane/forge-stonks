import { Paper, Table, TableBody, TableContainer } from '@mui/material';
import { FC, useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { EnhancedTableHead, Order, getComparator } from '../components/EnhancedTableHead';
import { crafts } from '../resources/crafts';
import { useLanguage } from '../resources/lang/LanguageContext';
import { RootState } from '../store';

import { Craft } from './Craft';
import { useItemsWithCraftPrice } from './functions';

export const Crafts: FC = () => {
  const { hotm, includeAuctionsFlip, playFrequency } = useSelector((state: RootState) => state.options);

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

  const { ui } = useLanguage();

  const allCrafts = useItemsWithCraftPrice(craftsFiltered);

  const handleRequestSort = useCallback(
    (_event: React.MouseEvent<unknown>, property: string) => {
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
    },
    [order, orderBy]
  );

  const headCells = useMemo(() => {
    const heads = [
      { disablePadding: true, id: 'id', label: ui.item, numeric: false },
      { disablePadding: false, id: 'sell', label: ui.sellPrice, numeric: true },
      { disablePadding: false, id: 'time', label: ui.time, numeric: true },
      { disablePadding: false, id: 'craft', label: ui.craftCost, numeric: true },
      { disablePadding: false, id: 'profit', label: ui.profit, numeric: true }
    ];

    switch (playFrequency) {
      case 'everyday':
        heads.push({ disablePadding: false, id: 'profitHourly', label: ui.profitByTimeEveryday, numeric: true });
        break;
      case 'less':
        // Hide the column
        break;

      case 'nonstop':
        heads.push({ disablePadding: false, id: 'profitHourly', label: ui.profitByTimeNonStop, numeric: true });
        break;
      case 'three-time':
        heads.push({ disablePadding: false, id: 'profitHourly', label: ui.profitByTimeThreeTime, numeric: true });
        break;
      case 'twice':
        heads.push({ disablePadding: false, id: 'profitHourly', label: ui.profitByTimeTwice, numeric: true });
        break;
    }

    return heads;
  }, [
    playFrequency,
    ui.craftCost,
    ui.item,
    ui.profit,
    ui.profitByTimeEveryday,
    ui.profitByTimeNonStop,
    ui.profitByTimeThreeTime,
    ui.profitByTimeTwice,
    ui.sellPrice,
    ui.time
  ]);

  return (
    <TableContainer component={Paper}>
      <Table aria-label={ui.title} sx={{ minWidth: 650 }}>
        <EnhancedTableHead headCells={headCells} onRequestSort={handleRequestSort} order={order} orderBy={orderBy} />
        <TableBody>
          {allCrafts.sort(getComparator(order, orderBy)).map((craft) => (
            <Craft craft={craft} key={craft.id} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
