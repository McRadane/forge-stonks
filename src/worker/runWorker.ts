import type { Dispatch, UnknownAction } from '@reduxjs/toolkit';

import { Logger } from '../logger';
import type { INotificationContextDefinition } from '../notification/NotificationContext';
import type { ILanguageContextDefinition, KeysLanguageType } from '../resources/lang/type';
import type { IForgeCraft } from '../resources/types';
import { setAttributes } from '../services/attributes';
import type { IOptionsState } from '../services/common';
import { setForgePrices, setTimerLaunched, setTimers } from '../services/forge';
import { setGardenPrices } from '../services/garden';
import { setOptions } from '../services/options';
import { setPetPrices } from '../services/pets';
import { setRNGPrices } from '../services/rng';
import { setLoading, setNotLoading } from '../services/worker';

import Worker from './stonks.worker?worker';
import type {
  IWorkerCommandForceRefresh,
  IWorkerCommandGetAuctionsAttributes,
  IWorkerCommandGetGardenPrices,
  IWorkerCommandGetLanguage,
  IWorkerCommandGetPetPrices,
  IWorkerCommandGetPrices,
  IWorkerCommandGetRNGPrices,
  IWorkerCommandInitialize,
  IWorkerCommandSetLanguage,
  IWorkerCommandSetOptions,
  IWorkerCommandStartTimer,
  IWorkerCommandStopTimer,
  WorkerResponseEventGetAuctionsAttributes,
  WorkerResponseEventGetGardenPrices,
  WorkerResponseEventGetLanguage,
  WorkerResponseEventGetPetPrices,
  WorkerResponseEventGetPrices,
  WorkerResponseEventGetRNGPrices,
  WorkerResponseEventLoading,
  WorkerResponseEventMessage,
  WorkerResponseEventOptions,
  WorkerResponseEvents,
  WorkerResponseEventTimerEnded,
  WorkerResponseEventTimers,
  WorkerResponseEventTimerSet
} from './type';

const audio = new Audio('/orb.mp3');
audio.volume = 0.3;

type OptionsValues = { id: string; name: string } | boolean | number | string | undefined;

interface IWorkerContexts {
  dispatch: Dispatch<UnknownAction>;
  language: ILanguageContextDefinition;
  notification: INotificationContextDefinition;
}

export class WorkerRunner {
  public _contexts: IWorkerContexts;
  private static _instance: null | WorkerRunner = null;
  private _languageKeyResponse: KeysLanguageType | null = null;
  private _timeGetPrices: null | number = null;
  private readonly _worker!: Worker;

  private constructor(contexts: IWorkerContexts) {
    this._worker = new Worker();
    this._contexts = contexts;

    this._listener();
  }

  public static getInstance(contexts: IWorkerContexts) {
    if (!WorkerRunner._instance) {
      WorkerRunner._instance = new WorkerRunner(contexts);
    }

    const instance = WorkerRunner._instance;

    instance._contexts = contexts;

    return instance;
  }

  public forceRefresh() {
    const command: IWorkerCommandForceRefresh = {
      command: 'Command-ForceRefresh'
    };
    this._worker.postMessage(command);
    this._logCommand(`force refresh`);
  }

  public getAuctionsAttributes() {
    if (this._timeGetPrices === null) {
      this._timeGetPrices = performance.now();
      const command: IWorkerCommandGetAuctionsAttributes = {
        command: 'Command-GetAuctionsAttributes'
      };
      this._worker.postMessage(command);
      this._logCommand(`get auctions attributes`);
    }
  }

  public getGardenPrices() {
    if (this._timeGetPrices === null) {
      this._timeGetPrices = performance.now();
      const command: IWorkerCommandGetGardenPrices = {
        command: 'Command-GetGardenPrices'
      };
      this._worker.postMessage(command);
      this._logCommand(`get garden prices`);
    }
  }

  public getLanguage(): Promise<KeysLanguageType | null> {
    const command: IWorkerCommandGetLanguage = {
      command: 'Command-GetLanguage'
    };
    this._worker.postMessage(command);
    this._logCommand(`get language`);

    return new Promise((resolve) => {
      const timer = setInterval(() => {
        clearInterval(timer);
        resolve(this._languageKeyResponse);
        this._logCommand(`get language : resolved to ${this._languageKeyResponse}`);
      }, 10);
    });
  }

  public getPetPrices() {
    if (this._timeGetPrices === null) {
      this._timeGetPrices = performance.now();
      const command: IWorkerCommandGetPetPrices = {
        command: 'Command-GetPetPrices'
      };
      this._worker.postMessage(command);
      this._logCommand(`get pet prices`);
    }
  }

  public getPrices() {
    if (this._timeGetPrices === null) {
      this._timeGetPrices = performance.now();
      const command: IWorkerCommandGetPrices = {
        command: 'Command-GetPrices'
      };
      this._worker.postMessage(command);
      this._logCommand(`get prices`);
    }
  }

  public getRNGPrices() {
    if (this._timeGetPrices === null) {
      this._timeGetPrices = performance.now();
      const command: IWorkerCommandGetRNGPrices = {
        command: 'Command-GetRNGPrices'
      };
      this._worker.postMessage(command);
      this._logCommand(`get rng prices`);
    }
  }

  public initialize() {
    const command: IWorkerCommandInitialize = {
      command: 'Command-Initialize',
      withNotification: 'Notification' in window
    };
    this._worker.postMessage(command);
    this._logCommand(`Initializing`);
  }

  public setLanguage(language: KeysLanguageType) {
    const command: IWorkerCommandSetLanguage = {
      command: 'Command-SetLanguage',
      language
    };
    this._worker.postMessage(command);
    this._contexts.language.userLanguageChange(language);
    this._logCommand(`set language to ${language}`);
  }

  public setOption(option: keyof IOptionsState, value: OptionsValues) {
    const command: IWorkerCommandSetOptions = {
      command: 'Command-SetOptions',
      options: {
        [option]: value
      }
    };
    this._worker.postMessage(command);
    this._logCommand(`set option ${option} to ${JSON.stringify(value)}`);
  }

  public startTimer(itemId: IForgeCraft['itemId']) {
    const command: IWorkerCommandStartTimer = {
      command: 'Command-StartTimer',
      itemId
    };
    this._worker.postMessage(command);
    this._logCommand(`start timer for ${itemId}`);
  }

  public stopTimer(id: number) {
    const command: IWorkerCommandStopTimer = {
      command: 'Command-StopTimer',
      id
    };
    this._worker.postMessage(command);
    this._logCommand(`stop timer for ${id}`);
  }

  private _listener() {
    // eslint-disable-next-line sonarjs/cyclomatic-complexity
    this._worker.addEventListener('message', (event: WorkerResponseEvents) => {
      switch (event.data.command) {
        case 'Response-GetAuctionsAttributes':
          this._responseGetAuctionsAttributes(event as WorkerResponseEventGetAuctionsAttributes);
          break;
        case 'Response-GetGardenPrices':
          this._responseGetGardenPrices(event as WorkerResponseEventGetGardenPrices);
          break;
        case 'Response-GetLanguage':
          this._responseGetLanguage(event as WorkerResponseEventGetLanguage);
          break;
        case 'Response-GetPetPrices':
          this._responseGetPetPrices(event as WorkerResponseEventGetPetPrices);
          break;
        case 'Response-GetPrices':
          this._responseGetPrices(event as WorkerResponseEventGetPrices);
          break;
        case 'Response-GetRNGPrices':
          this._responseGetRNGPrices(event as WorkerResponseEventGetRNGPrices);
          break;
        case 'Response-Loading':
          this._responseLoading(event as WorkerResponseEventLoading);
          break;
        case 'Response-Message':
          this._responseMessage(event as WorkerResponseEventMessage);
          break;
        case 'Response-Options':
          this._responseOptions(event as WorkerResponseEventOptions);
          break;
        case 'Response-TimerEnded':
          this._responseTimerEnded(event as WorkerResponseEventTimerEnded);
          break;
        case 'Response-Timers':
          this._responseTimers(event as WorkerResponseEventTimers);
          break;
        case 'Response-TimerSet':
          this._responseTimerSet(event as WorkerResponseEventTimerSet);
          break;
      }
    });
  }

  private _logCommand(...message: unknown[]) {
    Logger.log('%cWORKER COMMAND ::', 'font-weight:bold;color:green', ...message);
  }

  private _logResponse(...message: unknown[]) {
    Logger.log('%cWORKER RESPONSE ::', 'font-weight:bold;color:purple', ...message);
  }

  private _responseGetAuctionsAttributes(event: WorkerResponseEventGetAuctionsAttributes) {
    this._logResponse('Get auctions attributes');

    this._contexts.dispatch(setAttributes(event.data.results.auctionsAttributes));
  }

  private _responseGetGardenPrices(event: WorkerResponseEventGetGardenPrices) {
    this._logResponse('Get prices for the garden');

    this._contexts.dispatch(setGardenPrices(event.data.results));
  }

  private _responseGetLanguage(event: WorkerResponseEventGetLanguage) {
    this._logResponse(`Received language key ${event.data.language}`);

    this._languageKeyResponse = event.data.language;
  }

  private _responseGetPetPrices(event: WorkerResponseEventGetPetPrices) {
    if (this._timeGetPrices !== null) {
      const endTime = performance.now();

      this._logResponse(`Calculated ${Object.keys(event.data.results).length} costs in ${endTime - this._timeGetPrices}ms`);
      this._timeGetPrices = null;
    }

    this._contexts.dispatch(setPetPrices(event.data.results));
  }

  private _responseGetPrices(event: WorkerResponseEventGetPrices) {
    if (this._timeGetPrices !== null) {
      const endTime = performance.now();

      this._logResponse(`Calculated ${Object.keys(event.data.results).length} costs in ${endTime - this._timeGetPrices}ms`);
      this._timeGetPrices = null;
    }

    this._contexts.dispatch(setForgePrices(event.data.results));
  }

  private _responseGetRNGPrices(event: WorkerResponseEventGetRNGPrices) {
    if (this._timeGetPrices !== null) {
      const endTime = performance.now();

      this._logResponse(`Calculated ${Object.keys(event.data.results).length} costs in ${endTime - this._timeGetPrices}ms`);
      this._timeGetPrices = null;
    }

    this._contexts.dispatch(setRNGPrices(event.data.results));
  }

  private _responseLoading(event: WorkerResponseEventLoading) {
    if (event.data.loading) {
      this._logResponse('Set Loading');
      this._contexts.dispatch(setLoading());
    } else {
      this._logResponse('End Loading');
      this._contexts.dispatch(setNotLoading());
    }
  }
  private _responseMessage(event: WorkerResponseEventMessage) {
    if (event.data.message.startsWith('{')) {
      this._logResponse(JSON.parse(event.data.message));
    } else {
      this._logResponse(event.data.message);
    }
  }
  private _responseOptions(event: WorkerResponseEventOptions) {
    this._contexts.dispatch(setOptions(event.data));
  }
  private _responseTimerEnded(event: WorkerResponseEventTimerEnded) {
    this._logResponse(`A timer has ended`);
    const message = this._contexts.language.dictionary.notification.timerEnded
      .replace('{0}', this._contexts.language.dictionary.items[event.data.itemId])
      .replace('{1}', String(event.data.slot ?? ''));
    this._contexts.notification.triggerSuccess(message);
    audio.play();
  }
  private _responseTimers(event: WorkerResponseEventTimers) {
    this._logResponse('Get Timers');
    this._contexts.dispatch(setTimers(event.data.timers));
  }

  private _responseTimerSet(event: WorkerResponseEventTimerSet) {
    this._logResponse('Timer has been set');
    this._contexts.dispatch(setTimerLaunched(event.data.itemId));
  }
}
