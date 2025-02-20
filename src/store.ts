import { configureStore, type Middleware } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';

import { Logger } from './logger';
import { optionsReducer } from './services/options';
import { workerReducer } from './services/worker';

const middlewares: Middleware[] = [];

if (process.env.NODE_ENV === `development`) {
  const logger = createLogger({
    // ...options
  });

  middlewares.push(logger);
}

export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...middlewares),
  reducer: {
    options: optionsReducer,
    worker: workerReducer
  }
});

Logger.log('Creating the store', store);

export type RootState = ReturnType<typeof store.getState>;
