import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { FC, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import { Coin } from '../../components/Coin';
import { Item } from '../../components/Item';
import { useLanguage } from '../../resources/lang/LanguageContext';
import { RootState } from '../../store';
import { TimerButton } from '../../timers/TimerButton';
import { ICraftWithCosts } from '../functions';

import { DetailsTable } from './DetailsTable';

export const CraftRow: FC<{
  craft: ICraftWithCosts;
}> = ({ craft }) => {
  const [open, setOpen] = useState(false);

  const { ui } = useLanguage();

  const { bazaarItem, craft: cost, hotm, itemId, profit, profitHourly, sell, time } = craft;

  const playFrequency = useSelector((state: RootState) => state.options.playFrequency);

  const toggle = useCallback(() => setOpen((status) => !status), []);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <>
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell>
          <IconButton aria-label="expand row" onClick={toggle} size="small" sx={{ height: theme.typography.fontSize }}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <Item>{itemId}</Item>{' '}
          {matches && (
            <>
              <Chip label={bazaarItem ? ui.bazaar : ui.auction} size="small" />{' '}
              <Chip avatar={<Avatar>{hotm}</Avatar>} label={ui.hotm} size="small" />{' '}
              <Chip label={craft.category === 'casting' ? ui.casting : ui.refine} size="small" />
            </>
          )}
        </TableCell>
        <TableCell align="right">
          <TimerButton itemId={craft.itemId} />
        </TableCell>
        <TableCell align="right">
          <Coin amount={sell} />
        </TableCell>
        <TableCell align="right">{time < 0.5 ? 0 : time}</TableCell>
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
        <TableCell colSpan={playFrequency !== 'less' ? 8 : 7} style={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <DetailsTable item={craft} />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};
