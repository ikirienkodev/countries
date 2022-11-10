import { WritableDraft } from 'immer/dist/types/types-external';

import { ILoginResponse } from '../../api/services/types';

export const enum ReducersNames {
  AUTH = 'AUTH',
  COUNTRIES = 'COUNTRIES',
}

export type FetchStatus = {
  fetching: boolean;
  success: boolean;
  message: string | null;
};

export type Detail<T> = {
  result: T;
} & FetchStatus;

export type List<T> = {
  result: T[];
} & FetchStatus;

export type StateType = {
  [k: string]: FetchStatus;
};
export interface IAuthState {
  login: {
    ui: {
      isRememberMeChecked: boolean;
    };
    isAuthenticated: boolean;
  } & Detail<ILoginResponse | null>;
}

export type AuthStateDraft = WritableDraft<IAuthState>;
export interface ICountry {
  cca2: string;
  cca3: string;
  name: {
    common: string;
    official: string;
    nativeName: Record<
      string,
      {
        common: string;
        official: string;
      }
    >;
  };
  capital: string[];
  currencies: Record<
    string,
    {
      name: string;
      symbol: string;
    }
  >;
  languages: Record<string, string>;
  flags: {
    png?: string;
    svg?: string;
  };
}
export interface ICountriesState {
  countries: List<ICountry>;
  country: Detail<ICountry | null>;
}

export type CountriesStateDraft = WritableDraft<ICountriesState>;
