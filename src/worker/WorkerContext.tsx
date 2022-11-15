import { FC, ReactNode, createContext, useContext, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { LanguageContext } from '../resources/lang/LanguageContext';

import { WorkerRunner } from './runWorker';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const WorkerRunnerContext = createContext<{ instance: WorkerRunner }>({ instance: undefined as any });

export const useWorker = () => {
  const { instance } = useContext(WorkerRunnerContext);

  return instance;
};

export const WorkerProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const languageContext = useContext(LanguageContext);
  const instance = useMemo(() => {
    return new WorkerRunner(languageContext, dispatch);
  }, [dispatch, languageContext]);

  return <WorkerRunnerContext.Provider value={{ instance }}>{children}</WorkerRunnerContext.Provider>;
};
