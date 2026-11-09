import { ILanguage } from '@shared/resources/lang/type';
import { useAppSelector } from '@ui/store';
import { useWorker } from '@ui/worker/WorkerContext';
import { useEffect } from 'react';

export const usePetPrice = () => {
  const { loadingTimestamp } = useAppSelector((state) => state.worker);
  const { petPrices: costs } = useAppSelector((state) => state.pets);
  const workerRunner = useWorker();

  useEffect(() => {
    workerRunner.getPetPrices();
  }, [workerRunner, loadingTimestamp]);

  return costs;
};

export const usePetItemPrice = (id: keyof ILanguage['items']) => {
  const costs = useAppSelector((state) => state.pets.materialPrices);

  if (costs[id] !== undefined) {
    return costs[id] ?? 0;
  }

  return 0;
};
