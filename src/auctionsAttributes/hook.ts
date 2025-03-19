import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../store';
import { useWorker } from '../worker/WorkerContext';

export const useAuctionsAttributes = () => {
  const { loadingTimestamp } = useSelector((state: RootState) => state.worker);
  const auctions = useSelector((state: RootState) => state.attributes.auctions);
  const workerRunner = useWorker();

  useEffect(() => {
    workerRunner.getAuctionsAttributes();
  }, [workerRunner, loadingTimestamp]);

  return { auctions };
};
