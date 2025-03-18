import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import { type FC, type ReactNode, useCallback } from 'react';

import type { Order } from '../../components/EnhancedTableHead';

interface IFilterProps {
  children: ReactNode;
  property: string;
  setOrder: (order: Order) => void;
  setOrderBy: (property: string) => void;
}

export const Filter: FC<IFilterProps> = ({ children, property, setOrder, setOrderBy }) => {
  const handleAsc = useCallback(() => {
    setOrder('asc');
    setOrderBy(property);
  }, [property, setOrder, setOrderBy]);

  const handleDesc = useCallback(() => {
    setOrder('desc');
    setOrderBy(property);
  }, [property, setOrder, setOrderBy]);

  return (
    <>
      <Grid size={{ sm: 4, xs: 12 }}>{children}</Grid>
      <Grid size={{ sm: 4, xs: 12 }}>
        <Button onClick={handleAsc}>
          <KeyboardArrowUpIcon />
        </Button>
      </Grid>
      <Grid size={{ sm: 4, xs: 12 }}>
        <Button onClick={handleDesc}>
          <KeyboardArrowDownIcon />
        </Button>
      </Grid>
    </>
  );
};
