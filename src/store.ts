import { combineReducers, configureStore, Middleware } from '@reduxjs/toolkit';
import { persistReducer, persistStore, PERSIST } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createLogger } from 'redux-logger';

import { loadingReducer } from './services/loading';
import { optionsReducer } from './services/options';
import { Logger } from './logger';

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
  loading: loadingReducer,
  options: optionsReducer
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
