import { ICountry, List } from '../../redux/types';

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
}
