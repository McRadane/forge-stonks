import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { FC, ReactNode, useCallback } from 'react';

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
      <Grid item sm={4} xs={12}>
        {children}
      </Grid>
      <Grid item sm={4} xs={6}>
        <Button onClick={handleAsc}>
          <KeyboardArrowUpIcon />
        </Button>
      </Grid>
      <Grid item sm={4} xs={6}>
        <Button onClick={handleDesc}>
          <KeyboardArrowDownIcon />
        </Button>
      </Grid>
    </>
  );
};
