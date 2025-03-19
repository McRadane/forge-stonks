import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import type { RootState } from '../store';
import { useWorker } from '../worker/WorkerContext';

export const useGardenPrice = () => {
  const organicMatters = useSelector((state: RootState) => state.garden.organicMatters);
  const fuels = useSelector((state: RootState) => state.garden.fuels);
  const workerRunner = useWorker();

  useEffect(() => {
    workerRunner.getGardenPrices();
  }, [workerRunner]);

  return { fuels, organicMatters };
};
