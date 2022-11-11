import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore, PERSIST } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { loadingReducer } from './services/loading';
import { optionsReducer } from './services/options';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['options']
};

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
    })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
