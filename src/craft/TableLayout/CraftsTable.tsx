import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import { type FC, type MouseEvent, useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { EnhancedTableHead, getComparator, type Order } from '../../components/EnhancedTableHead';
import { useLanguage } from '../../resources/lang/LanguageContext';
import type { ICraftWithCosts } from '../../resources/types';
import type { RootState } from '../../store';

import { CraftRow } from './CraftRow';

interface ICraftsTableProps {
  crafts: ICraftWithCosts[];
}

export const CraftsTable: FC<ICraftsTableProps> = ({ crafts }) => {
  const { playFrequency } = useSelector((state: RootState) => state.options);

  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<string>('id');

  const { ui } = useLanguage();

  const handleRequestSort = useCallback(
    (_event: MouseEvent<unknown>, property: string) => {
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
      { disablePadding: false, id: 'timer', label: ui.timer, numeric: true },
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
    ui.time,
    ui.timer
  ]);

  return (
    <TableContainer component={Paper}>
      <Table aria-label={ui.title} size="small" sx={{ minWidth: 650 }}>
        <EnhancedTableHead headCells={headCells} onRequestSort={handleRequestSort} order={order} orderBy={orderBy} />
        <TableBody>
          {[...crafts].sort(getComparator(order, orderBy)).map((craft) => (
            <CraftRow craft={craft} key={craft.itemId} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
