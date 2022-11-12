import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import { FC, useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { Order, getComparator } from '../../components/EnhancedTableHead';
import { useLanguage } from '../../resources/lang/LanguageContext';
import { RootState } from '../../store';
import { getProfitByTimeLabel, ICraftWithCosts } from '../functions';

import { CraftItem } from './CraftItem';
import { Filter } from './Filter';

export const CraftsList: FC<{ crafts: ICraftWithCosts[] }> = ({ crafts }) => {
  const { playFrequency } = useSelector((state: RootState) => state.options);

  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<string>('id');

  const { ui } = useLanguage();

  const [open, setOpen] = useState(false);

  const profitByTime = useMemo(() => getProfitByTimeLabel(playFrequency, ui), [playFrequency, ui]);

  const handleClick = useCallback(() => {
    setOpen(!open);
  }, [open]);

  return (
    <List component={Paper}>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary="Filters" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText
              primary={
                <Grid container>
                  <Filter setOrder={setOrder} setOrderBy={setOrderBy} property="id">
                    {ui.item}
                  </Filter>
                  <Filter setOrder={setOrder} setOrderBy={setOrderBy} property="sell">
                    {ui.sellPrice}
                  </Filter>
                  <Filter setOrder={setOrder} setOrderBy={setOrderBy} property="time">
                    {ui.time}
                  </Filter>
                  <Filter setOrder={setOrder} setOrderBy={setOrderBy} property="craft">
                    {ui.craftCost}
                  </Filter>
                  <Filter setOrder={setOrder} setOrderBy={setOrderBy} property="profit">
                    {ui.profit}
                  </Filter>
                  {playFrequency !== 'less' && (
                    <Filter setOrder={setOrder} setOrderBy={setOrderBy} property="profitHourly">
                      {profitByTime}
                    </Filter>
                  )}
                </Grid>
              }
            />
          </ListItemButton>
        </List>
      </Collapse>

      {crafts.sort(getComparator(order, orderBy)).map((craft) => (
        <CraftItem craft={craft} key={craft.id} />
      ))}
    </List>
  );
};
