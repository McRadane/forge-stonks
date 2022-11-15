import { AnyAction, Dispatch } from '@reduxjs/toolkit';

import { Logger } from '../logger';
import { ICraft } from '../resources/crafts';
import { KeysLanguageType, ILanguageContextDefinition } from '../resources/lang/type';
import { setOptions, IOptionsState } from '../services/options';
import { setLoading, setNotLoading, setPrices, setTimerLaunched, setTimers } from '../services/worker';

// eslint-disable-next-line import/no-unresolved
import Worker from './stonks.worker?worker';
import {
  WorkerResponseEvents,
  IWorkerCommandForceRefresh,
  IWorkerCommandGetLanguage,
  IWorkerCommandGetPrices,
  IWorkerCommandInitialize,
  IWorkerCommandSetLanguage,
  IWorkerCommandSetOptions,
  IWorkerCommandStartTimer,
  IWorkerCommandStopTimer
} from './type';

const audio = new Audio('/forge-stonks/orb.mp3');
audio.volume = 0.3;

export class WorkerRunner {
  private dispatch!: Dispatch<AnyAction>;
  private worker!: Worker;
  private timeGetPrices!: undefined | number;
  private languageKeyResponse: undefined | KeysLanguageType;

  private languageContext!: ILanguageContextDefinition;

  constructor(languageContext: ILanguageContextDefinition, dispatch: Dispatch<AnyAction>) {
    this.worker = new Worker();
    this.dispatch = dispatch;
    this.languageContext = languageContext;

    this.listener();
  }

  public initialize() {
    const command: IWorkerCommandInitialize = {
      command: 'Command-Initialize',
      withNotification: 'Notification' in window
    };
    this.worker.postMessage(command);
    this.logCommand(`Initializing`);
  }

  public setLanguage(language: KeysLanguageType) {
    const command: IWorkerCommandSetLanguage = {
      command: 'Command-SetLanguage',
      language
    };
    this.worker.postMessage(command);
    this.languageContext.userLanguageChange(language);
    this.logCommand(`set language to ${language}`);
  }

  public setOption(option: keyof IOptionsState, value: IOptionsState['playFrequency'] | boolean | number) {
    const command: IWorkerCommandSetOptions = {
      command: 'Command-SetOptions',
      options: {
        [option]: value
      }
    };
    this.worker.postMessage(command);
    this.logCommand(`set option ${option} to ${value}`);
  }

  public getLanguage(): Promise<undefined | KeysLanguageType> {
    const command: IWorkerCommandGetLanguage = {
      command: 'Command-GetLanguage'
    };
    this.worker.postMessage(command);
    this.logCommand(`get language`);

    return new Promise((resolve) => {
      const timer = setInterval(() => {
        clearInterval(timer);
        resolve(this.languageKeyResponse);
        this.logCommand(`get language : resolved to ${this.languageKeyResponse}`);
      }, 10);
    });
  }

  public startTimer(itemId: ICraft['itemId']) {
    const command: IWorkerCommandStartTimer = {
      command: 'Command-StartTimer',
      itemId
    };
    this.worker.postMessage(command);
    this.logCommand(`start timer for ${itemId}`);
  }

  public stopTimer(id: number) {
    const command: IWorkerCommandStopTimer = {
      command: 'Command-StopTimer',
      id
    };
    this.worker.postMessage(command);
    this.logCommand(`stop timer for ${id}`);
  }

  public getPrices() {
    if (this.timeGetPrices === undefined) {
      this.timeGetPrices = performance.now();
      const command: IWorkerCommandGetPrices = {
        command: 'Command-GetPrices'
      };
      this.worker.postMessage(command);
      this.logCommand(`get prices`);
    }
  }

  public forceRefresh() {
    const command: IWorkerCommandForceRefresh = {
      command: 'Command-ForceRefresh'
    };
    this.worker.postMessage(command);
    this.logCommand(`force refresh`);
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
        case 'Response-GetLanguage':
          this.logResponse(`Received language key ${event.data.language}`);

          this.languageKeyResponse = event.data.language;
          break;
        case 'Response-GetPrices':
          if (this.timeGetPrices !== undefined) {
            const endTime = performance.now();
            // worker.terminate();
            this.logResponse(`Calculated ${Object.keys(event.data.results).length} costs in ${endTime - this.timeGetPrices}ms`);
            this.timeGetPrices = undefined;
          }

          this.dispatch(setPrices(event.data.results));
          break;
        case 'Response-Loading':
          if (event.data.loading) {
            this.logResponse('Set Loading');
            this.dispatch(setLoading());
          } else {
            this.logResponse('End Loading');
            this.dispatch(setNotLoading());
          }
          break;
        case 'Response-Message':
          if (event.data.message.startsWith('{')) {
            this.logResponse(JSON.parse(event.data.message));
          } else {
            this.logResponse(event.data.message);
          }
          break;
        case 'Response-Options':
          this.dispatch(setOptions(event.data));
          break;
        case 'Response-TimerEnded':
          this.logResponse(`A timer has ended`);

          audio.play();
          break;
        case 'Response-TimerSet':
          this.logResponse('Timer has been set');
          this.dispatch(setTimerLaunched(event.data.itemId));
          break;
        case 'Response-Timers':
          this.logResponse('Get Timers');
          this.dispatch(setTimers(event.data.timers));
          break;
      }
    });
  }
}
