import Box from '@mui/material/Box';
import { FC, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import AlarmOffIcon from '@mui/icons-material/AlarmOff';
import IconButton from '@mui/material/IconButton';

import { useLanguage } from '../resources/lang/LanguageContext';
import { ITimer } from '../worker/type';
import { useWorker } from '../worker/runWorker';

const getStyles = () => ({
  container: { flex: 1, display: 'grid', gridTemplateAreas: '"item timer" "progress progress"' },
  item: {
    gridArea: 'item',
    paddingLeft: 1
  },
  timer: {
    gridArea: 'timer',
    justifySelf: 'self-end',
    alignSelf: 'self-end',
    paddingRight: 1
  },
  progress: {
    gridArea: 'progress'
  }
});

export const Timer: FC<ITimer> = ({ itemId, startTime, endTime, id }) => {
  const calculateTime = useCallback((now: number) => ((now - startTime) * 100) / (endTime - startTime), [endTime, startTime]);

  const [currentTime, setCurrentTime] = useState(Date.now);
  // const [progress, setProgress] = useState(calculateTime(currentTime));
  // const [label, setLabel] = useState<string>();

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
    // const newLabel = prettyPrint(endTime - currentTime);
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
      //setLabel(newLabel);
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
        <LinearProgress variant="determinate" value={progress} />
      </Box>
    </Box>
  );
};
