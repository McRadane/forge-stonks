import type { KeysLanguageType } from '../resources/lang/type';
import type { ICraft, ICraftWithCosts, ICraftWithPrice } from '../resources/types';
import type { IOptionsState } from '../services/common';

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

/**
 * Ask for a fll refresh
 */
export interface IWorkerCommandForceRefresh {
  command: 'Command-ForceRefresh';
}

export interface IWorkerCommandGetLanguage {
  command: 'Command-GetLanguage';
}

/**
 * Ask for the items prices
 */
export interface IWorkerCommandGetPrices {
  command: 'Command-GetPrices';
  // crafts: ICraft[];
}

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

export interface IWorkerResponseGetLanguage {
  command: 'Response-GetLanguage';
  language: KeysLanguageType | null;
}

/**
 * Return the items prices
 */
export interface IWorkerResponseGetPrices {
  command: 'Response-GetPrices';
  results: IWorkerResponseGetPricesResult;
}

export interface IWorkerResponseGetPricesResult {
  crafts: Record<ICraft['itemId'], ICraftWithCosts>;
  materials: Record<ICraft['itemId'], ICraftWithPrice>;
}

/**
 * Return the loading state
 */
export interface IWorkerResponseLoading {
  command: 'Response-Loading';
  loading: boolean;
}

/**
 * Return a message for the Logger
 */
export interface IWorkerResponseMessage {
  command: 'Response-Message';
  message: string;
}

/**
 * Return the options
 */
export interface IWorkerResponseOptions extends Partial<IOptionsState> {
  command: 'Response-Options';
}

export interface IWorkerResponseTimerEnded {
  command: 'Response-TimerEnded';
  itemId: ICraft['itemId'];
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
export type WorkerCommandEvents =
  | WorkerCommandEventForceRefresh
  | WorkerCommandEventGetLanguage
  | WorkerCommandEventGetPrices
  | WorkerCommandEventInitialize
  | WorkerCommandEventSetLanguage
  | WorkerCommandEventSetOptions
  | WorkerCommandEventStartTimer
  | WorkerCommandEventStopTimer;
export type WorkerResponseEvents =
  | WorkerResponseEventGetLanguage
  | WorkerResponseEventGetPrices
  | WorkerResponseEventLoading
  | WorkerResponseEventMessage
  | WorkerResponseEventOptions
  | WorkerResponseEventTimerEnded
  | WorkerResponseEventTimers
  | WorkerResponseEventTimerSet;
type WorkerCommandEventForceRefresh = WorkerEvent<IWorkerCommandForceRefresh>;
type WorkerCommandEventGetLanguage = WorkerEvent<IWorkerCommandGetLanguage>;
type WorkerCommandEventGetPrices = WorkerEvent<IWorkerCommandGetPrices>;
type WorkerCommandEventInitialize = WorkerEvent<IWorkerCommandInitialize>;

type WorkerCommandEventSetLanguage = WorkerEvent<IWorkerCommandSetLanguage>;

type WorkerCommandEventSetOptions = WorkerEvent<IWorkerCommandSetOptions>;
type WorkerCommandEventStartTimer = WorkerEvent<IWorkerCommandStartTimer>;
type WorkerCommandEventStopTimer = WorkerEvent<IWorkerCommandStopTimer>;
type WorkerEvent<T> = {
  data: T;
};
export type WorkerResponseEventGetLanguage = WorkerEvent<IWorkerResponseGetLanguage>;
export type WorkerResponseEventGetPrices = WorkerEvent<IWorkerResponseGetPrices>;
export type WorkerResponseEventLoading = WorkerEvent<IWorkerResponseLoading>;
export type WorkerResponseEventMessage = WorkerEvent<IWorkerResponseMessage>;

export type WorkerResponseEventOptions = WorkerEvent<IWorkerResponseOptions>;

export type WorkerResponseEventTimerEnded = WorkerEvent<IWorkerResponseTimerEnded>;

export type WorkerResponseEventTimers = WorkerEvent<IWorkerResponseTimers>;

export type WorkerResponseEventTimerSet = WorkerEvent<IWorkerResponseTimerSet>;
