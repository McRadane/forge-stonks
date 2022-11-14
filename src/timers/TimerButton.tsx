import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import IconButton from '@mui/material/IconButton';
import { FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ICraft } from '../resources/crafts';
import { useLanguage } from '../resources/lang/LanguageContext';
import { setTimerPressed } from '../services/worker';
import { RootState } from '../store';
import { useWorker } from '../worker/runWorker';

export const TimerButton: FC<{ itemId: ICraft['itemId'] }> = ({ itemId }) => {
  const timerActive = useSelector((state: RootState) => state.worker.timerLaunched.some((timer) => timer === itemId));
  const dispatch = useDispatch();
  const worker = useWorker();
  const { ui } = useLanguage();

  const handleTimer = useCallback(() => {
    if ('Notification' in window && Notification.permission !== 'denied') {
      // We need to ask the user for permission
      Notification.requestPermission();
    }

    dispatch(setTimerPressed(itemId));
    worker.startTimer(itemId);
  }, [dispatch, itemId, worker]);

  return (
    <IconButton aria-label={ui.timerButton} color="primary" disabled={timerActive} onClick={handleTimer}>
      <AlarmOnIcon />
    </IconButton>
  );
};
