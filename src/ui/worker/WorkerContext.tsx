import { LanguageContext } from '@shared/resources/lang/LanguageContext';
import { NotificationContext } from '@ui/notification/NotificationContext';
import { useAppDispatch } from '@ui/store';
import { createContext, type FC, type ReactNode, useContext, useMemo } from 'react';

import { WorkerRunner } from './runWorker';

interface IWorkerContextDefinition {
  instance: WorkerRunner;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const WorkerRunnerContext = createContext<IWorkerContextDefinition>({ instance: undefined as any });

export const useWorker = () => {
  const { instance } = useContext(WorkerRunnerContext);

  return instance;
};

interface IWorkerProviderProps {
  children: ReactNode;
}

export const WorkerProvider: FC<IWorkerProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const language = useContext(LanguageContext);
  const notification = useContext(NotificationContext);

  const value = useMemo(() => {
    return { instance: WorkerRunner.getInstance({ dispatch, language, notification }) };
  }, [dispatch, language, notification]);

  return <WorkerRunnerContext.Provider value={value}>{children}</WorkerRunnerContext.Provider>;
};
