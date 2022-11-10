import { AxiosResponse } from 'axios';

import { ICountry } from '../../redux/types';
import { authApiInstance, countriesApiInstance } from '../index';

import { ILoginRequest, ILoginResponse } from './types';

const login = async (values: ILoginRequest): Promise<AxiosResponse<ILoginResponse>> =>
  await authApiInstance.post('/login', values);

const getCountries = async (): Promise<AxiosResponse<ICountry[]>> => await countriesApiInstance.get('/all');

const getCountry = async (cca3: string): Promise<AxiosResponse<ICountry[]>> =>
  await countriesApiInstance.get(`/alpha/${cca3}`);

export default {
  login,
  getCountries,
  getCountry,
};
