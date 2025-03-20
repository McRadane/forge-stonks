import { configureStore, type Middleware } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';

import { Logger } from './logger';
import { attributesReducer } from './services/attributes';
import { forgeReducer } from './services/forge';
import { gardenReducer } from './services/garden';
import { optionsReducer } from './services/options';
import { petsReducer } from './services/pets';
import { rngReducer } from './services/rng';
import { workerReducer } from './services/worker';

const middlewares: Middleware[] = [];

if (import.meta.env.DEV) {
  const logger = createLogger({
    // ...options
  });

  middlewares.push(logger);
}

export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...middlewares),
  reducer: {
    attributes: attributesReducer,
    forge: forgeReducer,
    garden: gardenReducer,
    options: optionsReducer,
    pets: petsReducer,
    rng: rngReducer,
    worker: workerReducer
  }
});

Logger.log('Creating the store', store);

export type RootState = ReturnType<typeof store.getState>;
