import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ILoginResponse } from '../../../api/services/types';
import { initDetail, onFulfilledReducer, onPendingReducer, onRejectedReducer } from '../../reducers';
import { AuthStateDraft, IAuthState, ReducersNames } from '../../types';

import { loginThunk } from './asyncActions';

const initialState: IAuthState = {
  login: {
    ui: {
      isRememberMeChecked: false,
    },
    isAuthenticated: !!localStorage.getItem('token')?.toString(),
    ...initDetail,
  },
};

export const authSlice = createSlice({
  name: ReducersNames.AUTH,
  initialState,
  reducers: {
    setIsRememberMeChecked(state, action: PayloadAction<boolean>) {
      state.login.ui.isRememberMeChecked = action.payload;
    },
    clearMessage(state, action: PayloadAction<'login'>) {
      state[action.payload].message = null;
    },
    logout(state) {
      state.login.isAuthenticated = false;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        loginThunk.pending,
        onPendingReducer<AuthStateDraft>('login', (state) => {
          state.login.result = null;
        })
      )
      .addCase(
        loginThunk.fulfilled,
        onFulfilledReducer<AuthStateDraft>('login', (state, action: PayloadAction<ILoginResponse>) => {
          state.login.result = action.payload;
          state.login.isAuthenticated = true;
          if (state.login.ui.isRememberMeChecked) {
            localStorage.setItem('token', action.payload.token);
          }
        })
      )
      .addCase(loginThunk.rejected, onRejectedReducer<AuthStateDraft>('login'));
  },
});

export const { actions: authActions, reducer: authReducer } = authSlice;
