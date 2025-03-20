import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { type FC, useCallback, useState } from 'react';

import { Coin } from '../../components/Coin';
import { Item } from '../../components/Item';
import { useLanguage } from '../../resources/lang/LanguageContext';
import { IPetPrices } from '../../worker/type';

import { DetailsPetTable } from './DetailsPetTable';

interface IPetRowrops {
  pet: IPetPrices;
}

export const PetRow: FC<IPetRowrops> = ({ pet }) => {
  const [open, setOpen] = useState(false);

  const { ui } = useLanguage();

  const { petBasePrice, petBaseRarity, petName, petUpgradedCost, petUpgradedPrice, petUpgradedRarity } = pet;

  const toggle = useCallback(() => setOpen((status) => !status), []);

  const theme = useTheme();
  
  return (
    <>
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell>
          <IconButton aria-label="expand row" onClick={toggle} size="small" sx={{ height: theme.typography.fontSize }}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <Item>{petName}</Item>{' '}
        </TableCell>
        <TableCell align="right">
          {petBaseRarity}
        </TableCell>
        <TableCell align="right">
          {petUpgradedRarity}
        </TableCell>
        <TableCell align="right">
          <Coin amount={petBasePrice} />
        </TableCell>

        <TableCell align="right">
          <Coin amount={petUpgradedCost} />
        </TableCell>
        <TableCell align="right">
          <Coin amount={petUpgradedPrice} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={8} style={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <DetailsPetTable pet={pet} />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};
