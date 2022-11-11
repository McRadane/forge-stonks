import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Avatar, Chip, Collapse, IconButton, TableCell, TableRow } from '@mui/material';
import { FC, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import { Coin } from '../components/Coin';
import { Item } from '../components/Item';
import { useLanguage } from '../resources/lang/LanguageContext';
import { RootState } from '../store';

import { Details } from './Details';
import { ICraftWithCosts } from './functions';

export const Craft: FC<{
  craft: ICraftWithCosts;
}> = ({ craft }) => {
  const [open, setOpen] = useState(false);

  const { ui } = useLanguage();

  const { bazaarItem, craft: cost, hotm, id, profit, profitHourly, sell, time } = craft;

  const playFrequency = useSelector((state: RootState) => state.options.playFrequency);

  const toggle = useCallback(() => setOpen((status) => !status), []);

  return (
    <>
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell>
          <IconButton aria-label="expand row" onClick={toggle} size="small">
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <Item>{id}</Item> <Chip label={bazaarItem ? ui.bazaar : ui.auction} size="small" />{' '}
          <Chip avatar={<Avatar>{hotm}</Avatar>} label={ui.hotm} size="small" />
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
        {playFrequency !== 'less' && (
          <TableCell align="right">
            <Coin amount={profitHourly} />
          </TableCell>
        )}
      </TableRow>
      <TableRow>
        <TableCell colSpan={7} style={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Details item={craft} />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};
