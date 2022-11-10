import { FormikHelpers } from 'formik';
import * as yup from 'yup';

import { loginThunk } from '../../redux/slices/authSlice/asyncActions';
import { store } from '../../redux/store';

export interface ILoginFormValues {
  email: string;
  password: string;
}

export const validationSchema = yup.object({
  email: yup.string().trim().email('Enter a valid email').required('Email is required'),
  password: yup.string().trim().required('Password is required'),
});

export const handleSubmitLoginForm = (values: ILoginFormValues, { setSubmitting }: FormikHelpers<ILoginFormValues>) => {
  store.dispatch(loginThunk(values));
  setSubmitting(false);
};

export const loginFormInitialValues: ILoginFormValues = {
  email: '',
  password: '',
};
