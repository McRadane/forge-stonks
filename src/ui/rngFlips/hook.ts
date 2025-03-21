import { useAppSelector } from '@ui/store';
import { useWorker } from '@ui/worker/WorkerContext';
import { useEffect } from 'react';

export const useRNGPrices = () => {
  const { flips } = useAppSelector((state) => state.rng);
  const workerRunner = useWorker();

  useEffect(() => {
    workerRunner.getRNGPrices();
  }, [workerRunner]);

  return { flips };
};
