import { combineReducers, configureStore, Middleware } from '@reduxjs/toolkit';
import { persistReducer, persistStore, PERSIST } from 'redux-persist';
import { createLogger } from 'redux-logger';

import { optionsReducer } from './services/options';
import { Logger } from './logger';
import { workerReducer } from './services/worker';
import { WorkerRunner } from './worker/runWorker';

class Storage {
  public worker: WorkerRunner | undefined;

  public getItem(key: string): Promise<string | number> {
    return this.executeOrWait((worker) => {
      return worker.cacheGet(key);
    });
  }

  public setItem(key: string, value: string | number): Promise<void> {
    return this.executeOrWait((worker) => {
      return worker.cacheSet(key, value);
    });
  }

  public removeItem(key: string): Promise<void> {
    return this.executeOrWait((worker) => {
      return worker.cacheDelete(key);
    });
  }

  private executeOrWait<T>(command: (worker: WorkerRunner) => Promise<T>): Promise<T> {
    if (this.worker !== undefined) {
      return command(this.worker);
    }
    return new Promise((resolve) => {
      const wait = setInterval(() => {
        if (this.worker !== undefined) {
          clearInterval(wait);
          resolve(command(this.worker));
        }
      }, 10);
    });
  }
}

export const storage = new Storage();

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['options']
};

const middlewares: Middleware[] = [];

if (process.env.NODE_ENV === `development`) {
  const logger = createLogger({
    // ...options
  });

  middlewares.push(logger);
}

const rootReducer = combineReducers({
  options: optionsReducer,
  worker: workerReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST]
      }
    }).concat(...middlewares)
});

Logger.log('Creating the store', store);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
