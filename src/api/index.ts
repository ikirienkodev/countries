import axios from 'axios';

export const authApiInstance = axios.create({
  baseURL: 'https://reqres.in/api',
  timeout: 5000,
});

export const countriesApiInstance = axios.create({
  baseURL: 'https://restcountries.com/v3.1',
  timeout: 5000,
});
