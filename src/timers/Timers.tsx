import Stack from '@mui/material/Stack';
import { useSelector } from 'react-redux';

import { RootState } from '../store';

import { Timer } from './Timer';

export const Timers = () => {
  const timers = useSelector((state: RootState) => state.worker.timers);

  return (
    <Stack direction="row" spacing={1}>
      {timers.map((timer) => (
        <Timer key={timer.id} {...timer} />
      ))}
    </Stack>
  );
};
