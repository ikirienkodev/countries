import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import api from '../../../../api/services';
import { ILoginRequest } from '../../../../api/services/types';
import { ReducersNames } from '../../../types';

export const loginThunk = createAsyncThunk(`${ReducersNames.AUTH}/login`, async (values: ILoginRequest, thunkAPI) => {
  try {
    const response = await api.login(values);
    return response.status === 200
      ? response.data
      : thunkAPI.rejectWithValue(JSON.stringify(response) ?? 'Unknown error');
  } catch (e: any) {
    return thunkAPI.rejectWithValue(
      (e as AxiosError<{ error: string }>)?.response?.data?.error ?? e?.message ?? JSON.stringify(e)
    );
  }
});
