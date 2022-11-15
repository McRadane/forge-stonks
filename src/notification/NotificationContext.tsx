import Alert, { AlertColor } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { FC, ReactNode, createContext, useCallback, useContext, useState } from 'react';

export interface INotificationContextDefinition {
  triggerError(message: string): void;
  triggerInfo(message: string): void;
  triggerSuccess(message: string): void;
}

export const NotificationContext = createContext<INotificationContextDefinition>({
  triggerError: () => {
    //
  },
  triggerInfo: () => {
    //
  },
  triggerSuccess: () => {
    //
  }
});

interface INotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: FC<INotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<{ id: number; message: string; type: AlertColor }[]>([]);

  const handleCloses = useCallback(
    (id: number) => () => {
      setNotifications((current) => current.filter((notification) => notification.id !== id));
    },
    []
  );

  const triggerError = useCallback((message: string) => {
    setNotifications((current) => {
      const id = Math.max(0, ...current.map((notification) => notification.id)) + 1;
      return [...current, { id, message, type: 'error' }];
    });
  }, []);

  const triggerInfo = useCallback((message: string) => {
    setNotifications((current) => {
      const id = Math.max(0, ...current.map((notification) => notification.id)) + 1;
      return [...current, { id, message, type: 'info' }];
    });
  }, []);

  const triggerSuccess = useCallback((message: string) => {
    setNotifications((current) => {
      const id = Math.max(0, ...current.map((notification) => notification.id)) + 1;
      return [...current, { id, message, type: 'success' }];
    });
  }, []);

  return (
    <NotificationContext.Provider value={{ triggerError, triggerInfo, triggerSuccess }}>
      {children}
      {notifications.map((notification) => (
        <Snackbar autoHideDuration={6000} key={notification.id} onClose={handleCloses(notification.id)} open>
          <Alert onClose={handleCloses(notification.id)} severity={notification.type} sx={{ width: '100%' }}>
            {notification.message}
          </Alert>
        </Snackbar>
      ))}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const { triggerError, triggerInfo, triggerSuccess } = useContext(NotificationContext);

  return { triggerError, triggerInfo, triggerSuccess };
};
