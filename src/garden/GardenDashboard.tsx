import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';

import { itemsFuels, itemsOrganicMatter } from '../resources/garden';
import { useLanguage } from '../resources/lang/LanguageContext';
import type { ILanguageItems } from '../resources/lang/type';

import { GardenChart } from './GardenChart';
import { GardenTable } from './GardenTable';
import type { IDataSourceItem } from './types';

export interface IGardenDashboardProps {
  fuels: Partial<Record<keyof ILanguageItems, IDataSourceItem>>;
  organicMatters: Partial<Record<keyof ILanguageItems, IDataSourceItem>>;
}

export const GardenDashboard: FC<IGardenDashboardProps> = ({ fuels, organicMatters }) => {
  const { ui } = useLanguage();
  return (
    <Box component="main" display="grid" gap={2} gridTemplateColumns="repeat(12, 1fr)" sx={{ width: '100%' }}>
      <Box gridColumn="span 12">
        <Typography variant="h3">{ui.organicMattersTitle}</Typography>
      </Box>

      <Box gridColumn="span 6">
        <GardenTable
          dataSource={organicMatters}
          highlightItem={'COMPOST'}
          labelRatio={ui.organicMattersColumn}
          sourceItems={itemsOrganicMatter}
        />
      </Box>

      <Box gridColumn="span 6">
        <GardenChart dataSource={organicMatters} highlightItem="COMPOST" text="name" />
      </Box>
      <Box gridColumn="span 12">
        <Typography variant="h3">{ui.fuelTitle}</Typography>
      </Box>

      <Box gridColumn="span 6">
        <GardenTable dataSource={fuels} highlightItem="BIOFUEL" labelRatio={ui.fuelColumn} sourceItems={itemsFuels} />
      </Box>
      <Box gridColumn="span 6">
        <GardenChart dataSource={fuels} highlightItem="BIOFUEL" showLabel text="ratio" />
      </Box>
    </Box>
  );
};
