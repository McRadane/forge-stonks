import { FC, useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';

import { Coin } from '../../components/Coin';
import { Item } from '../../components/Item';
import { useLanguage } from '../../resources/lang/LanguageContext';
import { RootState } from '../../store';
import { getProfitByTimeLabel, ICraftWithCosts } from '../functions';
import { Details } from '../Details';

import { GridRow } from './GridRow';

export const CraftItem: FC<{
  craft: ICraftWithCosts;
}> = ({ craft }) => {
  const [open, setOpen] = useState(false);

  const { ui } = useLanguage();

  const { bazaarItem, craft: cost, hotm, id, profit, profitHourly, sell, time } = craft;

  const playFrequency = useSelector((state: RootState) => state.options.playFrequency);

  const toggle = useCallback(() => setOpen((status) => !status), []);

  const profitByTime = useMemo(() => getProfitByTimeLabel(playFrequency, ui), [playFrequency, ui]);

  return (
    <>
      <ListItemButton onClick={toggle}>
        <ListItemText
          primary={
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="h6">
                  <Item>{id}</Item>
                </Typography>
              </Grid>

              <GridRow left={'Type'} right={bazaarItem ? ui.bazaar : ui.auction} />
              <GridRow left={ui.hotm} right={hotm} />
              <GridRow left={ui.sellPrice} right={<Coin amount={sell} />} />
              <GridRow left={ui.time} right={time} />
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
            <ListItemText primary={<Details item={craft} />} />
          </ListItemButton>
        </List>
      </Collapse>
    </>
  );
};
