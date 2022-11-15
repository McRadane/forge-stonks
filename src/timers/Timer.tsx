import AlarmOffIcon from '@mui/icons-material/AlarmOff';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { Theme, useTheme } from '@mui/material/styles';
import { FC, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { useLanguage } from '../resources/lang/LanguageContext';
import { useWorker } from '../worker/WorkerContext';
import type { ITimer } from '../worker/type';

const getStyles = (theme: Theme) => ({
  container: {
    [theme.breakpoints.down('xl')]: {
      gridTemplateAreas: '"item" "timer" "progress"'
    },
    display: 'grid',
    flex: 1,
    gridTemplateAreas: '"item timer" "progress progress"'
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
    [theme.breakpoints.up('xl')]: {
      alignSelf: 'self-end',
      gridArea: 'timer',
      justifySelf: 'self-end'
    },
    padding: 1
  }
});

type ITimerProps = ITimer;

export const Timer: FC<ITimerProps> = ({ endTime, id, itemId, startTime }) => {
  const calculateTime = useCallback((now: number) => ((now - startTime) * 100) / (endTime - startTime), [endTime, startTime]);

  const [currentTime, setCurrentTime] = useState(Date.now);

  const progress = useMemo(() => calculateTime(currentTime), [calculateTime, currentTime]);
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const previousLabel = useRef<string>();
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

    const newLabel =
      hours !== undefined ? `${hours}h ${minutes}m ${seconds}s` : minutes !== undefined ? `${minutes}m ${seconds}s` : `${seconds}s`;

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
