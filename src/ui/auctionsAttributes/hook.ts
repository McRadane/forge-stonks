import { useAppSelector } from '@ui/store';
import { useWorker } from '@ui/worker/WorkerContext';
import { useEffect } from 'react';

export const useAuctionsAttributes = () => {
  const { loadingTimestamp } = useAppSelector((state) => state.worker);
  const auctions = useAppSelector((state) => state.attributes.auctions);
  const workerRunner = useWorker();

  useEffect(() => {
    workerRunner.getAuctionsAttributes();
  }, [workerRunner, loadingTimestamp]);

  return { auctions };
};
