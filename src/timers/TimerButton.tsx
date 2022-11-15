import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import { FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useNotifications } from '../notification/NotificationContext';
import { ICraft } from '../resources/crafts';
import { useLanguage } from '../resources/lang/LanguageContext';
import { setTimerPressed } from '../services/worker';
import { RootState } from '../store';
import { useWorker } from '../worker/WorkerContext';

export const TimerButton: FC<{ itemId: ICraft['itemId'] }> = ({ itemId }) => {
  const timerActive = useSelector((state: RootState) => state.worker.timerLaunched.some((timer) => timer === itemId));
  const dispatch = useDispatch();
  const theme = useTheme();
  const worker = useWorker();
  const { items, notification, ui } = useLanguage();
  const { triggerInfo } = useNotifications();

  const handleTimer = useCallback(() => {
    if ('Notification' in window && Notification.permission !== 'denied') {
      // We need to ask the user for permission
      Notification.requestPermission();
    }

    triggerInfo(notification.timerStarted.replace('{0}', items[itemId]));
    dispatch(setTimerPressed(itemId));
    worker.startTimer(itemId);
  }, [dispatch, itemId, items, notification.timerStarted, triggerInfo, worker]);

  return (
    <IconButton
      aria-label={ui.timerButton}
      color="primary"
      disabled={timerActive}
      onClick={handleTimer}
      sx={{ height: theme.typography.fontSize }}
    >
      <AlarmOnIcon />
    </IconButton>
  );
};
