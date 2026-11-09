import { configureStore, type Middleware } from '@reduxjs/toolkit';
import { attributesReducer } from '@shared/services/attributes';
import { forgeReducer } from '@shared/services/forge';
import { gardenReducer } from '@shared/services/garden';
import { optionsReducer } from '@shared/services/options';
import { petsReducer } from '@shared/services/pets';
import { rngReducer } from '@shared/services/rng';
import { workerReducer } from '@shared/services/worker';
import { useDispatch, useSelector } from 'react-redux';
import { createLogger } from 'redux-logger';

import { Logger } from './logger';

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
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
