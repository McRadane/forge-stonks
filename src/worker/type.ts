import { ICraftWithCosts } from '../craft/functions';
import { ICraft } from '../resources/crafts';
import { IOptionsState } from '../services/options';

type WorkerCommand<T> = {
  data: T;
};

interface QueryWorkerCommandStartTimer {
  length: number;
  command: 'startTimer';
}

interface QueryWorkerCommandStopTimer {
  id: number;
  command: 'stopTimer';
}

export interface QueryWorkerCommandGetPrices {
  crafts: ICraft[];
  // costsRef: Record<ICraft['itemId'], number>;
  auctionsBINOnly: IOptionsState['auctionsBINOnly'];
  intermediateCraft: IOptionsState['intermediateCraft'];
  playFrequency: IOptionsState['playFrequency'];
  command: 'getPrices';
}

export interface QueryWorkerCommandForceRefresh {
  command: 'forceRefresh';
}

export interface ResultsWorkerCommandGetPrices {
  results: Record<ICraft['itemId'], ICraftWithCosts>;
  command: 'resultGetPrices';
}

export interface WorkerCommandMessage {
  message: string;
  command: 'message';
}

interface ResultsWorkerCommandLoading {
  loading: boolean;
  command: 'loading';
}

export type QueryWorkerEventStartTimer = WorkerCommand<QueryWorkerCommandStartTimer>;
export type QueryWorkerEventStopTimer = WorkerCommand<QueryWorkerCommandStopTimer>;
export type QueryWorkerEventGetPrices = WorkerCommand<QueryWorkerCommandGetPrices>;

export type QueryWorkerEventForceRefresh = WorkerCommand<QueryWorkerCommandForceRefresh>;

export type QueryWorkerCommands =
  | QueryWorkerEventStartTimer
  | QueryWorkerEventStopTimer
  | QueryWorkerEventGetPrices
  | QueryWorkerEventForceRefresh;

export type ResultsWorkerEventGetPrices = WorkerCommand<ResultsWorkerCommandGetPrices>;
export type ResultsWorkerEventMessage = WorkerCommand<WorkerCommandMessage>;
type ResultsWorkerEventLoading = WorkerCommand<ResultsWorkerCommandLoading>;

export type ResultsWorkerEvents = ResultsWorkerEventGetPrices | ResultsWorkerEventMessage | ResultsWorkerEventLoading;
