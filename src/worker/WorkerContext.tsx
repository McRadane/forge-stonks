import { FC, ReactNode, createContext, useContext, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { NotificationContext } from '../notification/NotificationContext';
import { LanguageContext } from '../resources/lang/LanguageContext';

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
  const dispatch = useDispatch();
  const language = useContext(LanguageContext);
  const notification = useContext(NotificationContext);

  const instance = useMemo(() => {
    return new WorkerRunner({ dispatch, language, notification });
  }, [dispatch, language, notification]);

  return <WorkerRunnerContext.Provider value={{ instance }}>{children}</WorkerRunnerContext.Provider>;
};
