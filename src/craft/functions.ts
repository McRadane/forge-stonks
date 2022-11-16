import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import type { ILanguage } from '../resources/lang/type';
import type { IOptionsState } from '../services/common';
import type { RootState } from '../store';
import { useWorker } from '../worker/WorkerContext';

export const useItemCraftPrice = (id: keyof ILanguage['items']) => {
  const costs = useSelector((state: RootState) => state.worker.prices);

  return costs[id]?.craft ?? 0;
};

export const useItemsWithCraftPrice = () => {
  const costs = useSelector((state: RootState) => state.worker.prices);
  const workerRunner = useWorker();

  useEffect(() => {
    workerRunner.getPrices();
  }, [workerRunner]);

  return Object.values(costs);
};

export const getProfitByTimeLabel = (playFrequency: IOptionsState['playFrequency'], ui: ILanguage['ui']) => {
  switch (playFrequency) {
    case 'everyday':
      return ui.profitByTimeEveryday;
    case 'less':
      // Hide the column
      break;

    case 'nonstop':
      return ui.profitByTimeNonStop;
    case 'three-time':
      return ui.profitByTimeThreeTime;
    case 'twice':
      return ui.profitByTimeTwice;
  }
};
