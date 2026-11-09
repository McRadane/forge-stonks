import Grid from '@mui/material/Grid2';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { useLanguage } from '@shared/resources/lang/LanguageContext';
import type { IForgeCraftMaterial } from '@shared/resources/types';
import { Coin } from '@ui/components/Coin';
import { Item } from '@ui/components/Item';
import { useItemCraftPrice } from '@ui/forge/functions';
import type { FC } from 'react';

import { GridRow } from './GridRow';

interface IDetailsRowProps {
  material: IForgeCraftMaterial;
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
