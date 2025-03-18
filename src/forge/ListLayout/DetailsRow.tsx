import Grid from '@mui/material/Grid2';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';

import { Coin } from '../../components/Coin';
import { Item } from '../../components/Item';
import { useLanguage } from '../../resources/lang/LanguageContext';
import type { ICraftMaterial } from '../../resources/types';
import { useItemCraftPrice } from '../functions';

import { GridRow } from './GridRow';

interface IDetailsRowProps {
  material: ICraftMaterial;
}
export const DetailsRow: FC<IDetailsRowProps> = ({ material }) => {
  const cost = useItemCraftPrice(material.itemId);

  const { ui } = useLanguage();

  return (
    <ListItemText
      primary={
        <Grid container>
          <Grid size={{ xs: 12 }}>
            <Typography variant="h6">
              <Item>{material.itemId}</Item>
            </Typography>
          </Grid>

          <GridRow left={ui.sell} right={ui[material.source]} />
          <GridRow left={ui.itemPrice} right={<Coin amount={cost} />} />
          <GridRow left={ui.amount} right={material.quantity} />
          <GridRow left={ui.totalPrice} right={<Coin amount={material.quantity * cost} />} />
        </Grid>
      }
    ></ListItemText>
  );
};
