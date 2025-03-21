import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Grid from '@mui/material/Grid2';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useLanguage } from '@shared/resources/lang/LanguageContext';
import type { IForgeCraftWithCosts } from '@shared/resources/types';
import { getComparator, type Order } from '@ui/components/EnhancedTableHead';
import { getProfitByTimeLabel } from '@ui/forge/functions';
import { useAppSelector } from '@ui/store';
import { type FC, useMemo, useState } from 'react';

import { CraftItem } from './CraftItem';
import { Filter } from './Filter';

interface ICraftsListProps {
  crafts: IForgeCraftWithCosts[];
}

export const CraftsList: FC<ICraftsListProps> = ({ crafts }) => {
  const { playFrequency } = useAppSelector((state) => state.options);

  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<string>('id');

  const { ui } = useLanguage();

  const profitByTime = useMemo(() => getProfitByTimeLabel(playFrequency, ui), [playFrequency, ui]);

  return (
    <>
      <Accordion>
        <AccordionSummary aria-controls="panel1a-content" id="panel1a-header" expandIcon={<ExpandMoreIcon />}>
          <Typography>{ui.filters}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText
                primary={
                  <Grid container>
                    <Filter property="id" setOrder={setOrder} setOrderBy={setOrderBy}>
                      {ui.item}
                    </Filter>
                    <Filter property="sell" setOrder={setOrder} setOrderBy={setOrderBy}>
                      {ui.sellPrice}
                    </Filter>
                    <Filter property="time" setOrder={setOrder} setOrderBy={setOrderBy}>
                      {ui.time}
                    </Filter>
                    <Filter property="craft" setOrder={setOrder} setOrderBy={setOrderBy}>
                      {ui.craftCost}
                    </Filter>
                    <Filter property="profit" setOrder={setOrder} setOrderBy={setOrderBy}>
                      {ui.profit}
                    </Filter>
                    {playFrequency !== 'less' && (
                      <Filter property="profitHourly" setOrder={setOrder} setOrderBy={setOrderBy}>
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
        {[...crafts].sort(getComparator(order, orderBy)).map((craft) => (
          <CraftItem craft={craft} key={craft.itemId} />
        ))}
      </List>
    </>
  );
};
