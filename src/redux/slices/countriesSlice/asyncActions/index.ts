import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import api from '../../../../api/services';
import { ReducersNames } from '../../../types';

export const getCountriesThunk = createAsyncThunk(`${ReducersNames.COUNTRIES}/getCountries`, async (_, thunkAPI) => {
  try {
    const response = await api.getCountries();
    if (response.status === 200) {
      return response.data;
    } else {
      return thunkAPI.rejectWithValue(JSON.stringify(response) ?? 'Unknown error');
    }
  } catch (e: any) {
    return thunkAPI.rejectWithValue(
      (e as AxiosError<{ message: string }>)?.response?.data?.message ?? e?.message ?? JSON.stringify(e)
    );
  }
});

export const getCountryThunk = createAsyncThunk(
  `${ReducersNames.COUNTRIES}/getCountry`,
  async (cca3: string, thunkAPI) => {
    try {
      const response = await api.getCountry(cca3);
      if (response.status === 200) {
        return response.data[0];
      } else {
        return thunkAPI.rejectWithValue(JSON.stringify(response) ?? 'Unknown error');
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(
        (e as AxiosError<{ message: string }>)?.response?.data.message ?? e?.message ?? JSON.stringify(e)
      );
    }
  }
);
