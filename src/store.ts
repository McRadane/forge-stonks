import { type Middleware, configureStore } from '@reduxjs/toolkit';
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
  reducer: {
    options: optionsReducer,
    worker: workerReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...middlewares)
});

Logger.log('Creating the store', store);

export type RootState = ReturnType<typeof store.getState>;
