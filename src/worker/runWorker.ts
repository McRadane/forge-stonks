import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { createContext, useContext } from 'react';

import { Logger } from '../logger';
import { ICraft } from '../resources/crafts';
import { ILanguageContextDefinition, KeysLanguageType } from '../resources/lang/type';
import { setPrices, setLoading, setNotLoading, setTimers, setTimerLaunched } from '../services/worker';

// eslint-disable-next-line import/no-unresolved
import Worker from './stonks.worker?worker';
import {
  IWorkerCommandDeleteCacheItem,
  IWorkerCommandForceRefresh,
  IWorkerCommandGetCacheItem,
  IWorkerCommandGetLanguage,
  IWorkerCommandGetPrices,
  IWorkerCommandInitialize,
  IWorkerCommandSetCacheItem,
  IWorkerCommandSetLanguage,
  IWorkerCommandStartTimer,
  IWorkerCommandStopTimer,
  WorkerResponseEvents
} from './type';

export class WorkerRunner {
  private dispatch!: Dispatch<AnyAction>;
  private worker!: Worker;
  private timeGetPrices!: number | undefined;
  private languageKeyResponse: KeysLanguageType | undefined;
  private cacheGetResponse: Record<string, string | number> = {};
  private cacheSetResponse: string[] = [];
  private cacheDeleteResponse: string[] = [];
  private languageContext!: ILanguageContextDefinition;

  constructor() {
    this.worker = new Worker();

    this.listener();
  }

  public setup(dispatch: Dispatch<AnyAction>, languageContext: ILanguageContextDefinition) {
    this.dispatch = dispatch;
    this.languageContext = languageContext;
  }

  public initialize() {
    const command: IWorkerCommandInitialize = {
      command: 'initialize',
      withNotification: 'Notification' in window
    };
    this.worker.postMessage(command);
    this.logCommand(`Initializing`);
  }
  public setLanguage(language: KeysLanguageType) {
    const command: IWorkerCommandSetLanguage = {
      command: 'setLanguage',
      language
    };
    this.worker.postMessage(command);
    this.languageContext.userLanguageChange(language);
    this.logCommand(`set language to ${language}`);
  }

  public getLanguage(): Promise<KeysLanguageType> {
    const command: IWorkerCommandGetLanguage = {
      command: 'getLanguage'
    };
    this.worker.postMessage(command);
    this.logCommand(`get language`);

    return new Promise((resolve) => {
      const timer = setInterval(() => {
        if (this.languageKeyResponse !== undefined) {
          clearInterval(timer);
          resolve(this.languageKeyResponse);
          this.logCommand(`get language : resolved to ${this.languageKeyResponse}`);
        }
      }, 10);
    });
  }

  public startTimer(itemId: ICraft['itemId']) {
    const command: IWorkerCommandStartTimer = {
      command: 'startTimer',
      itemId
    };
    this.worker.postMessage(command);
    this.logCommand(`start timer for ${itemId}`);
  }

  public stopTimer(id: number) {
    const command: IWorkerCommandStopTimer = {
      command: 'stopTimer',
      id
    };
    this.worker.postMessage(command);
    this.logCommand(`stop timer for ${id}`);
  }

  public getPrices(options: Omit<IWorkerCommandGetPrices, 'command'>) {
    if (this.timeGetPrices === undefined) {
      this.timeGetPrices = performance.now();
      const command: IWorkerCommandGetPrices = {
        command: 'getPrices',
        crafts: options.crafts
      };
      this.worker.postMessage(command);
      this.logCommand(`get prices`);
    }
  }

  public forceRefresh() {
    const command: IWorkerCommandForceRefresh = {
      command: 'forceRefresh'
    };
    this.worker.postMessage(command);
    this.logCommand(`force refresh`);
  }

  public cacheGet(key: string): Promise<string | number> {
    const command: IWorkerCommandGetCacheItem = {
      command: 'getCacheItem',
      key
    };
    this.worker.postMessage(command);
    this.logCommand(`get cache item`, key);

    return new Promise((resolve) => {
      const timer = setInterval(() => {
        if (this.cacheGetResponse[key] !== undefined) {
          clearInterval(timer);
          resolve(this.cacheGetResponse[key]);
          this.logCommand(`get cache item : resolved to ${this.cacheGetResponse[key]}`);
          delete this.cacheGetResponse[key];
        }
      }, 10);
    });
  }

  public cacheSet(key: string, value: string | number): Promise<void> {
    const command: IWorkerCommandSetCacheItem = {
      command: 'setCacheItem',
      key,
      value
    };
    this.worker.postMessage(command);
    this.logCommand(`set cache item`, key, value);

    return new Promise((resolve) => {
      const timer = setInterval(() => {
        if (this.cacheSetResponse.includes(key)) {
          clearInterval(timer);
          this.cacheSetResponse = this.cacheSetResponse.filter((cache) => cache !== key);
          resolve();
          this.logCommand(`set cache item : resolved`);
        }
      }, 10);
    });
  }

  public cacheDelete(key: string): Promise<void> {
    const command: IWorkerCommandDeleteCacheItem = {
      command: 'deleteCacheItem',
      key
    };
    this.worker.postMessage(command);
    this.logCommand(`delete cache item`, key);

    return new Promise((resolve) => {
      const timer = setInterval(() => {
        if (this.cacheDeleteResponse.includes(key)) {
          clearInterval(timer);
          this.cacheDeleteResponse = this.cacheDeleteResponse.filter((cache) => cache !== key);
          resolve();
          this.logCommand(`delete cache item : resolved`);
        }
      }, 10);
    });
  }

  private logCommand(...message: unknown[]) {
    Logger.log('%cWORKER COMMAND ::', 'font-weight:bold;color:green', ...message);
  }

  private logResponse(...message: unknown[]) {
    Logger.log('%cWORKER RESPONSE ::', 'font-weight:bold;color:purple', ...message);
  }

  private listener() {
    this.worker.addEventListener('message', (event: WorkerResponseEvents) => {
      switch (event.data.command) {
        case 'cacheDeleteExecuted':
          this.logResponse('Cache delete executed', event.data.key);
          this.cacheDeleteResponse.push(event.data.key);
          break;
        case 'cacheGetResult':
          this.logResponse('Cache get executed', event.data.key, event.data.value);
          if (event.data.value !== undefined) {
            this.cacheGetResponse[event.data.key] = event.data.value;
          }

          break;
        case 'cacheSetExecuted':
          this.logResponse('Cache set executed', event.data.key);
          this.cacheSetResponse.push(event.data.key);
          break;
        case 'getLanguageResponse':
          this.logResponse(`Received language key ${event.data.language}`);

          this.languageKeyResponse = event.data.language;
          break;
        case 'loading':
          if (event.data.loading) {
            this.logResponse('Set Loading');
            this.dispatch(setLoading());
          } else {
            this.logResponse('End Loading');
            this.dispatch(setNotLoading());
          }
          break;
        case 'message':
          if (event.data.message.startsWith('{')) {
            this.logResponse(JSON.parse(event.data.message));
          } else {
            this.logResponse(event.data.message);
          }
          break;
        case 'resultGetPrices':
          if (this.timeGetPrices !== undefined) {
            const endTime = performance.now();
            // worker.terminate();
            this.logResponse(`Calculated ${Object.keys(event.data.results).length} costs in ${endTime - this.timeGetPrices}ms`);
            this.timeGetPrices = undefined;
          }

          this.dispatch(setPrices(event.data.results));
          break;
        case 'timerSet':
          this.logResponse('Timer has been set');
          this.dispatch(setTimerLaunched(event.data.itemId));
          break;
        case 'timers':
          this.logResponse('Get Timers');
          this.dispatch(setTimers(event.data.timers));
          break;
      }
    });
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const WorkerRunnerContext = createContext<{ instance: WorkerRunner }>({ instance: undefined as any });

export const useWorker = () => {
  const { instance } = useContext(WorkerRunnerContext);

  return instance;
};
