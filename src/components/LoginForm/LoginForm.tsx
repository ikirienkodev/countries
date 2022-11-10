import { useEffect, useState } from 'react';
import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { useFormik } from 'formik';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { authActions } from '../../redux/slices/authSlice';
import ErrorSnackbar from '../ErrorSnackbar';

import { handleSubmitLoginForm, loginFormInitialValues, validationSchema } from './utils';

import styles from './styles.module.scss';

const ErrorMessages: Record<string, string> = {
  'user not found': 'User not found',
};

const LoginForm = () => {
  const login = useAppSelector((state) => state.AUTH.login);
  const isRememberMeChecked = useAppSelector((state) => state.AUTH.login.ui.isRememberMeChecked);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authActions.clearMessage('login'));
    dispatch(authActions.setIsRememberMeChecked(false));
  }, []);

  useEffect(() => {
    if (login.message) {
      setOpenErrorSnackbar(true);
    }
  }, [login]);

  const formik = useFormik({
    initialValues: loginFormInitialValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmitLoginForm,
  });

  const { values, errors, touched, isSubmitting } = formik;

  return (
    <div className={styles['login-form']}>
      <form className={styles['login-form__form']} onSubmit={formik.handleSubmit}>
        <h1 className={styles['login-form__form__title']}>Log in</h1>
        <TextField
          variant="outlined"
          fullWidth
          id="email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={formik.handleChange}
          error={touched.email && Boolean(errors.email)}
          helperText={touched.email && errors.email}
        />
        <TextField
          variant="outlined"
          fullWidth
          id="password"
          name="password"
          placeholder="Password"
          type="password"
          value={values.password}
          onChange={formik.handleChange}
          error={touched.password && Boolean(errors.password)}
          helperText={touched.password && errors.password}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isRememberMeChecked}
              onChange={() => dispatch(authActions.setIsRememberMeChecked(!isRememberMeChecked))}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          }
          label="Remember me"
        />
        <Button color="primary" variant="contained" fullWidth type="submit" disabled={isSubmitting}>
          Submit
        </Button>
      </form>
      <ErrorSnackbar
        open={openErrorSnackbar}
        setOpen={setOpenErrorSnackbar}
        message={ErrorMessages[login.message?.toLowerCase() ?? ''] ?? login.message}
      />
    </div>
  );
};

export default LoginForm;
