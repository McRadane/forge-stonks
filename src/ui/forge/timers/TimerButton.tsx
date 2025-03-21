import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import { useLanguage } from '@shared/resources/lang/LanguageContext';
import type { IForgeCraft } from '@shared/resources/types';
import { setTimerPressed } from '@shared/services/forge';
import { useNotifications } from '@ui/notification/NotificationContext';
import { useAppDispatch, useAppSelector } from '@ui/store';
import { useWorker } from '@ui/worker/WorkerContext';
import { type FC, useCallback } from 'react';

interface ITimerButtonProps {
  itemId: IForgeCraft['itemId'];
}

export const TimerButton: FC<ITimerButtonProps> = ({ itemId }) => {
  const timerActive = useAppSelector((state) => state.forge.timerLaunched.some((timer) => timer === itemId));
  const dispatch = useAppDispatch();
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
