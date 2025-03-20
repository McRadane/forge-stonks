import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { ILanguage } from '../resources/lang/type';
import { RootState } from '../store';
import { useWorker } from '../worker/WorkerContext';

export const usePetPrice = () => {
  const { loadingTimestamp } = useSelector((state: RootState) => state.worker);
  const { petPrices: costs } = useSelector((state: RootState) => state.pets);
  const workerRunner = useWorker();

  useEffect(() => {
    workerRunner.getPetPrices();
  }, [workerRunner, loadingTimestamp]);

  return costs;
};

export const usePetItemPrice = (id: keyof ILanguage['items']) => {
  const costs = useSelector((state: RootState) => state.pets.materialPrices);



  if (costs[id] !== undefined) {
    return costs[id] ?? 0;
  }

  return 0;
};
