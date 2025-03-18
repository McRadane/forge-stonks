import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';

import { useLanguage } from '../../resources/lang/LanguageContext';
import type { ICraft } from '../../resources/types';

import { DetailsRow } from './DetailsRow';

interface IDetailsListProps {
  item: ICraft;
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
