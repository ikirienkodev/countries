import React, { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

import CountryDetails from '../../../../components/CountryDetails';
import ErrorSnackbar from '../../../../components/ErrorSnackbar';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { countriesActions } from '../../../../redux/slices/countriesSlice';
import { getCountryThunk } from '../../../../redux/slices/countriesSlice/asyncActions';

import styles from './styles.module.scss';

const ErrorMessages: Record<string, string> = {
  'bad request': 'Page not found',
};

function CountryPage() {
  const { result: country, message, fetching } = useAppSelector((state) => state.COUNTRIES.country);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const { alphaCode } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(countriesActions.setCountryInitialStatus());
    };
  }, []);

  useEffect(() => {
    if (alphaCode) {
      dispatch(getCountryThunk(alphaCode));
    }
  }, [alphaCode]);

  useEffect(() => {
    if (message) {
      setOpenErrorSnackbar(true);
    }
  }, [message]);

  return (
    <div className={styles['country-page']}>
      {!!country && <CountryDetails country={country} />}
      {fetching && (
        <div className={styles['country-page__spinnerContainer']}>
          <CircularProgress />
        </div>
      )}
      <ErrorSnackbar
        open={openErrorSnackbar}
        setOpen={setOpenErrorSnackbar}
        message={ErrorMessages[message?.toLowerCase() ?? ''] ?? message}
      />
    </div>
  );
}

export default CountryPage;
