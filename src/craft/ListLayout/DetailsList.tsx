import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { FC } from 'react';

import { ICraft } from '../../resources/crafts';
import { useLanguage } from '../../resources/lang/LanguageContext';

import { DetailsRow } from './DetailsRow';

export const DetailsList: FC<{
  item: ICraft;
}> = ({ item }) => {
  const { ui } = useLanguage();

  return (
    <Box sx={{ margin: 1 }}>
      <Typography component="div" gutterBottom variant="h5">
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
