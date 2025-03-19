import { IAuctionAttributes, ITimerDB } from '../requests/types';
import type { itemsFuels, itemsOrganicMatter } from '../resources/garden';
import type { KeysLanguageType } from '../resources/lang/type';
import type { ICraft, ICraftWithCosts, ICraftWithPrice } from '../resources/types';
import type { IOptionsState } from '../services/common';

type WorkerEvent<T> = {
  data: T;
};

// #region Commands definitions
/**
 * Ask for a full refresh
 */
export interface IWorkerCommandForceRefresh {
  command: 'Command-ForceRefresh';
}

/**
 * Ask for the auctions attributes
 */
export interface IWorkerCommandGetAuctionsAttributes {
  command: 'Command-GetAuctionsAttributes';
}

/**
 * Ask for the garden items prices
 */
export interface IWorkerCommandGetGardenPrices {
  command: 'Command-GetGardenPrices';
}

/**
 * Ask for the language
 */
export interface IWorkerCommandGetLanguage {
  command: 'Command-GetLanguage';
}

/**
 * Ask for the items prices
 */
export interface IWorkerCommandGetPrices {
  command: 'Command-GetPrices';
}

/**
 * Initialize the worker
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

/**
 * Set the an options
 */
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

// #endregion

// #region Commands Events
type WorkerCommandEventForceRefresh = WorkerEvent<IWorkerCommandForceRefresh>;
type WorkerCommandEventGetAuctionsAttributes = WorkerEvent<IWorkerCommandGetAuctionsAttributes>;
type WorkerCommandEventGetGardenPrices = WorkerEvent<IWorkerCommandGetGardenPrices>;
type WorkerCommandEventGetLanguage = WorkerEvent<IWorkerCommandGetLanguage>;
type WorkerCommandEventGetPrices = WorkerEvent<IWorkerCommandGetPrices>;
type WorkerCommandEventInitialize = WorkerEvent<IWorkerCommandInitialize>;
type WorkerCommandEventSetLanguage = WorkerEvent<IWorkerCommandSetLanguage>;
type WorkerCommandEventSetOptions = WorkerEvent<IWorkerCommandSetOptions>;
type WorkerCommandEventStartTimer = WorkerEvent<IWorkerCommandStartTimer>;
type WorkerCommandEventStopTimer = WorkerEvent<IWorkerCommandStopTimer>;

export type WorkerCommandEvents =
  | WorkerCommandEventForceRefresh
  | WorkerCommandEventGetAuctionsAttributes
  | WorkerCommandEventGetGardenPrices
  | WorkerCommandEventGetLanguage
  | WorkerCommandEventGetPrices
  | WorkerCommandEventInitialize
  | WorkerCommandEventSetLanguage
  | WorkerCommandEventSetOptions
  | WorkerCommandEventStartTimer
  | WorkerCommandEventStopTimer;

// #endregion

// #region Responses definitions

/**
 * auctions attributes result
 */
export interface IWorkerResponseAuctionsAttributesResult {
  auctionsAttributes: IAuctionAttributes[];
}

/**
 * Return the auctions attributes
 */
export interface IWorkerResponseGetAuctionsAttributes {
  command: 'Response-GetAuctionsAttributes';
  results: IWorkerResponseAuctionsAttributesResult;
}

/**
 * Garden prices result
 */
export interface IWorkerResponseGetGardenPricesResult {
  fuels: Partial<Record<keyof typeof itemsFuels, { price: number; ratio: number }>>;
  organics: Partial<Record<keyof typeof itemsOrganicMatter, { price: number; ratio: number }>>;
}

/**
 * Return the items prices for the garden
 */
export interface IWorkerResponseGetGardenPrices {
  command: 'Response-GetGardenPrices';
  results: IWorkerResponseGetGardenPricesResult;
}

/**
 * Return the language
 */
export interface IWorkerResponseGetLanguage {
  command: 'Response-GetLanguage';
  language: KeysLanguageType | null;
}

/**
 * Prices result
 */
export interface IWorkerResponseGetPricesResult {
  crafts: Record<ICraft['itemId'], ICraftWithCosts>;
  materials: Record<ICraft['itemId'], ICraftWithPrice>;
}

/**
 * Return the items prices
 */
export interface IWorkerResponseGetPrices {
  command: 'Response-GetPrices';
  results: IWorkerResponseGetPricesResult;
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

/**
 * Tell the UI that the timer command has been executed
 */
export interface IWorkerResponseTimerEnded {
  command: 'Response-TimerEnded';
  itemId: ICraft['itemId'];
  slot: number;
}

/**
 * Return the list of timiers
 */
export interface IWorkerResponseTimers {
  command: 'Response-Timers';
  timers: ITimerDB[];
}
/**
 * Tell the UI that the timer command has started
 */
export interface IWorkerResponseTimerSet {
  command: 'Response-TimerSet';
  itemId: ICraft['itemId'];
}

// #endregion

// #region Responses Events
export type WorkerResponseEventGetAuctionsAttributes = WorkerEvent<IWorkerResponseGetAuctionsAttributes>;
export type WorkerResponseEventGetGardenPrices = WorkerEvent<IWorkerResponseGetGardenPrices>;
export type WorkerResponseEventGetLanguage = WorkerEvent<IWorkerResponseGetLanguage>;
export type WorkerResponseEventGetPrices = WorkerEvent<IWorkerResponseGetPrices>;
export type WorkerResponseEventLoading = WorkerEvent<IWorkerResponseLoading>;
export type WorkerResponseEventMessage = WorkerEvent<IWorkerResponseMessage>;
export type WorkerResponseEventOptions = WorkerEvent<IWorkerResponseOptions>;
export type WorkerResponseEventTimerEnded = WorkerEvent<IWorkerResponseTimerEnded>;
export type WorkerResponseEventTimerSet = WorkerEvent<IWorkerResponseTimerSet>;
export type WorkerResponseEventTimers = WorkerEvent<IWorkerResponseTimers>;

export type WorkerResponseEvents =
  | WorkerResponseEventGetAuctionsAttributes
  | WorkerResponseEventGetGardenPrices
  | WorkerResponseEventGetLanguage
  | WorkerResponseEventGetPrices
  | WorkerResponseEventLoading
  | WorkerResponseEventMessage
  | WorkerResponseEventOptions
  | WorkerResponseEventTimerEnded
  | WorkerResponseEventTimers
  | WorkerResponseEventTimerSet;
// #endregion
