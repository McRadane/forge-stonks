import type { ILanguage } from '@shared/resources/lang/type';
import type { CraftCategory } from '@shared/resources/types';
import type { IOptionsState } from '@shared/services/common';
import { useAppSelector } from '@ui/store';
import { useWorker } from '@ui/worker/WorkerContext';
import { useEffect } from 'react';

export const useItemCraftPrice = (id: keyof ILanguage['items']) => {
  const costs = useAppSelector((state) => state.forge.forgePrices);
  const materialCosts = useAppSelector((state) => state.forge.materialPrices);

  if (materialCosts[id]?.craft !== undefined) {
    return materialCosts[id]?.craft ?? 0;
  }

  if (costs[id]?.craft !== undefined) {
    return costs[id]?.craft ?? 0;
  }

  return 0;
};

export const useItemsWithCraftPrice = () => {
  const { loadingTimestamp } = useAppSelector((state) => state.worker);
  const { forgePrices: costs } = useAppSelector((state) => state.forge);
  const workerRunner = useWorker();

  useEffect(() => {
    workerRunner.getPrices();
  }, [workerRunner, loadingTimestamp]);

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

export const getCategoryLabel = (category: CraftCategory, ui: ILanguage['ui']) => {
  switch (category) {
    case 'drill parts':
      return ui.categoryDrillParts;
    case 'forging':
      return ui.categoryForging;
    case 'gear':
      return ui.categoryGear;
    case 'gemstone':
      return ui.categoryGemstone;
    case 'pets':
      return ui.categoryPets;
    case 'refining':
      return ui.categoryRefining;
    case 'stones':
      return ui.categoryStones;
    case 'tools':
      return ui.categoryTools;
    case 'other':
    default:
      return ui.categoryOther;
  }
};
