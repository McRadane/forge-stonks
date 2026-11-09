import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useLanguage } from '@shared/resources/lang/LanguageContext';
import type { IForgeCraft } from '@shared/resources/types';
import type { FC } from 'react';

import { DetailsRow } from './DetailsRow';

interface IDetailsListProps {
  item: IForgeCraft;
}

export const DetailsList: FC<IDetailsListProps> = ({ item }) => {
  const { ui } = useLanguage();

  return (
    <Box sx={{ margin: 1 }}>
      <Typography component="div" variant="h5" gutterBottom>
        {ui.shoppingList}
      </Typography>
      <List component={Paper}>
        {item.craftMaterial.map((material) => (
          <DetailsRow key={material.itemId} material={material} />
        ))}
      </List>
    </Box>
  );
};
