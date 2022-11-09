import { Collapse, IconButton, TableCell, TableRow } from '@mui/material';
import { useState } from 'react';
import { FC } from 'react';

import { Coin } from '../components/Coin';
import { ICraftWithCosts } from './functions';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Item } from '../components/Item';
import { Details } from './Details';

export const Craft: FC<{
  craft: ICraftWithCosts;
}> = ({ craft }) => {
  const [open, setOpen] = useState(false);

  const { sell, time, profit, profitHourly, id, craft: cost } = craft;

  return (
    <>
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <Item>{id}</Item>
        </TableCell>
        <TableCell align="right">
          <Coin amount={sell} />
        </TableCell>
        <TableCell align="right">{time}</TableCell>
        <TableCell align="right">
          <Coin amount={cost} />
        </TableCell>
        <TableCell align="right">
          <Coin amount={profit} />
        </TableCell>
        <TableCell align="right">
          <Coin amount={profitHourly} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Details item={craft} />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};
