import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import { type FC, type MouseEvent, useCallback, useMemo, useState } from 'react';

import { EnhancedTableHead, getComparator, type Order } from '../../components/EnhancedTableHead';
import { useLanguage } from '../../resources/lang/LanguageContext';
import { IPetPrices } from '../../worker/type';

import { PetRow } from './PetRow';

interface IPetsTableProps {
  pets: IPetPrices[];
}

export const PetsTable: FC<IPetsTableProps> = ({ pets }) => {
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
    return [
      { disablePadding: true, id: 'petName', label: 'petName', numeric: false },
      { disablePadding: true, id: 'petBaseRarity', label: 'petBaseRarity', numeric: false },
      { disablePadding: true, id: 'petUpgradedRarity', label: 'petUpgradedRarity', numeric: false },

      { disablePadding: false, id: 'petBasePrice', label: 'petBasePrice', numeric: true },

      { disablePadding: false, id: 'petUpgradedCost', label: 'petUpgradedCost', numeric: true },
      { disablePadding: false, id: 'petUpgradedPrice', label: 'petUpgradedPrice', numeric: true },

    ];
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label={ui.title} size="small" sx={{ minWidth: 650 }}>
        <EnhancedTableHead headCells={headCells} onRequestSort={handleRequestSort} order={order} orderBy={orderBy} checkbox />
        <TableBody>
          {[...pets].sort(getComparator(order, orderBy)).map((pet) => (
            <PetRow key={`${pet.petName}-${pet.petBaseRarity}`} pet={pet} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
