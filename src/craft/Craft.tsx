import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useLiveQuery } from 'dexie-react-hooks';
import { useEffect, useMemo, useState } from 'react';
import { FC } from 'react';
import { services } from '../services/hypixel';

import { crafts, ICraft } from '../resources/crafts';
import { Coin } from '../components/Coin';
import { resolveItemCraftPrice, useItemCraftPrice } from './functions';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Item } from '../components/Item';
import { Details } from './Details';

export const Craft: FC<{
  id: string;
}> = ({ id }) => {
  const item = useMemo(() => crafts.find((craft) => craft.id === id), [id]) as ICraft;
  //const cost = useMemo(async () => await resolveItemCraftPrice(id), [id]);
  //const [cost, setCost] = useState(0);
  const cost = useItemCraftPrice(id);

  //const auctionsBINOnly = useSelector((state: RootState) => state.options.auctionsBINOnly);
  //const intermediateCraft = useSelector((state: RootState) => state.options.intermediateCraft);

  /*useEffect(() => {
    resolveItemCraftPrice(id, intermediateCraft, auctionsBINOnly).then((price) => setCost(price));
  }, [auctionsBINOnly, id, intermediateCraft]);*/

  const itemDb = useLiveQuery(() => {
    if (item.bazaarItem) {
      return services.getItemPrice(id, 'bazaar');
    }

    return services.getItemPrice(id, 'bins');

    //return services.getItemPrice(id, item?.bazaarItem ? "bazaar" : "auctions+bins")
  });

  const profit = useMemo(() => {
    console.log({ itemDb, cost });
    if (itemDb) {
      return itemDb?.sellPrice - cost;
    }
    return cost;
  }, [cost, itemDb]);

  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <Item>{item?.id}</Item>
        </TableCell>
        <TableCell align="right">
          <Coin amount={itemDb?.sellPrice ?? 0} />
        </TableCell>
        <TableCell align="right">{item.time}</TableCell>
        <TableCell align="right">
          <Coin amount={cost} />
        </TableCell>
        <TableCell align="right">
          <Coin amount={profit} />
        </TableCell>
        <TableCell align="right">
          <Coin amount={profit / item.time} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Details item={item} />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};
