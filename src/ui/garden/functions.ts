import { useAppSelector } from '@ui/store';
import { useWorker } from '@ui/worker/WorkerContext';
import { useEffect } from 'react';

export const useGardenPrice = () => {
  const organicMatters = useAppSelector((state) => state.garden.organicMatters);
  const fuels = useAppSelector((state) => state.garden.fuels);
  const workerRunner = useWorker();

  useEffect(() => {
    workerRunner.getGardenPrices();
  }, [workerRunner]);

  return { fuels, organicMatters };
};
