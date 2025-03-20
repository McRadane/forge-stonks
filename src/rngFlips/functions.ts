import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import type { RootState } from '../store';
import { useWorker } from '../worker/WorkerContext';

export const useRNGPrices = () => {
  const { flips } = useSelector((state: RootState) => state.rng);
  const workerRunner = useWorker();

  useEffect(() => {
    workerRunner.getRNGPrices();
  }, [workerRunner]);

  return { flips };
};
