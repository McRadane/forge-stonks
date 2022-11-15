import type { KeysLanguageType } from '../resources/lang/type';
import type { ICraft, ICraftWithCosts } from '../resources/types';
import type { IOptionsState } from '../services/options';

type WorkerEvent<T> = {
  data: T;
};

/**
 * Initialize
 */
export interface IWorkerCommandInitialize {
  command: 'Command-Initialize';
  withNotification: boolean;
}

/**
 * Set the language
 */
export interface IWorkerCommandSetLanguage {
  command: 'Command-SetLanguage';
  language: KeysLanguageType;
}

export interface IWorkerCommandGetLanguage {
  command: 'Command-GetLanguage';
}

export interface IWorkerCommandSetOptions {
  command: 'Command-SetOptions';
  options: Partial<IOptionsState>;
}

/**
 * Ask to create a new timer
 */
export interface IWorkerCommandStartTimer {
  command: 'Command-StartTimer';
  itemId: ICraft['itemId'];
}

/**
 * Ask to stop a timer
 */
export interface IWorkerCommandStopTimer {
  command: 'Command-StopTimer';
  id: number;
}

/**
 * Ask for the items prices
 */
export interface IWorkerCommandGetPrices {
  command: 'Command-GetPrices';
  // crafts: ICraft[];
}

/**
 * Ask for a fll refresh
 */
export interface IWorkerCommandForceRefresh {
  command: 'Command-ForceRefresh';
}

export interface IWorkerResponseGetLanguage {
  command: 'Response-GetLanguage';
  language?: KeysLanguageType;
}

/**
 * Return the items prices
 */
export interface IWorkerResponseGetPrices {
  command: 'Response-GetPrices';
  results: Record<ICraft['itemId'], ICraftWithCosts>;
}

/**
 * Return a message for the Logger
 */
export interface IWorkerResponseMessage {
  command: 'Response-Message';
  message: string;
}

/**
 * Return the loading state
 */
export interface IWorkerResponseLoading {
  command: 'Response-Loading';
  loading: boolean;
}

/**
 * Return the options
 */
export interface IWorkerResponseOptions extends Partial<IOptionsState> {
  command: 'Response-Options';
}

/**
 * Return the list of commands
 */
export interface IWorkerResponseTimers {
  command: 'Response-Timers';
  timers: ITimer[];
}

/**
 * Tell the UI that the timer command has been executed
 */
export interface IWorkerResponseTimerSet {
  command: 'Response-TimerSet';
  itemId: ICraft['itemId'];
}

export interface IWorkerResponseTimerEnded {
  command: 'Response-TimerEnded';
  itemId: ICraft['itemId'];
}

type WorkerCommandEventForceRefresh = WorkerEvent<IWorkerCommandForceRefresh>;
type WorkerCommandEventGetLanguage = WorkerEvent<IWorkerCommandGetLanguage>;
type WorkerCommandEventGetPrices = WorkerEvent<IWorkerCommandGetPrices>;
type WorkerCommandEventInitialize = WorkerEvent<IWorkerCommandInitialize>;
type WorkerCommandEventSetLanguage = WorkerEvent<IWorkerCommandSetLanguage>;
type WorkerCommandEventSetOptions = WorkerEvent<IWorkerCommandSetOptions>;
type WorkerCommandEventStartTimer = WorkerEvent<IWorkerCommandStartTimer>;
type WorkerCommandEventStopTimer = WorkerEvent<IWorkerCommandStopTimer>;

export type WorkerCommandEvents =
  | WorkerCommandEventForceRefresh
  | WorkerCommandEventGetLanguage
  | WorkerCommandEventGetPrices
  | WorkerCommandEventInitialize
  | WorkerCommandEventSetLanguage
  | WorkerCommandEventSetOptions
  | WorkerCommandEventStartTimer
  | WorkerCommandEventStopTimer;

type WorkerResponseEventGetLanguage = WorkerEvent<IWorkerResponseGetLanguage>;
type WorkerResponseEventGetPrices = WorkerEvent<IWorkerResponseGetPrices>;
type WorkerResponseEventLoading = WorkerEvent<IWorkerResponseLoading>;
type WorkerResponseEventMessage = WorkerEvent<IWorkerResponseMessage>;
type WorkerResponseEventOptions = WorkerEvent<IWorkerResponseOptions>;
type WorkerResponseEventTimerEnded = WorkerEvent<IWorkerResponseTimerEnded>;
type WorkerResponseEventTimerSet = WorkerEvent<IWorkerResponseTimerSet>;
type WorkerResponseEventTimers = WorkerEvent<IWorkerResponseTimers>;

export type WorkerResponseEvents =
  | WorkerResponseEventGetLanguage
  | WorkerResponseEventGetPrices
  | WorkerResponseEventLoading
  | WorkerResponseEventMessage
  | WorkerResponseEventOptions
  | WorkerResponseEventTimerEnded
  | WorkerResponseEventTimerSet
  | WorkerResponseEventTimers;

export interface IAuctions {
  buyPrice: number;
  item_name: string;
  sellPrice: number;
}

export interface IBazaar {
  buyPrice: number;
  item_name: string;
  sellPrice: number;
}

export interface ITimer {
  endTime: number;
  id: number;
  itemId: ICraft['itemId'];
  startTime: number;
}
