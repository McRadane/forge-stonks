import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { ICraft } from '../resources/crafts';
import { ILanguage } from '../resources/lang/type';
import { IOptionsState } from '../services/options';
import { RootState } from '../store';
import { useWorker } from '../worker/runWorker';

export const useItemCraftPrice = (id: keyof ILanguage['items']) => {
  const costs = useSelector((state: RootState) => state.worker.prices);

  return costs[id]?.craft ?? 0;
};

export interface ICraftWithCosts extends ICraft {
  craft: number;
  profit: number;
  profitHourly: number;
  sell: number;
}

export const useItemsWithCraftPrice = (crafts: ICraft[]) => {
  // const [costs, setCosts] = useState<Record<ICraft['itemId'], ICraftWithCosts>>({} as Record<ICraft['itemId'], ICraftWithCosts>);

  const { auctionsBINOnly, intermediateCraft, playFrequency } = useSelector((state: RootState) => state.options);
  const costs = useSelector((state: RootState) => state.worker.prices);
  const workerRunner = useWorker();

  useEffect(() => {
    console.log('now', performance.now(), { auctionsBINOnly, crafts, intermediateCraft, playFrequency, workerRunner });
    workerRunner.getPrices({ auctionsBINOnly, crafts, intermediateCraft, playFrequency });
  }, [auctionsBINOnly, crafts, intermediateCraft, playFrequency, workerRunner]);

  return Object.values(costs);
};

export const getProfitByTimeLabel = (playFrequency: IOptionsState['playFrequency'], ui: ILanguage['ui']) => {
  switch (playFrequency) {
    case 'everyday':
      return ui.profitByTimeEveryday;
      break;
    case 'less':
      // Hide the column
      break;

    case 'nonstop':
      return ui.profitByTimeNonStop;
      break;
    case 'three-time':
      return ui.profitByTimeThreeTime;
      break;
    case 'twice':
      return ui.profitByTimeTwice;
      break;
  }

  return;
};
