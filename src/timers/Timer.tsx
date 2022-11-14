import AlarmOffIcon from '@mui/icons-material/AlarmOff';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import { FC, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { useLanguage } from '../resources/lang/LanguageContext';
import { useWorker } from '../worker/runWorker';
import { ITimer } from '../worker/type';

const getStyles = () => ({
  container: { display: 'grid', flex: 1, gridTemplateAreas: '"item timer" "progress progress"' },
  item: {
    gridArea: 'item',
    paddingLeft: 1
  },
  progress: {
    gridArea: 'progress'
  },
  timer: {
    alignSelf: 'self-end',
    gridArea: 'timer',
    justifySelf: 'self-end',
    paddingRight: 1
  }
});

export const Timer: FC<ITimer> = ({ endTime, id, itemId, startTime }) => {
  const calculateTime = useCallback((now: number) => ((now - startTime) * 100) / (endTime - startTime), [endTime, startTime]);

  const [currentTime, setCurrentTime] = useState(Date.now);

  const progress = useMemo(() => calculateTime(currentTime), [calculateTime, currentTime]);
  const styles = useMemo(() => getStyles(), []);
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

    const newLabel =
      hours !== undefined ? `${hours}h ${minutes}m ${seconds}s` : minutes !== undefined ? `${minutes}m ${seconds}s` : `${seconds}s`;

    if (newLabel !== previousLabel.current) {
      previousLabel.current = newLabel;
    }
  }, [currentTime, endTime]);

  return (
    <Box sx={styles.container}>
      <Box sx={styles.item}>
        <IconButton color="secondary" onClick={handleStopTimer} size="small">
          <AlarmOffIcon />
        </IconButton>
        {items[itemId]}
      </Box>
      <Box sx={styles.timer}>{previousLabel.current}</Box>
      <Box sx={styles.progress}>
        <LinearProgress value={progress} variant="determinate" />
      </Box>
    </Box>
  );
};
