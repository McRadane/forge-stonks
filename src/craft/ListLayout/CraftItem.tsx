import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid2';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { type FC, useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { Coin } from '../../components/Coin';
import { Item } from '../../components/Item';
import { useLanguage } from '../../resources/lang/LanguageContext';
import type { ICraftWithCosts } from '../../resources/types';
import type { RootState } from '../../store';
import { TimerButton } from '../../timers/TimerButton';
import { getCategoryLabel, getProfitByTimeLabel } from '../functions';

import { DetailsList } from './DetailsList';
import { GridRow } from './GridRow';

interface ICraftItemProps {
  craft: ICraftWithCosts;
}

export const CraftItem: FC<ICraftItemProps> = ({ craft }) => {
  const [open, setOpen] = useState(false);

  const { ui } = useLanguage();

  const { bazaarItem, craft: cost, hotm, itemId: id, profit, profitHourly, sell, time } = craft;

  const playFrequency = useSelector((state: RootState) => state.options.playFrequency);

  const toggle = useCallback(() => setOpen((status) => !status), []);

  const profitByTime = useMemo(() => getProfitByTimeLabel(playFrequency, ui), [playFrequency, ui]);

  return (
    <>
      <ListItemButton onClick={toggle}>
        <ListItemText
          primary={
            <Grid container>
              <Grid size={{ xs: 12 }}>
                <Typography variant="h4">
                  <Item>{id}</Item>
                </Typography>
              </Grid>

              <GridRow left={ui.timer} right={<TimerButton itemId={craft.itemId} />} />
              <GridRow left={ui.sell} right={bazaarItem ? ui.bazaar : ui.auction} />
              <GridRow left={ui.hotm} right={hotm} />
              <GridRow left={ui.type} right={getCategoryLabel(craft.category, ui)} />
              <GridRow left={ui.sellPrice} right={<Coin amount={sell} />} />
              <GridRow left={ui.time} right={time < 0.5 ? 0 : time} />
              <GridRow left={ui.craftCost} right={<Coin amount={cost} />} />
              <GridRow left={ui.profit} right={<Coin amount={profit} />} />

              {playFrequency !== 'less' && <GridRow left={profitByTime} right={<Coin amount={profitHourly} />} />}
            </Grid>
          }
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary={<DetailsList item={craft} />} />
          </ListItemButton>
        </List>
      </Collapse>
    </>
  );
};
