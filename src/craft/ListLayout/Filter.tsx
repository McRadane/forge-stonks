import Grid from '@mui/material/Grid';
import { FC, ReactNode, useCallback } from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Button from '@mui/material/Button';

import { Order } from '../../components/EnhancedTableHead';

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
      <Grid item xs={12} sm={4}>
        {children}
      </Grid>
      <Grid item xs={12} sm={4}>
        <Button onClick={handleAsc}>
          <KeyboardArrowUpIcon />
        </Button>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Button onClick={handleDesc}>
          <KeyboardArrowDownIcon />
        </Button>
      </Grid>
    </>
  );
};
