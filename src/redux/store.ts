import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './slices/authSlice';
import { countriesReducer } from './slices/countriesSlice';
import { ReducersNames } from './types';

export const store = configureStore({
  reducer: {
    [ReducersNames.AUTH]: authReducer,
    [ReducersNames.COUNTRIES]: countriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
