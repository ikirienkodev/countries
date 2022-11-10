import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { initDetail, initList, onFulfilledReducer, onPendingReducer, onRejectedReducer } from '../../reducers';
import { CountriesStateDraft, ICountriesState, ICountry,ReducersNames } from '../../types';

import { getCountriesThunk, getCountryThunk } from './asyncActions';

const initialState: ICountriesState = {
  countries: {
    ...initList,
  },
  country: {
    ...initDetail,
  },
};

export const countriesSlice = createSlice({
  name: ReducersNames.COUNTRIES,
  initialState,
  reducers: {
    setCountriesInitialStatus(state) {
      state.countries = { ...initialState.countries };
    },
    setCountryInitialStatus(state) {
      state.country = { ...initialState.country };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCountriesThunk.pending, onPendingReducer<CountriesStateDraft>('countries'))
      .addCase(
        getCountriesThunk.fulfilled,
        onFulfilledReducer<CountriesStateDraft>(
          'countries',
          (state, action: PayloadAction<ICountry[]>) => (state.countries.result = action.payload)
        )
      )
      .addCase(getCountriesThunk.rejected, onRejectedReducer<CountriesStateDraft>('countries'))

      .addCase(getCountryThunk.pending, onPendingReducer<CountriesStateDraft>('country'))
      .addCase(
        getCountryThunk.fulfilled,
        onFulfilledReducer<CountriesStateDraft>(
          'country',
          (state, action: PayloadAction<ICountry>) => (state.country.result = action.payload)
        )
      )
      .addCase(getCountryThunk.rejected, onRejectedReducer<CountriesStateDraft>('country'));
  },
});

export const { actions: countriesActions, reducer: countriesReducer } = countriesSlice;
