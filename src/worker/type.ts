import { ICraftWithCosts } from '../craft/functions';
import { ICraft } from '../resources/crafts';
import { KeysLanguageType } from '../resources/lang/type';

type WorkerEvent<T> = {
  data: T;
};

/**
 * Initialize
 */
export interface IWorkerCommandInitialize {
  command: 'initialize';
  withNotification: boolean;
}

/**
 * Set the language
 */
export interface IWorkerCommandSetLanguage {
  language: KeysLanguageType;
  command: 'setLanguage';
}

export interface IWorkerCommandGetLanguage {
  command: 'getLanguage';
}

/**
 * Ask to create a new timer
 */
export interface IWorkerCommandStartTimer {
  itemId: ICraft['itemId'];
  command: 'startTimer';
}

/**
 * Ask to stop a timer
 */
export interface IWorkerCommandStopTimer {
  id: number;
  command: 'stopTimer';
}

/**
 * Ask for the items prices
 */
export interface IWorkerCommandGetPrices {
  crafts: ICraft[];
  command: 'getPrices';
}

/**
 * Ask for a fll refresh
 */
export interface IWorkerCommandForceRefresh {
  command: 'forceRefresh';
}

export interface IWorkerCommandSetCacheItem {
  command: 'setCacheItem';
  key: string;
  value: string | number;
}

export interface IWorkerCommandGetCacheItem {
  command: 'getCacheItem';
  key: string;
}

export interface IWorkerCommandDeleteCacheItem {
  command: 'deleteCacheItem';
  key: string;
}

export interface IWorkerResponseGetLanguage {
  language?: KeysLanguageType;
  command: 'getLanguageResponse';
}

/**
 * Return the items prices
 */
export interface IWorkerResponseGetPrices {
  results: Record<ICraft['itemId'], ICraftWithCosts>;
  command: 'resultGetPrices';
}

/**
 * Return a message for the Logger
 */
export interface IWorkerResponseMessage {
  message: string;
  command: 'message';
}

/**
 * Return the loading state
 */
export interface IWorkerResponseLoading {
  loading: boolean;
  command: 'loading';
}

/**
 * Return the list of commands
 */
export interface IWorkerResponseTimers {
  timers: ITimer[];
  command: 'timers';
}

/**
 * Tell the UI that the timer command has been executed
 */
export interface IWorkerResponseTimerSet {
  itemId: ICraft['itemId'];
  command: 'timerSet';
}

export interface IWorkerResponseCacheDeleteExecuted {
  command: 'cacheDeleteExecuted';
  key: string;
}

export interface IWorkerResponseCacheSetExecuted {
  command: 'cacheSetExecuted';
  key: string;
}

export interface IWorkerResponseCacheGetResult {
  command: 'cacheGetResult';
  key: string;
  value: string | number | undefined;
}

export type WorkerCommandEventInitialize = WorkerEvent<IWorkerCommandInitialize>;
export type WorkerCommandEventSetLanguage = WorkerEvent<IWorkerCommandSetLanguage>;
export type WorkerCommandEventGetLanguage = WorkerEvent<IWorkerCommandGetLanguage>;
export type WorkerCommandEventStartTimer = WorkerEvent<IWorkerCommandStartTimer>;
export type WorkerCommandEventStopTimer = WorkerEvent<IWorkerCommandStopTimer>;
export type WorkerCommandEventGetPrices = WorkerEvent<IWorkerCommandGetPrices>;
export type WorkerCommandEventForceRefresh = WorkerEvent<IWorkerCommandForceRefresh>;
export type WorkerCommandEventSetCacheItem = WorkerEvent<IWorkerCommandSetCacheItem>;
export type WorkerCommandEventGetCacheItem = WorkerEvent<IWorkerCommandGetCacheItem>;
export type WorkerCommandEventDeleteCacheItem = WorkerEvent<IWorkerCommandDeleteCacheItem>;

export type WorkerCommandEvents =
  | WorkerCommandEventInitialize
  | WorkerCommandEventSetLanguage
  | WorkerCommandEventGetLanguage
  | WorkerCommandEventStartTimer
  | WorkerCommandEventStopTimer
  | WorkerCommandEventGetPrices
  | WorkerCommandEventForceRefresh
  | WorkerCommandEventSetCacheItem
  | WorkerCommandEventGetCacheItem
  | WorkerCommandEventDeleteCacheItem;

export type WorkerResponseEventGetLanguage = WorkerEvent<IWorkerResponseGetLanguage>;
export type WorkerResponseEventGetPrices = WorkerEvent<IWorkerResponseGetPrices>;
export type WorkerResponseEventMessage = WorkerEvent<IWorkerResponseMessage>;
export type WorkerResponseEventTimers = WorkerEvent<IWorkerResponseTimers>;
export type WorkerResponseEventLoading = WorkerEvent<IWorkerResponseLoading>;
export type WorkerResponseEventTimerSet = WorkerEvent<IWorkerResponseTimerSet>;
export type WorkerResponseEventCacheDeleteExecuted = WorkerEvent<IWorkerResponseCacheDeleteExecuted>;
export type WorkerResponseEventCacheSetExecuted = WorkerEvent<IWorkerResponseCacheSetExecuted>;
export type WorkerResponseEventCacheGetResult = WorkerEvent<IWorkerResponseCacheGetResult>;

export type WorkerResponseEvents =
  | WorkerResponseEventGetLanguage
  | WorkerResponseEventGetPrices
  | WorkerResponseEventMessage
  | WorkerResponseEventTimers
  | WorkerResponseEventLoading
  | WorkerResponseEventTimerSet
  | WorkerResponseEventCacheDeleteExecuted
  | WorkerResponseEventCacheSetExecuted
  | WorkerResponseEventCacheGetResult;

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
  id: number;
  itemId: ICraft['itemId'];
  startTime: number;
  endTime: number;
}
