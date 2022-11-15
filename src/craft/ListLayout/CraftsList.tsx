import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { FC, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { Order, getComparator } from '../../components/EnhancedTableHead';
import { useLanguage } from '../../resources/lang/LanguageContext';
import type { ICraftWithCosts } from '../../resources/types';
import type { RootState } from '../../store';
import { getProfitByTimeLabel } from '../functions';

import { CraftItem } from './CraftItem';
import { Filter } from './Filter';

export const CraftsList: FC<{ crafts: ICraftWithCosts[] }> = ({ crafts }) => {
  const { playFrequency } = useSelector((state: RootState) => state.options);

  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<string>('id');

  const { ui } = useLanguage();

  const profitByTime = useMemo(() => getProfitByTimeLabel(playFrequency, ui), [playFrequency, ui]);

  return (
    <>
      <Accordion>
        <AccordionSummary aria-controls="panel1a-content" expandIcon={<ExpandMoreIcon />} id="panel1a-header">
          <Typography>{ui.filters}</Typography>
        </AccordionSummary>
        <AccordionDetails>
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
        </AccordionDetails>
      </Accordion>
      <List component={Paper}>
        {crafts.sort(getComparator(order, orderBy)).map((craft) => (
          <CraftItem craft={craft} key={craft.itemId} />
        ))}
      </List>
    </>
  );
};
