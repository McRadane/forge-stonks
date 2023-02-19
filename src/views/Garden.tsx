import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

import { Chart } from '../garden/Chart';
import { useGardenPrice } from '../garden/functions';

export const Garden = () => {
  const { fuels, organicMatters } = useGardenPrice();

  return (
    <Box component="main" sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row' }}>
      <Box sx={{ flex: 1 }}>
        <Typography>Organic Matter costs</Typography>
        <Chart dataSource={organicMatters} labelRatio="Price for one compost (4k matters)" />
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography>Fuels costs</Typography>
        <Chart dataSource={fuels} labelRatio="Price for one compost (2k fuel)" />
      </Box>
    </Box>
  );
};
