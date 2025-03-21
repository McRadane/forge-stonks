import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { itemsFuels, itemsOrganicMatter } from '@shared/resources/garden';
import { useLanguage } from '@shared/resources/lang/LanguageContext';
import type { ILanguageItems } from '@shared/resources/lang/type';
import type { FC } from 'react';

import { GardenTable } from './GardenTable';
import type { IDataSourceItem } from './types';

export interface IGardenDashboardProps {
  fuels: Partial<Record<keyof ILanguageItems, IDataSourceItem>>;
  organicMatters: Partial<Record<keyof ILanguageItems, IDataSourceItem>>;
}

export const GardenDashboard: FC<IGardenDashboardProps> = ({ fuels, organicMatters }) => {
  const { ui } = useLanguage();
  return (
    <Box component="main" display="flex" flexDirection="column" gap={2} sx={{ width: '100%' }}>
      <Box>
        <Typography variant="h4">{ui.organicMattersTitle}</Typography>
      </Box>

      <Box>
        <GardenTable
          dataSource={organicMatters}
          highlightItem={'COMPOST'}
          labelRatio={ui.organicMattersColumn}
          sourceItems={itemsOrganicMatter}
        />
      </Box>
      <Box>
        <Typography variant="h4">{ui.fuelTitle}</Typography>
      </Box>

      <Box>
        <GardenTable dataSource={fuels} height={300} highlightItem="BIOFUEL" labelRatio={ui.fuelColumn} sourceItems={itemsFuels} />
      </Box>
    </Box>
  );
};
