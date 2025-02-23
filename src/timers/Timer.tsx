import AlarmOffIcon from '@mui/icons-material/AlarmOff';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import { type Theme, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { type FC, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { useLanguage } from '../resources/lang/LanguageContext';
import type { ITimer } from '../worker/type';
import { useWorker } from '../worker/WorkerContext';

const getStyles = (theme: Theme) => ({
  container: {
    display: 'grid',
    flex: 1,
    gridTemplateAreas: '"item timer" "progress progress"',
    [theme.breakpoints.down('xl')]: {
      gridTemplateAreas: '"item" "timer" "progress"'
    }
  },
  item: {
    alignItems: 'center',
    display: 'flex',
    gridArea: 'item',
    paddingLeft: 1
  },
  progress: {
    gridArea: 'progress'
  },
  timer: {
    padding: 1,
    [theme.breakpoints.up('xl')]: {
      alignSelf: 'self-end',
      gridArea: 'timer',
      justifySelf: 'self-end'
    }
  }
});

type TimerPropsType = ITimer;

const getLabel = (hours: number | undefined, minutes: number | undefined, seconds: number) => {
  if (hours !== undefined) {
    return `${hours}h ${minutes}m ${seconds}s`;
  }

  if (minutes !== undefined) {
    return `${minutes}m ${seconds}s`;
  }

  return `${seconds}s`;
};

export const Timer: FC<TimerPropsType> = ({ endTime, id, itemId, startTime }) => {
  const calculateTime = useCallback((now: number) => ((now - startTime) * 100) / (endTime - startTime), [endTime, startTime]);

  const [currentTime, setCurrentTime] = useState(Date.now);

  const progress = useMemo(() => calculateTime(currentTime), [calculateTime, currentTime]);
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const previousLabel = useRef<string | undefined>(undefined);
  const worker = useWorker();

  const { items } = useLanguage();

  const handleStopTimer = useCallback(() => {
    worker.stopTimer(id);
  }, [id, worker]);

  useLayoutEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime((current) => current + 10);
    }, 10);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    let seconds = Math.floor((endTime - currentTime) / 1000);
    let minutes;
    let hours;

    if (seconds > 60) {
      minutes = Math.floor(seconds / 60);
      seconds = seconds % 60;

      if (minutes > 60) {
        hours = Math.floor(minutes / 60);
        minutes = minutes % 60;
      }
    }

    if (seconds < 0) {
      seconds = 0;
    }

    const newLabel = getLabel(hours, minutes, seconds);

    if (newLabel !== previousLabel.current) {
      previousLabel.current = newLabel;
    }
  }, [currentTime, endTime]);

  return (
    <Box sx={styles.container}>
      <Box sx={styles.item}>
        <IconButton color="secondary" onClick={handleStopTimer} size="small" sx={{ height: theme.typography.fontSize }}>
          <AlarmOffIcon />
        </IconButton>
        <Typography>{items[itemId]}</Typography>
      </Box>
      <Box sx={styles.timer}>{previousLabel.current}</Box>
      <Box sx={styles.progress}>
        <LinearProgress value={progress} variant="determinate" />
      </Box>
    </Box>
  );
};
