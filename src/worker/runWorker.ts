import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { createContext, useContext } from 'react';

import { Logger } from '../logger';
import { setLoading, setNotLoading } from '../services/loading';
import { setPrices } from '../services/worker';

import { QueryWorkerCommandForceRefresh, QueryWorkerCommandGetPrices, ResultsWorkerEvents } from './type';

export class WorkerRunner {
  private dispatch: Dispatch<AnyAction>;
  private worker: Worker;
  private timeGetPrices!: number | undefined;

  constructor(dispatch: Dispatch<AnyAction>) {
    this.dispatch = dispatch;

    this.worker = new Worker(new URL('./stonks.worker.ts', import.meta.url), {
      type: 'module'
    });
    this.listener();
  }
  private listener() {
    this.worker.addEventListener('message', (event: ResultsWorkerEvents) => {
      if (event.data.command === 'message') {
        if (event.data.message.startsWith('{')) {
          Logger.log(JSON.parse(event.data.message));
        } else {
          Logger.log(event.data.message);
        }
      }

      if (event.data.command === 'resultGetPrices') {
        if (this.timeGetPrices !== undefined) {
          const endTime = performance.now();
          // worker.terminate();
          Logger.log(`Calculated ${Object.keys(event.data.results).length} costs in ${endTime - this.timeGetPrices}ms`);
          this.timeGetPrices = undefined;
        }

        this.dispatch(setPrices(event.data.results));
      }

      if (event.data.command === 'loading') {
        if (event.data.loading) {
          this.dispatch(setLoading());
        } else {
          this.dispatch(setNotLoading());
        }
      }
    });
  }

  public getPrices(command: Omit<QueryWorkerCommandGetPrices, 'command'>) {
    if (this.timeGetPrices === undefined) {
      this.timeGetPrices = performance.now();
      this.worker.postMessage({
        command: 'getPrices',
        auctionsBINOnly: command.auctionsBINOnly,
        // costsRef: command.costsRef,
        crafts: command.crafts,
        intermediateCraft: command.intermediateCraft,
        playFrequency: command.playFrequency
      } as QueryWorkerCommandGetPrices);
    }
  }

  public forceRefresh() {
    this.worker.postMessage({
      command: 'forceRefresh'
    } as QueryWorkerCommandForceRefresh);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const WorkerRunnerContext = createContext<{ instance: WorkerRunner }>({ instance: undefined as any });

export const useWorker = () => {
  const { instance } = useContext(WorkerRunnerContext);

  return instance;
};
