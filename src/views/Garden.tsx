import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { Chart } from '../garden/Chart';
import { useGardenPrice } from '../garden/functions';
import { useLanguage } from '../resources/lang/LanguageContext';
import type { ILanguageItems } from '../resources/lang/type';
import type { RootState } from '../store';

export const Garden = () => {
  const lang = useLanguage();

  const { fuels, organicMatters } = useGardenPrice();

  console.log({ fuels, organicMatters });

  return (
    <Box component="main" sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row' }}>
      <Box sx={{ flex: 1 }}>
        <Typography>Organic Matter costs</Typography>
        <Chart dataSource={organicMatters} />
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography>Fuels costs</Typography>
        <Chart dataSource={fuels} />
      </Box>
    </Box>
  );
};
