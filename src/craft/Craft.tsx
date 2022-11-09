import { TableCell, TableRow } from '@mui/material';
import { useLiveQuery } from 'dexie-react-hooks';
import { useEffect, useMemo, useState } from 'react';
import { FC } from 'react';
import { services } from '../services/hypixel';

import { crafts, ICraft } from './crafts';
import { Coin } from './Coin';
import { resolveItemCraftPrice, useItemCraftPrice } from './functions';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

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

    return services.getItemPrice(id, 'auctions+bins');

    //return services.getItemPrice(id, item?.bazaarItem ? "bazaar" : "auctions+bins")
  });

  const profit = useMemo(() => {
    console.log({ itemDb, cost });
    if(itemDb) {
      return itemDb?.sellPrice - cost;
    }
    return cost;
  }, [cost, itemDb]);

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component="th" scope="row">
        {item?.name}
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
  );
};
