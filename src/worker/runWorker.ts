import type { Dispatch, UnknownAction } from '@reduxjs/toolkit';

import { Logger } from '../logger';
import type { INotificationContextDefinition } from '../notification/NotificationContext';
import type { ILanguageContextDefinition, KeysLanguageType } from '../resources/lang/type';
import type { ICraft } from '../resources/types';
import type { IOptionsState } from '../services/common';
import { setOptions } from '../services/options';
import { setLoading, setNotLoading, setPrices, setTimerLaunched, setTimers } from '../services/worker';

import Worker from './stonks.worker?worker';
import type {
  IWorkerCommandForceRefresh,
  IWorkerCommandGetLanguage,
  IWorkerCommandGetPrices,
  IWorkerCommandInitialize,
  IWorkerCommandSetLanguage,
  IWorkerCommandSetOptions,
  IWorkerCommandStartTimer,
  IWorkerCommandStopTimer,
  WorkerResponseEventGetLanguage,
  WorkerResponseEventGetPrices,
  WorkerResponseEventLoading,
  WorkerResponseEventMessage,
  WorkerResponseEventOptions,
  WorkerResponseEvents,
  WorkerResponseEventTimerEnded,
  WorkerResponseEventTimers,
  WorkerResponseEventTimerSet
} from './type';

const audio = new Audio('/forge-stonks/orb.mp3');
audio.volume = 0.3;

interface IWorkerContexts {
  dispatch: Dispatch<UnknownAction>;
  language: ILanguageContextDefinition;
  notification: INotificationContextDefinition;
}

export class WorkerRunner {
  private readonly _contexts: IWorkerContexts;
  private _languageKeyResponse: KeysLanguageType | null = null;
  private _timeGetPrices: null | number = null;
  private readonly _worker!: Worker;

  constructor(contexts: IWorkerContexts) {
    this._worker = new Worker();
    this._contexts = contexts;

    this._listener();
  }

  public forceRefresh() {
    const command: IWorkerCommandForceRefresh = {
      command: 'Command-ForceRefresh'
    };
    this._worker.postMessage(command);
    this._logCommand(`force refresh`);
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

  public setOption(option: keyof IOptionsState, value: boolean | IOptionsState['playFrequency'] | number) {
    const command: IWorkerCommandSetOptions = {
      command: 'Command-SetOptions',
      options: {
        [option]: value
      }
    };
    this._worker.postMessage(command);
    this._logCommand(`set option ${option} to ${value}`);
  }

  public startTimer(itemId: ICraft['itemId']) {
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
    this._worker.addEventListener('message', (event: WorkerResponseEvents) => {
      switch (event.data.command) {
        case 'Response-GetLanguage':
          this._responseGetLanguage(event as WorkerResponseEventGetLanguage);
          break;
        case 'Response-GetPrices':
          this._responseGetPrices(event as WorkerResponseEventGetPrices);
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
  private _responseGetLanguage(event: WorkerResponseEventGetLanguage) {
    this._logResponse(`Received language key ${event.data.language}`);

    this._languageKeyResponse = event.data.language;
  }
  private _responseGetPrices(event: WorkerResponseEventGetPrices) {
    if (this._timeGetPrices !== null) {
      const endTime = performance.now();

      this._logResponse(`Calculated ${Object.keys(event.data.results).length} costs in ${endTime - this._timeGetPrices}ms`);
      this._timeGetPrices = null;
    }

    this._contexts.dispatch(setPrices(event.data.results));
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
    const message = this._contexts.language.dictionary.notification.timerEnded.replace(
      '{0}',
      this._contexts.language.dictionary.items[event.data.itemId]
    );
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
